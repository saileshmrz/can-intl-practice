import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home } from "../screens/Home";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Extra } from "../screens/Extra";
import { HapticTab } from "@/components/HapticTab";
import { Platform } from "react-native";
import TabBarBackground from "@/components/ui/TabBarBackground";

const HomeTabs = createBottomTabNavigator({
  screens: {
    Home: {
      screen: Home,
      options: {
        headerShown: false,
        tabBarIcon: ({ color }) => (
          <IconSymbol size={28} name="house.fill" color={color} />
        ),
      },
    },
    Extra: {
      screen: Extra,
      options: {
        headerShown: false,
        tabBarIcon: ({ color }) => (
          <IconSymbol size={28} name="paperplane.fill" color={color} />
        ),
      },
    },
  },
  screenOptions: {
    headerShown: false,
    tabBarButton: HapticTab,
    tabBarBackground: TabBarBackground,
    tabBarStyle: Platform.select<any>({
      ios: {
        // Use a transparent background on iOS to show the blur effect
        position: "absolute",
      },
      default: {},
    }),
  },
});

export default HomeTabs;
