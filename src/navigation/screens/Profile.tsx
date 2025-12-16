import { StyleSheet, View, TouchableOpacity, Image, ScrollView, Alert, Switch } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { HeaderBar } from "@/components/ui/HeadBar";
import { useTheme } from "@/context/ThemeContext";
import { useProfile } from "@/context/ProfileContext";

export function Profile() {
  const { profileImage, setProfileImage } = useProfile();
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
      setProfileImage(result.assets[0].uri);
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
  const iconColor = theme === "dark" ? Colors.dark.text : Colors.light.primary;

  return (
    <ThemedView style={{ flex: 1, backgroundColor: bgColor }}>
      <HeaderBar
        title="Profile"
        showBack={true}
        rightComponent={
          <TouchableOpacity>
            <MaterialIcons name="settings" size={28} color={iconColor} />
          </TouchableOpacity>
        }
      />
      <ScrollView
        contentContainerStyle={{ padding: 20, paddingBottom: 150 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.profileContainer}>
            {profileImage ? (
              <Image source={{ uri: profileImage }} style={styles.profileImage} />
            ) : (
              <Ionicons name="person-circle-outline" size={120} color={iconColor} />
            )}
            <View
              style={[
                styles.cameraIconContainer,
                {
                  backgroundColor: theme === "dark" ? "#000" : Colors.light.background,
                  borderColor: theme === "dark" ? "#fff" : Colors.light.primary,
                },
              ]}
            >
              <TouchableOpacity onPress={pickImage}>
                <Ionicons
                  name="camera"
                  size={24}
                  color={theme === "dark" ? "#fff" : Colors.light.primary}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.profileInfo}>
            <ThemedText style={[styles.name, { color: textColor }]}>John Doe</ThemedText>
            <ThemedText style={[styles.email, { color: iconColor }]}>johndoe@example.com</ThemedText>
            <TouchableOpacity
              style={[styles.editButton, { backgroundColor: Colors.light.primary }]}
              onPress={() => navigation.navigate("EditProfile")}
            >
              <ThemedText style={[styles.editButtonText, { color: "#fff" }]}>Edit Profile</ThemedText>
            </TouchableOpacity>
          </View>
        </View>

        {/* Cards */}
        <View style={[styles.card, { backgroundColor: cardColor }]}>
          <TouchableOpacity style={styles.infoRow}>
            <MaterialIcons name="favorite" size={24} color={iconColor} />
            <ThemedText style={[styles.infoValue, { color: textColor }]}>Favourites</ThemedText>
            <MaterialIcons name="chevron-right" size={24} color={iconColor} style={{ marginLeft: 'auto' }} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.infoRow}>
            <MaterialIcons name="file-download" size={24} color={iconColor} />
            <ThemedText style={[styles.infoValue, { color: textColor }]}>Downloads</ThemedText>
            <MaterialIcons name="chevron-right" size={24} color={iconColor} style={{ marginLeft: 'auto' }} />
          </TouchableOpacity>
        </View>

        <View style={[styles.card, { backgroundColor: cardColor }]}>
          <TouchableOpacity style={styles.infoRow}>
            <MaterialIcons name="language" size={24} color={iconColor} />
            <ThemedText style={[styles.infoValue, { color: textColor }]}>Language</ThemedText>
            <MaterialIcons name="chevron-right" size={24} color={iconColor} style={{ marginLeft: 'auto' }} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.infoRow}>
            <MaterialIcons name="location-on" size={24} color={iconColor} />
            <ThemedText style={[styles.infoValue, { color: textColor }]}>Location</ThemedText>
            <MaterialIcons name="chevron-right" size={24} color={iconColor} style={{ marginLeft: 'auto' }} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.infoRow} onPress={() => navigation.navigate("Notification")}>
            <MaterialIcons name="notifications" size={24} color={iconColor} />
            <ThemedText style={[styles.infoValue, { color: textColor }]}>Notifications</ThemedText>
            <MaterialIcons name="chevron-right" size={24} color={iconColor} style={{ marginLeft: 'auto' }} />
          </TouchableOpacity>
          <View style={styles.infoRow}>
            <MaterialIcons name="dark-mode" size={24} color={iconColor} />
            <ThemedText style={[styles.infoValue, { color: textColor }]}>Dark Mode</ThemedText>
            <Switch
              value={theme === "dark"}
              onValueChange={toggleTheme}
              thumbColor={theme === "dark" ? Colors.dark.primary : Colors.light.primary}
              trackColor={{ false: "#ccc", true: "#555" }}
              style={{ marginLeft: 'auto' }}
            />
          </View>
        </View>

        <View style={[styles.card, { backgroundColor: cardColor }]}>
          <TouchableOpacity style={styles.infoRow}>
            <MaterialIcons name="delete" size={24} color={iconColor} />
            <ThemedText style={[styles.infoValue, { color: textColor }]}>Clear Cache</ThemedText>
            <MaterialIcons name="chevron-right" size={24} color={iconColor} style={{ marginLeft: 'auto' }} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.infoRow}>
            <MaterialIcons name="history" size={24} color={iconColor} />
            <ThemedText style={[styles.infoValue, { color: textColor }]}>Clear History</ThemedText>
            <MaterialIcons name="chevron-right" size={24} color={iconColor} style={{ marginLeft: 'auto' }} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.infoRow} onPress={handleLogout}>
            <MaterialIcons name="exit-to-app" size={24} color={iconColor} />
            <ThemedText style={[styles.infoValue, { color: textColor }]}>Logout</ThemedText>
            <MaterialIcons name="chevron-right" size={24} color={iconColor} style={{ marginLeft: 'auto' }} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  profileContainer: {
    width: 120,
    height: 140,
    borderRadius: 60,
    overflow: "visible",
    position: "relative",
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  cameraIconContainer: {
    position: "absolute",
    bottom: 13,
    right: 13,
    borderRadius: 20,
    padding: 6,
    borderWidth: 2,
  },
  profileInfo: {
    marginLeft: 15,
    justifyContent: "center",
  },
  name: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    opacity: 0.8,
    marginBottom: 5,
  },
  editButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
  },
  editButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  card: {
    width: "100%",
    borderRadius: 12,
    paddingVertical: 5,
    paddingHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
  },
  infoValue: {
    fontSize: 16,
    marginLeft: 10,
  },
});
