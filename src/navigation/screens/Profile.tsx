import { useState } from "react";
import { StyleSheet, View, TouchableOpacity, Image, ScrollView, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";

import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { HeaderBar } from "@/components/ui/HeadBar";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export function Profile() {
  const [image, setImage] = useState<string | null>(null);
  const navigation = useNavigation();

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Permission to access gallery is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
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

  return (
    <ThemedView style={styles.container}>
      <HeaderBar title="Profile" showBack={true} />

      <ScrollView
        contentContainerStyle={[styles.content, { paddingBottom: 200 }]}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity onPress={pickImage} style={styles.profileContainer}>
          {image ? (
            <Image source={{ uri: image }} style={styles.profileImage} />
          ) : (
            <Ionicons name="person-circle-outline" size={120} color={Colors.light.primary} />
          )}
        </TouchableOpacity>

        <ThemedText style={styles.name}>John Doe</ThemedText>
        <ThemedText style={styles.email}>johndoe@example.com</ThemedText>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Personal Information</ThemedText>
          <TouchableOpacity style={styles.infoRow}>
            <MaterialIcons name="person" size={24} color={Colors.light.primary} />
            <ThemedText style={styles.infoValue}>Full Name: John Doe</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.infoRow}>
            <MaterialIcons name="email" size={24} color={Colors.light.primary} />
            <ThemedText style={styles.infoValue}>Email: johndoe@example.com</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.infoRow}>
            <MaterialIcons name="phone" size={24} color={Colors.light.primary} />
            <ThemedText style={styles.infoValue}>Phone: +1 234 567 890</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.infoRow}>
            <MaterialIcons name="location-on" size={24} color={Colors.light.primary} />
            <ThemedText style={styles.infoValue}>Address: 123 Main St, City</ThemedText>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Settings</ThemedText>
          <TouchableOpacity style={styles.infoRow}>
            <MaterialIcons name="notifications" size={24} color={Colors.light.primary} />
            <ThemedText style={styles.infoValue}>Notifications</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.infoRow}>
            <MaterialIcons name="lock-outline" size={24} color={Colors.light.primary} />
            <ThemedText style={styles.infoValue}>Change Password</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.infoRow}>
            <MaterialIcons name="info-outline" size={24} color={Colors.light.primary} />
            <ThemedText style={styles.infoValue}>About App</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.infoRow} onPress={handleLogout}>
            <MaterialIcons name="exit-to-app" size={24} color={Colors.light.primary} />
            <ThemedText style={styles.infoValue}>Logout</ThemedText>
          </TouchableOpacity>
        </View>

        <View style={{ height: 5 }} />
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  content: {
    alignItems: "center",
    padding: 20,
  },
  profileContainer: {
    marginBottom: 20,
    borderRadius: 75,
    overflow: "hidden",
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  name: {
    fontSize: 24,
    fontWeight: "700",
    color: Colors.light.text,
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: Colors.light.primary,
    opacity: 0.8,
    marginBottom: 20,
  },
  section: {
    width: "100%",
    marginTop: 20,
    padding: 15,
    borderRadius: 12,
    backgroundColor: Colors.light.background,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.light.text,
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    gap: 10,
  },
  infoValue: {
    fontSize: 16,
    color: Colors.light.primary,
  },
});
