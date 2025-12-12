import { View, Text, StyleSheet, Alert, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { FormInput } from "@/components/FormInput";
import { Colors } from "@/constants/Colors";
import { FormButton } from "@/components/FormButton";
import { Entypo } from "@expo/vector-icons";

export function Login() {
  const navigation = useNavigation<any>();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleLogin = () => {
    let hasError = false;

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

    if (hasError) return;

    
    if (email === "test@example.com" && password === "123456") {
      Alert.alert("Success", "Login successful!");
      navigation.navigate("HomeTabs");
    } else {
      Alert.alert("Error", "Invalid email or password");
    }
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
          <Text style={[styles.title, { color: Colors.light.text }]}>Login</Text>

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
              placeholder="Enter your password"
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

          <FormButton
            title="Login"
            onPress={handleLogin}
            colorScheme="light"
          />

          <TouchableOpacity
            style={styles.registerContainer}
            onPress={() => navigation.navigate("Signup")}
          >
            <Text style={styles.registerText}>
              Don&apos;t have an account? <Text style={styles.registerLink}>Create one</Text>
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
  errorText: {
    color: "red",
    fontSize: 14,
    marginTop: 1,
    fontFamily: "PoppinsRegular",
  },
  registerContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  registerText: {
    color: Colors.light.text,
    fontSize: 16,
    fontFamily: "PoppinsRegular",
  },
  registerLink: {
    fontFamily: "PoppinsMedium",
    color: Colors.light.primary,
  },
});
