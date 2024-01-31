import React, { Suspense } from 'react';
import { Platform, StyleSheet, Text, TextInput, UIManager } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import KeyboardManager from 'react-native-keyboard-manager';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { AppContainer } from './navigators/app-navigation';
import store, { persistor } from './stores';
import { PortalProvider } from '@gorhom/portal';

// Disable font scaling
// @ts-ignore
Text.defaultProps = Text.defaultProps || {};
// @ts-ignore
Text.defaultProps.allowFontScaling = false;
// @ts-ignore
TextInput.defaultProps = TextInput.defaultProps || {};
// @ts-ignore
TextInput.defaultProps.allowFontScaling = false;

if (Platform.OS === 'ios') {
  KeyboardManager.setEnable(true);
  KeyboardManager.setEnableDebugging(false);
  KeyboardManager.setKeyboardDistanceFromTextField(50);
  KeyboardManager.setLayoutIfNeededOnUpdate(true);
  KeyboardManager.setEnableAutoToolbar(false);
  KeyboardManager.setOverrideKeyboardAppearance(true);
  // "default" | "light" | "dark"
  KeyboardManager.setKeyboardAppearance('default');
  KeyboardManager.setShouldResignOnTouchOutside(true);
  KeyboardManager.setShouldPlayInputClicks(true);
  KeyboardManager.resignFirstResponder();
  KeyboardManager.reloadLayoutIfNeeded();
}

if (Platform.OS !== 'ios') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

const App = () => {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Suspense fallback={null}>
            <PortalProvider>
              <GestureHandlerRootView style={styles.root}>
                <AppContainer />
              </GestureHandlerRootView>
            </PortalProvider>
          </Suspense>
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
};
export default App;
