import { Pressable, StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { ItemsProvider, useItems } from '@/contexts/ItemsContext';
import { useWheelGame } from '@/hooks/useWheelGame';
import { useSavedLists } from '@/hooks/useSavedLists';
import { WinnerModal } from '@/components/WinnerModal';
import { WheelArrow } from '@/components/WheelArrow';
import Wheel from '@/components/Wheel';
import { ListInputForm } from '@/components/ListInputForm';
import { SavedListsPanel } from '@/components/SavedListsPanel';

const WheelScreen = () => {
  const { setItems } = useItems();
  const {
    winner,
    modalVisible,
    setModalVisible,
    spin,
    animatedStyle,
  } = useWheelGame();

  const {
    rawList,
    setRawList,
    listName,
    setListName,
    savedLists,
    handleSave,
    handleLoad,
    handleDelete,
  } = useSavedLists();

  const handleRawListChange = (text: string, items: string[]) => {
    setRawList(text);
    setItems(items);
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
        <WheelArrow />
        <Animated.View style={animatedStyle}>
          <Wheel />
        </Animated.View>
      </Pressable>

      <ListInputForm
        listName={listName}
        rawList={rawList}
        onChangeName={setListName}
        onChangeRawList={handleRawListChange}
        onSave={handleSave}
      />

      <SavedListsPanel
        lists={savedLists}
        onLoad={handleLoad}
        onDelete={handleDelete}
      />
    </View>
  );
};

const App = () => (
  <ItemsProvider initialItems={[]}>
    <WheelScreen />
  </ItemsProvider>
);

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    padding: 10,
  },
  wheel: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
