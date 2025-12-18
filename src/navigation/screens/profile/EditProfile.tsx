import React from "react";
import { View, StyleSheet, ScrollView, Image, TouchableOpacity, Platform } from "react-native";
import { useForm, Controller } from "react-hook-form";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { FormInput } from "@/components/FormInput";
import { FormButton } from "@/components/FormButton";
import { HeaderBar } from "@/components/ui/HeadBar";
import { useTheme } from "@/context/ThemeContext";
import { useProfile } from "@/context/ProfileContext";
import { showToast } from "@/utils/toast";

export function EditProfile() {
  const { profileImage, setProfileImage } = useProfile();
  const { theme } = useTheme();

  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      gender: "",
    },
  });

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      showToast("success", "Permission to access gallery is required!");
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

  const onSubmit = (data: any) => {
    console.log("Form Data:", data);
    showToast("success", "Profile updated successfully!");
  };

  const textColor = theme === "dark" ? Colors.dark.text : Colors.light.text;
  const bgColor = theme === "dark" ? Colors.dark.background : Colors.light.background;
  const cardColor = theme === "dark" ? "#1E1E1E" : Colors.light.background;
  const inputBg = theme === "dark" ? "rgba(255, 255, 255, 0.05)" : "rgba(238, 236, 232, 0.3)";
  const iconColor = theme === "dark" ? Colors.dark.text : Colors.light.primary;

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <HeaderBar title="Edit Profile" showBack={true} />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={[styles.card, { backgroundColor: cardColor }]}>
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
                  { backgroundColor: cardColor, borderColor: iconColor },
                ]}
              >
                <TouchableOpacity onPress={pickImage}>
                  <Ionicons name="camera" size={24} color={iconColor} />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <Controller
            control={control}
            name="firstName"
            rules={{ required: "First name is required" }}
            render={({ field: { onChange, value } }) => (
              <FormInput
                label="First Name"
                placeholder="Enter first name"
                value={value}
                onChangeText={onChange}
                error={errors.firstName?.message}
                textColor={textColor}
                colorScheme={theme}
                style={[styles.inputField, { backgroundColor: inputBg }]}
              />
            )}
          />

          <Controller
            control={control}
            name="lastName"
            rules={{ required: "Last name is required" }}
            render={({ field: { onChange, value } }) => (
              <FormInput
                label="Last Name"
                placeholder="Enter last name"
                value={value}
                onChangeText={onChange}
                error={errors.lastName?.message}
                textColor={textColor}
                colorScheme={theme}
                style={[styles.inputField, { backgroundColor: inputBg }]}
              />
            )}
          />

          <Controller
            control={control}
            name="email"
            rules={{
              required: "Email is required",
              pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email" }
            }}
            render={({ field: { onChange, value } }) => (
              <FormInput
                label="Email"
                placeholder="Enter email"
                value={value}
                onChangeText={onChange}
                error={errors.email?.message}
                textColor={textColor}
                colorScheme={theme}
                style={[styles.inputField, { backgroundColor: inputBg }]}
                keyboardType="email-address"
              />
            )}
          />

          <Controller
            control={control}
            name="phone"
            rules={{ required: "Phone number is required" }}
            render={({ field: { onChange, value } }) => (
              <FormInput
                label="Phone"
                placeholder="Enter phone number"
                value={value}
                onChangeText={onChange}
                error={errors.phone?.message}
                textColor={textColor}
                colorScheme={theme}
                style={[styles.inputField, { backgroundColor: inputBg }]}
                keyboardType="phone-pad"
              />
            )}
          />

          <Controller
            control={control}
            name="gender"
            rules={{ required: "Gender is required" }}
            render={({ field: { onChange, value } }) => (
              <FormInput
                label="Gender"
                placeholder="Enter gender"
                value={value}
                onChangeText={onChange}
                error={errors.gender?.message}
                textColor={textColor}
                colorScheme={theme}
                style={[styles.inputField, { backgroundColor: inputBg }]}
              />
            )}
          />

          <FormButton
            title="Save Changes"
            onPress={handleSubmit(onSubmit)}
            colorScheme="light"
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 100,
  },
  card: {
    padding: 20,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  profileSection: {
    alignItems: "center",
    marginBottom: 20,
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
    bottom: 10,
    right: 10,
    borderRadius: 20,
    padding: 6,
    borderWidth: 2,
  },
  inputField: {
    borderRadius: 12,
    paddingHorizontal: 18,
    paddingVertical: 14,
    fontSize: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: Platform.OS === "ios" ? 0.15 : 0.1,
    shadowRadius: 4,
    elevation: 4,
    borderWidth: 1,
    borderColor: "rgba(224, 211, 211, 0.4)",
    marginBottom: 15,
  },
});
