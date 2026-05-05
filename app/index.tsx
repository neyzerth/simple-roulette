import { useAnimatedWheel } from '@/components/AnimatedWheel';
import { Arrow } from '@/components/Arrow';
import { parseTextToList } from '@/components/listInput';
import { WinnerModal } from '@/components/WinnerModal';
import Wheel from '@/components/Wheel';
import { ItemsProvider, useItems } from '@/contexts/ItemsContext';
import { addList, deleteList, getLists, List } from '@/storage/crud';
import { useEffect, useState } from 'react';
import { Button, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import Animated from 'react-native-reanimated';

const WheelScreen = () => {
    const [winner, setWinner] = useState("--");
    const [modalVisible, setModalVisible] = useState(false);
    const { spin, animatedStyle } = useAnimatedWheel((winnerName: string) => {
        setWinner(winnerName);
        setModalVisible(true);
    });
    const { setItems } = useItems();
    const [rawList, setRawList] = useState("");
    const [listName, setListName] = useState("");
    const [savedLists, setSavedLists] = useState<List[]>([]);

    const loadSavedLists = async () => {
        const lists = await getLists();
        setSavedLists(lists);
    };

    useEffect(() => {
        loadSavedLists();
    }, []);

    const handleSave = async () => {
        await addList(listName, rawList);
        setListName("");
        setRawList("");
        await loadSavedLists();
    };

    const handleLoad = (list: List) => {
        setRawList(list.rawList);
        setItems(parseTextToList(list.rawList));
    };

    const handleDelete = async (index: number) => {
        await deleteList(index);
        await loadSavedLists();
    };

    return (
        <View style={styles.container}>
            <WinnerModal
                visible={modalVisible}
                winner={winner}
                onClose={() => setModalVisible(false)}
                onDelete={() => {
                    // Delete functionality will be implemented in next iteration
                    console.log('Delete item:', winner);
                }}
            />

            <Pressable onPress={spin} style={styles.wheel}>
                <Arrow />
                <Animated.View style={animatedStyle}>
                    <Wheel />
                </Animated.View>
            </Pressable>

            <TextInput
                placeholder="List name..."
                placeholderTextColor="#999"
                style={styles.nameInput}
                value={listName}
                onChangeText={setListName}
            />

            <TextInput
                multiline
                numberOfLines={5}
                placeholder="Item 1, Item 2, Item 3..."
                placeholderTextColor="#999"
                style={styles.textArea}
                value={rawList}
                onChangeText={(text) => {
                    setRawList(text);
                    setItems(parseTextToList(text));
                }}
            />

            <Button title="Save List" onPress={handleSave} disabled={!rawList.trim()} />

            <View style={styles.list}>
                {savedLists.length === 0 && (
                    <Text style={styles.emptyText}>No saved lists yet</Text>
                )}
                {savedLists.map((list, index) => (
                    <Pressable
                        key={index}
                        style={styles.listItem}
                        onPress={() => handleLoad(list)}
                    >
                        <View style={styles.listContent}>
                            <Text style={styles.listName}>{list.name}</Text>
                            <Text style={styles.listPreview} numberOfLines={1}>
                                {list.rawList}
                            </Text>
                        </View>
                        <Button
                            title="Delete"
                            onPress={() => handleDelete(index)}
                        />
                    </Pressable>
                ))}
            </View>
        </View>
    );
};

const Index = () => {
    return (
        <ItemsProvider initialItems={[]}>
            <WheelScreen />
        </ItemsProvider>
    );
};

export default Index;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 12,
        padding: 10,
    },
    wheel: {
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
    },
    nameInput: {
        height: 40,
        width: 250,
        padding: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        fontSize: 14,
        borderRadius: 5,
    },
    textArea: {
        minHeight: 80,
        width: 250,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        textAlignVertical: 'top',
        fontSize: 14,
        borderRadius: 5,
    },
    list: {
        width: "90%",
        maxHeight: 200,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    emptyText: {
        color: '#999',
        textAlign: 'center',
        fontStyle: 'italic',
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 8,
        paddingHorizontal: 4,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    listContent: {
        flex: 1,
        marginRight: 8,
    },
    listName: {
        fontWeight: 'bold',
        fontSize: 14,
    },
    listPreview: {
        color: '#666',
        fontSize: 12,
    },
});