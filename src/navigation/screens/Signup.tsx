import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { FormInput } from "@/components/FormInput";
import { Colors } from "@/constants/Colors";
import { FormButton } from "@/components/FormButton";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { showToast } from "@/utils/toast";

type SignupFormData = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export function Signup() {
  const navigation = useNavigation<any>();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { control, handleSubmit, watch, formState: { errors } } = useForm<SignupFormData>({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    }
  });

  const password = watch("password");

  const onSubmit = (data: SignupFormData) => {
    showToast("success", "Account created successfully")
    navigation.navigate("Login");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container} 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 10 : 0}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.innerContainer}>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.navigate("Login")}
            >
              <Ionicons name="arrow-back-outline" size={28} color={Colors.light.text} />
            </TouchableOpacity>

            <View style={styles.headerTextContainer}>
              <Text style={styles.titleBold}>Create Account</Text>
              <Text style={styles.titleNormal}>Sign up to get started</Text>
            </View>
          </View>

          <Controller
            control={control}
            name="fullName"
            rules={{ required: "Full name is required" }}
            render={({ field: { onChange, value } }) => (
              <FormInput
                label="Full Name"
                value={value}
                onChangeText={onChange}
                placeholder="Full Name"
                autoCapitalize="words"
                colorScheme="light"
                error={errors.fullName?.message}
                style={styles.inputField}
              />
            )}
          />

          <Controller
            control={control}
            name="email"
            rules={{
              required: "Email is required",
              pattern: { value: /^\S+@\S+\.\S+$/, message: "Invalid email address" },
            }}
            render={({ field: { onChange, value } }) => (
              <FormInput
                label="Email Address"
                value={value}
                onChangeText={onChange}
                placeholder="Enter your email address"
                keyboardType="email-address"
                autoCapitalize="none"
                colorScheme="light"
                error={errors.email?.message}
                style={styles.inputField}
              />
            )}
          />

          <View style={styles.inputWrapper}>
            <Controller
              control={control}
              name="password"
              rules={{
                required: "Password is required",
                minLength: { value: 6, message: "Password must be at least 6 characters" },
              }}
              render={({ field: { onChange, value } }) => (
                <FormInput
                  label="Password"
                  value={value}
                  onChangeText={onChange}
                  placeholder="Create your password"
                  secureTextEntry={!showPassword}
                  colorScheme="light"
                  error={errors.password?.message}
                  style={styles.inputField}
                />
              )}
            />
            <TouchableOpacity style={styles.eyeIcon} onPress={() => setShowPassword(!showPassword)}>
              <Entypo name={showPassword ? "eye" : "eye-with-line"} size={26} color="gray" />
            </TouchableOpacity>
          </View>

          <View style={styles.inputWrapper}>
            <Controller
              control={control}
              name="confirmPassword"
              rules={{
                required: "Confirm password is required",
                validate: value => value === password || "Passwords do not match",
              }}
              render={({ field: { onChange, value } }) => (
                <FormInput
                  label="Confirm Password"
                  value={value}
                  onChangeText={onChange}
                  placeholder="Confirm your password"
                  secureTextEntry={!showConfirmPassword}
                  colorScheme="light"
                  error={errors.confirmPassword?.message}
                  style={styles.inputField}
                />
              )}
            />
            <TouchableOpacity style={styles.eyeIcon} onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
              <Entypo name={showConfirmPassword ? "eye" : "eye-with-line"} size={26} color="gray" />
            </TouchableOpacity>
          </View>

          <FormButton title="Sign Up" onPress={handleSubmit(onSubmit)} colorScheme="light" />

          <TouchableOpacity onPress={() => navigation.navigate("Login")} style={styles.loginLink}>
            <Text style={styles.loginLinkText}>
              Already have an account? <Text style={styles.loginBold}>Login</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  innerContainer: {
    flex: 1,
    paddingHorizontal: 30,
    marginTop: 40
  },
  content: {
    flexGrow: 1,
    justifyContent: "flex-start",
    paddingTop: 20,
    paddingBottom: 50,
  },
  header: {
    marginBottom: 40,
    alignItems: "center",
  },
  backButton: {
    width: 40,
    marginBottom: 10,
    marginRight: 300,
  },
  headerTextContainer: {
    alignItems: "center",
    width: "100%",
  },
  titleBold: {
    fontSize: 30,
    fontWeight: "700",
    fontFamily: "PoppinsBold",
    textAlign: "center",
    color: Colors.light.text,
  },
  titleNormal: {
    fontSize: 18,
    fontFamily: "PoppinsRegular",
    textAlign: "center",
    marginTop: 5,
    color: Colors.light.text,
  },
  inputWrapper: {
    position: "relative",
    width: "100%",
    marginBottom: 20,
  },
  inputField: {
    backgroundColor: "rgba(238, 236, 232, 0.3)",
    borderRadius: 8,
    paddingHorizontal: 18,
    paddingVertical: 14,
    fontSize: 16,
    color: Colors.light.text,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: Platform.OS === "ios" ? 0.15 : 0.1,
    shadowRadius: 4,
    elevation: 4,
    borderWidth: 1,
    borderColor: "rgba(224, 211, 211, 0.4)",
  },
  eyeIcon: {
    position: "absolute",
    right: 10,
    top: 38,
  },
  loginLink: {
    marginTop: 25,
    alignItems: "center",
  },
  loginLinkText: {
    color: Colors.light.text,
    fontSize: 16,
    fontFamily: "PoppinsRegular",
  },
  loginBold: {
    fontFamily: "PoppinsMedium",
    color: Colors.light.primary,
  },
});
