import {
  BottomSheetModal,
  BottomSheetModalProps,
  BottomSheetModalProvider,
  BottomSheetTextInput,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {Button, StyleSheet, Text} from 'react-native';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import {
  SafeAreaProvider,
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

// enableLogging();

const BottomSheet = ({
  children,
  open = false,
  ...props
}: {
  children: React.ReactNode | React.ReactNode[];
  open?: boolean;
} & Partial<BottomSheetModalProps>) => {
  const edgeInsets = useSafeAreaInsets();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  useEffect(() => {
    const bottomSheetModal = bottomSheetModalRef.current;
    if (open) {
      bottomSheetModal?.present();
    } else {
      bottomSheetModal?.dismiss();
    }
  }, [open]);

  return (
    <BottomSheetModal
      android_keyboardInputMode="adjustResize"
      onChange={index => console.log('sheet position changed - index:', index)}
      ref={bottomSheetModalRef}
      stackBehavior="push"
      topInset={edgeInsets.top}
      {...props}>
      {children}
    </BottomSheetModal>
  );
};

const Sheet = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState('');
  const snapPoints = useMemo(() => ['25%'], []);

  return (
    <>
      <Button title="Open Sheet" onPress={() => setOpen(true)} />
      <BottomSheet
        open={open}
        onDismiss={() => {
          console.log('sheet dismissed');
          setOpen(false);
        }}
        snapPoints={snapPoints}>
        <BottomSheetView style={styles.sheetContainer}>
          <Text style={styles.text}>Sheet</Text>
          <BottomSheetTextInput
            style={styles.input}
            value={value}
            placeholder="Enter some text"
            placeholderTextColor="rgba(0, 0, 0, 0.25)"
            onChangeText={setValue}
          />
          <Button title="Close" onPress={() => setOpen(false)} />
        </BottomSheetView>
      </BottomSheet>
    </>
  );
};

function App(): JSX.Element {
  return (
    <SafeAreaProvider>
      <BottomSheetModalProvider>
        <SafeAreaView style={styles.container}>
          <Sheet />
        </SafeAreaView>
      </BottomSheetModalProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'lightblue',
    flex: 1,
    justifyContent: 'flex-end',
    padding: 24,
  },
  text: {
    color: 'black',
    fontSize: 24,
  },
  sheetContainer: {
    flex: 1,
    gap: 16,
    paddingTop: 16,
    paddingHorizontal: 24,
  },
  input: {
    backgroundColor: 'rgba(151, 151, 151, 0.1)',
    borderColor: 'rgba(151, 151, 151, 0.5)',
    borderRadius: 10,
    borderWidth: 1,
    color: 'black',
    fontSize: 16,
    lineHeight: 20,
    padding: 8,
  },
});

export default gestureHandlerRootHOC(App);
