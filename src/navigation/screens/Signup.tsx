import { View, Text, StyleSheet, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { FormInput } from "@/components/FormInput";
import { Colors } from "@/constants/Colors";
import { FormButton } from "@/components/FormButton";
import { Entypo } from "@expo/vector-icons";

export function Signup() {
  const navigation = useNavigation<any>();

  
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

 
  const [fullNameError, setFullNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const handleSignup = () => {
    let hasError = false;

  
    if (!fullName.trim()) {
      setFullNameError("Full name is required");
      hasError = true;
    } else {
      setFullNameError("");
    }

  
    if (!email.trim()) {
      setEmailError("Email is required");
      hasError = true;
    } else {
      setEmailError("");
    }

    
    if (!password) {
      setPasswordError("Password is required");
      hasError = true;
    } else {
      setPasswordError("");
    }

   
    if (!confirmPassword) {
      setConfirmPasswordError("Confirm password is required");
      hasError = true;
    } else if (password && password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      hasError = true;
    } else {
      setConfirmPasswordError("");
    }

    if (hasError) return;


    alert("Account created successfully!");
    navigation.navigate("Login");
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.container, { backgroundColor: Colors.light.background }]}>
          <Text style={[styles.title, { color: Colors.light.text }]}>Signup</Text>

          <View style={styles.inputWrapper}>
          <FormInput
            label="Full Name"
            value={fullName}
            onChangeText={setFullName}
            placeholder="Full Name"
            autoCapitalize="words"
            colorScheme="light"
          />
          {fullNameError ? <Text style={styles.errorText}>{fullNameError}</Text> : null}
          </View>

          <View style={styles.inputWrapper}>
          <FormInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
            colorScheme="light"
          />
          {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
          </View>
          
          <View style={styles.inputWrapper}>
            <FormInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              placeholder="Create your password"
              secureTextEntry={!showPassword}
              colorScheme="light"
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Entypo
                name={showPassword ? "eye" : "eye-with-line"}
                size={26}
                color="gray"
              />
            </TouchableOpacity>
          {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
            </View>

          <View style={styles.inputWrapper}>
            <FormInput
              label="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Confirm your password"
              secureTextEntry={!showConfirmPassword}
              colorScheme="light"
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              <Entypo
                name={showConfirmPassword ? "eye" : "eye-with-line"}
                size={26}
                color="gray"
              />
            </TouchableOpacity>
          {confirmPasswordError ? <Text style={styles.errorText}>{confirmPasswordError}</Text> : null}
          </View>

          <FormButton title="Sign Up" onPress={handleSignup} colorScheme="light" />

          <TouchableOpacity
            onPress={() => navigation.navigate("Login")}
            style={styles.loginLink}
          >
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
  content: {
    flexGrow: 1,
    justifyContent: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 32,
    fontFamily: "PoppinsBold",
    marginBottom: 40,
    textAlign: "center",
  },
  inputWrapper: {
    position: "relative",
    width: "100%",
    marginBottom: 15,
  },
  eyeIcon: {
    position: "absolute",
    right: 10,
    top: 38,
  },
  loginLink: {
    marginTop: 20,
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
  errorText: {
    color: "red",
    fontSize: 14,
    marginTop: 1,
    fontFamily: "PoppinsRegular",
  },
});
