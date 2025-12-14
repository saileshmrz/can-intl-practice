import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  createStaticNavigation,
  StaticParamList,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Platform } from "react-native";

import { Menu } from "./screens/Menu";
import { Home } from "./screens/Home";
import { NotFound } from "./screens/NotFound";
import { Login } from "./screens/Login";
import { Signup } from "./screens/Signup";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Orders } from "./screens/Orders";
import Ionicons from '@expo/vector-icons/Ionicons';
import { Profile } from "./screens/Profile";
import { Notification } from "./screens/Notification";




const HomeTabs = createBottomTabNavigator({
  screens: {
    Home: {
      screen: Home,
      options: {
        headerShown: false,
        tabBarIcon: ({ color} :  { color: string }) => (
          <IconSymbol size={28} name="house.fill" color={color} />
        ),
      },
    },
    Menu: {
      screen: Menu,
      options: {
        headerShown: false,
        tabBarIcon: ({ color }:  { color: string }) => (
          <MaterialIcons name="menu-book" size={24} color={color} />
        ),
      },
    },
    Orders: {
      screen: Orders,
      options: {
        headerShown: false,
        tabBarIcon: ({ color }:  { color: string }) => (
          <Ionicons name="receipt-outline" size={24} color={color} />
        ),
      },
    },

    Profile: {
      screen: Profile,
      options: {
        headerShown: false,
        tabBarIcon: ({ color }:  { color: string }) => (
          <Ionicons name="person-circle-outline" size={32} color={color} />
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

const AuthStack = createNativeStackNavigator({
  screens: {
    Login: {
      screen: Login,
      options: {
        headerShown: false,
      },
    },
    Signup: {
      screen: Signup,
      options: {
        headerShown: false,
      },
    },
  },
});

const RootStack = createNativeStackNavigator({
  screens: {
    Auth: {
      screen: AuthStack,
      options: {
        headerShown: false,
      },
    },
    HomeTabs: {
      screen: HomeTabs,
      options: {
        headerShown: false,
      },
    },
    Notification: {
      screen: Notification,
      options: { headerShown: false, title: "Notifications" 

      },
    },
    NotFound: {
      screen: NotFound,
      options: {
        title: "404",
      },
      linking: {
        path: "*",
      },
    },
  },
});

export const Navigation = createStaticNavigation(RootStack);

type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
