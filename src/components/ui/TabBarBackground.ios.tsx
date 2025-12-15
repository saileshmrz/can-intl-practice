import { View, StyleSheet } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

export default function TabBarBackground() {
  const backgroundColor = useThemeColor({}, 'background');

  return <View style={[StyleSheet.absoluteFill, { backgroundColor }]} />;
}


export function useBottomTabOverflow() {
  return useBottomTabBarHeight();
}
