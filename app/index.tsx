import { ListInputForm } from '@/components/ListInputForm';
import { SavedListsPanel } from '@/components/SavedListsPanel';
import Wheel from '@/components/Wheel';
import { WheelArrow } from '@/components/WheelArrow';
import { WinnerModal } from '@/components/WinnerModal';
import { ItemsProvider, useItems } from '@/contexts/ItemsContext';
import { useSavedLists } from '@/hooks/useSavedLists';
import { useWheelGame } from '@/hooks/useWheelGame';
import { useThemeStyles } from '@/styles/useThemeStyles';
import { Platform, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';

const WHEEL_SIZE = Platform.OS === 'web' ? 420 : 280;
const isWeb = Platform.OS === 'web';

const WheelScreen = () => {
  const { setItems } = useItems();
  const { presets } = useThemeStyles();
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

  const handleDeleteWinner = () => {
    console.log('Delete item:', winner);
    setModalVisible(false);
  };

  const sidebarContent = (
    <>
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
    </>
  );

  const content = (
    <>
      <WinnerModal
        visible={modalVisible}
        winner={winner}
        onClose={() => setModalVisible(false)}
        onDelete={handleDeleteWinner}
      />

      <View style={[styles.wheelSection, isWeb && styles.webWheelSection]}>
        <Pressable onPress={spin} style={styles.wheel}>
          <View style={styles.arrowContainer}>
            <WheelArrow />
          </View>
          <Animated.View style={animatedStyle}>
            <Wheel size={WHEEL_SIZE} />
          </Animated.View>
        </Pressable>
      </View>

      {isWeb ? (
        <View style={styles.webSidebar}>
          {sidebarContent}
        </View>
      ) : (
        <View style={styles.mobileSidebar}>
          {sidebarContent}
        </View>
      )}
    </>
  );

  if (isWeb) {
    return (
      <View style={[presets.container, styles.webContainer]}>
        {content}
      </View>
    );
  }

  return (
    <View style={[presets.container, styles.mobileContainer]}>
      <ScrollView
        contentContainerStyle={styles.mobileScrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="interactive"
      >
        {content}
      </ScrollView>
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
  mobileContainer: {
    flex: 1,
  },
  mobileScrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 40,
    gap: 16,
    minHeight: '100%',
  },
  webContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    gap: 60,
  },
  wheelSection: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  webWheelSection: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  wheel: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  arrowContainer: {
    position: 'absolute',
    top: -35,
    zIndex: 10,
  },
  mobileSidebar: {
    width: '100%',
    maxWidth: 350,
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
  },
  webSidebar: {
    width: 350,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
