import { useState } from "react";
import { StyleSheet, View, TouchableOpacity, Image, ScrollView, Alert, Switch, } from "react-native";
import * as ImagePicker from "expo-image-picker";

import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { HeaderBar } from "@/components/ui/HeadBar";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "@/context/ThemeContext";

export function Profile() {
  const [image, setImage] = useState<string | null>(null);
  const navigation = useNavigation();
  const { theme, toggleTheme } = useTheme();

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Permission to access gallery is required!");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Logout",
          style: "destructive",
          onPress: () => {
            Alert.alert("Logged Out", "You have been successfully logged out.");
            navigation.reset({
              index: 0,
              routes: [{ name: "Auth", params: { screen: "Login" } }],
            });
          },
        },
      ],
      { cancelable: true }
    );
  };

  const bgColor = theme === "dark" ? Colors.dark.background : Colors.light.background;
  const cardColor = theme === "dark" ? "#2A2A2A" : Colors.light.background;
  const textColor = theme === "dark" ? Colors.dark.text : Colors.light.text;
  const secondaryText = theme === "dark" ? Colors.dark.primary : Colors.light.primary;
  const iconColor = theme === "dark" ? Colors.dark.text : Colors.light.primary;

  return (
    <ThemedView style={[styles.container, { backgroundColor: bgColor }]}>
      <HeaderBar title="Profile" showBack={true} />

      <ScrollView
        contentContainerStyle={[styles.content, { paddingBottom: 200 }]}
        showsVerticalScrollIndicator={false}
      >

        <TouchableOpacity onPress={pickImage} style={styles.profileContainer}>
          {image ? (
            <Image source={{ uri: image }} style={styles.profileImage} />
          ) : (
            <Ionicons name="person-circle-outline" size={120} color={iconColor} />
          )}
        </TouchableOpacity>

        <ThemedText style={[styles.name, { color: textColor }]}>John Doe</ThemedText>
        <ThemedText style={[styles.email, { color: secondaryText }]}>
          johndoe@example.com
        </ThemedText>


        <View style={[styles.card, { backgroundColor: cardColor }]}>
          <ThemedText style={[styles.cardTitle, { color: textColor }]}>Personal Information</ThemedText>
          <TouchableOpacity style={styles.infoRow}>
            <MaterialIcons name="person" size={24} color={iconColor} />
            <ThemedText style={[styles.infoValue, { color: textColor }]}>Full Name: John Doe</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.infoRow}>
            <MaterialIcons name="email" size={24} color={iconColor} />
            <ThemedText style={[styles.infoValue, { color: textColor }]}>Email: johndoe@example.com</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.infoRow}>
            <MaterialIcons name="phone" size={24} color={iconColor} />
            <ThemedText style={[styles.infoValue, { color: textColor }]}>Phone: +1 234 567 890</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.infoRow}>
            <MaterialIcons name="location-on" size={24} color={iconColor} />
            <ThemedText style={[styles.infoValue, { color: textColor }]}>Address: 123 Main St, City</ThemedText>
          </TouchableOpacity>
        </View>


        <View style={[styles.card, { backgroundColor: cardColor }]}>
          <ThemedText style={[styles.cardTitle, { color: textColor }]}>Settings</ThemedText>

          <View style={styles.infoRow}>
            <MaterialIcons name="dark-mode" size={24} color={iconColor} />
            <ThemedText style={[styles.infoValue, { color: textColor }]}>Dark Mode</ThemedText>
            <Switch
              value={theme === "dark"}
              onValueChange={toggleTheme}
              thumbColor={theme === "dark" ? Colors.dark.primary : Colors.light.primary}
              trackColor={{ false: "#ccc", true: "#555" }}
              style={{ marginLeft: "auto" }}
            />
          </View>

          <TouchableOpacity style={styles.infoRow} onPress={() => navigation.navigate("Notification")}>
            <MaterialIcons name="notifications" size={24} color={iconColor}/>
            <ThemedText style={[styles.infoValue, { color: textColor }]}>Notifications</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.infoRow}>
            <MaterialIcons name="lock-outline" size={24} color={iconColor} />
            <ThemedText style={[styles.infoValue, { color: textColor }]}>Change Password</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.infoRow}>
            <MaterialIcons name="info-outline" size={24} color={iconColor} />
            <ThemedText style={[styles.infoValue, { color: textColor }]}>About App</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.infoRow} onPress={handleLogout}>
            <MaterialIcons name="exit-to-app" size={24} color={iconColor} />
            <ThemedText style={[styles.infoValue, { color: textColor }]}>Logout</ThemedText>
          </TouchableOpacity>
        </View>

        <View style={{ height: 5 }} />
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container:
  {
    flex: 1
  },
  content:
  {
    alignItems: "center",
    padding: 20
  },
  profileContainer:
  {
    marginBottom: 20,
    borderRadius: 75,
    overflow: "hidden"
  },
  profileImage:
  {
    width: 120,
    height: 120,
    borderRadius: 60
  },
  name:
  {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 5
  },
  email:
  {
    fontSize: 16,
    opacity: 0.8,
    marginBottom: 20
  },
  card: {
    width: "100%",
    borderRadius: 12,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 15,
  },
  cardTitle:
  {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10
  },
  infoRow:
  {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8, gap: 10
  },
  infoValue:
  {
    fontSize: 16
  },
});
