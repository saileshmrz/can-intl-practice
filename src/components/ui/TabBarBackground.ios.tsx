import { View, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
export default function TabBarBackground() {
  return <View style={[StyleSheet.absoluteFill, { backgroundColor: Colors.light.background }]} />;
}

// You can still keep this hook if needed

export function useBottomTabOverflow() {
  return useBottomTabBarHeight();
}
