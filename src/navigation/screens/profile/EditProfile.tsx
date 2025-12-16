import React from "react";
import { View, StyleSheet, ScrollView, Image, TouchableOpacity } from "react-native";
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
    showToast("success", "Profile updated successfully!")
  };

  const textColor = theme === "dark" ? Colors.dark.text : Colors.light.text;
  const bgColor = theme === "dark" ? Colors.dark.background : Colors.light.background;
  const iconColor = theme === "dark" ? Colors.dark.text : Colors.light.primary;

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <HeaderBar title="Edit Profile" showBack={true} />

      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 150 }} showsVerticalScrollIndicator={false}>
       
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
                { backgroundColor: theme === "dark" ? "#000" : Colors.light.background, borderColor: theme === "dark" ? "#fff" : Colors.light.primary },
              ]}
            >
              <TouchableOpacity onPress={pickImage}>
                <Ionicons name="camera" size={24} color={theme === "dark" ? "#fff" : Colors.light.primary} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

       
        <Controller
          control={control}
          name="firstName"
          rules={{ required: "First name is required" }}
          render={({ field: { onChange, onBlur, value } }) => (
            <FormInput
              label="First Name"
              placeholder="Enter first name"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.firstName?.message}
              colorScheme={theme === "dark" ? "dark" : "light"}
              textColor={textColor}
            />
          )}
        />

        <Controller
          control={control}
          name="lastName"
          rules={{ required: "Last name is required" }}
          render={({ field: { onChange, onBlur, value } }) => (
            <FormInput
              label="Last Name"
              placeholder="Enter last name"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.lastName?.message}
              colorScheme={theme === "dark" ? "dark" : "light"}
              textColor={textColor}
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
          render={({ field: { onChange, onBlur, value } }) => (
            <FormInput
              label="Email"
              placeholder="Enter email"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.email?.message}
              colorScheme={theme === "dark" ? "dark" : "light"}
              textColor={textColor}
              keyboardType="email-address"
            />
          )}
        />

        <Controller
          control={control}
          name="phone"
          rules={{ required: "Phone number is required" }}
          render={({ field: { onChange, onBlur, value } }) => (
            <FormInput
              label="Phone"
              placeholder="Enter phone number"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.phone?.message}
              colorScheme={theme === "dark" ? "dark" : "light"}
              textColor={textColor}
              keyboardType="phone-pad"
            />
          )}
        />

        <Controller
          control={control}
          name="gender"
          rules={{ required: "Gender is required" }}
          render={({ field: { onChange, onBlur, value } }) => (
            <FormInput
              label="Gender"
              placeholder="Enter gender"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.gender?.message}
              colorScheme={theme === "dark" ? "dark" : "light"}
              textColor={textColor}
            />
          )}
        />

       
        <FormButton
          title="Save Changes"
          onPress={handleSubmit(onSubmit)}
          colorScheme={theme === "dark" ? "dark" : "light"}
          style={{ marginTop: 10 }}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    bottom: 13,
    right: 13,
    borderRadius: 20,
    padding: 6,
    borderWidth: 2,
  },
});
