import { Colors } from '@/constants/Colors';
import { useTheme } from '@/context/ThemeContext';

/**
 * Returns a color based on the current theme from ThemeContext.
 * If no color is provided via props, it falls back to Colors or returns undefined.
 */
export function useThemeColor(
  props: { light?: string; dark?: string } = {},
  colorName?: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const { theme } = useTheme(); 
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else if (colorName) {
    return Colors[theme][colorName];
  } else {
    return undefined;
  }
}
