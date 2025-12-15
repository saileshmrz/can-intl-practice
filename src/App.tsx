import 'react-native-reanimated';
import * as React from 'react';
import { useColorScheme } from 'react-native';

import { DarkTheme, DefaultTheme } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import { Colors } from './constants/Colors';
import { Navigation } from './navigation';
import { ThemeProvider } from './context/ThemeContext';


SplashScreen.preventAutoHideAsync();

export function App() {
  const colorScheme = useColorScheme();

  const [loaded] = useFonts({
    SpaceMono: require('./assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }

 
  const theme =
    colorScheme === 'dark'
      ? {
          ...DarkTheme,
          colors: {
            ...DarkTheme.colors,
            primary: Colors.dark.tint,
            background: Colors.dark.background,
            card: Colors.dark.background,
            text: Colors.dark.text,
          },
        }
      : {
          ...DefaultTheme,
          colors: {
            ...DefaultTheme.colors,
            primary: Colors.light.tint,
            background: Colors.light.background,
            card: Colors.light.background,
            text: Colors.light.text,
          },
        };

  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <Navigation
          theme={theme} 
          linking={{
            enabled: 'auto',
            prefixes: ['helloworld://'],
          }}
          onReady={() => {
            SplashScreen.hideAsync();
          }}
        />
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
