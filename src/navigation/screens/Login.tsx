import { View, Text, StyleSheet, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { FormInput } from "@/components/FormInput";
import { Colors } from "@/constants/Colors";
import { FormButton } from "@/components/FormButton";
import { Entypo } from "@expo/vector-icons";
import { useForm, Controller } from "react-hook-form";


type LoginFormData = {
  email: string;
  password: string;
};

export function Login() {
  const navigation = useNavigation<any>();

  const [showPassword, setShowPassword] = useState(false);


  const { control, handleSubmit, watch, formState: { errors } } = useForm<LoginFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });


  const passwordValue = watch("password");


  const onSubmit = (data: LoginFormData) => {
    alert("Logged in successfully!");
    navigation.navigate("HomeTabs");
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <View style={[styles.container, { backgroundColor: Colors.light.background }]}>

          <View style={{ marginBottom: 40, alignItems: "center" }}>
            <Text style={[styles.titleBold, { color: Colors.light.text }]}>
              Welcome Back
            </Text>
            <Text style={[styles.titleNormal, { color: Colors.light.primary }]}>
              Login to continue
            </Text>
          </View>


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
                placeholder="Enter your email"
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
                  placeholder="Enter your password"
                  secureTextEntry={!showPassword}
                  colorScheme="light"
                  error={errors.password?.message}
                  style={styles.inputField}
                />
              )}
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


            <TouchableOpacity
              style={styles.forgotPasswordContainer}
            >
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>


          <FormButton
            title="Login"
            onPress={handleSubmit(onSubmit)}
            colorScheme="light"
          />

          <TouchableOpacity
            style={styles.registerContainer}
            onPress={() => navigation.navigate("Signup")}
          >
            <Text style={styles.registerText}>
              Don&apos;t have an account? <Text style={styles.registerLink}>Signup</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

    </KeyboardAvoidingView>
  );
}


const styles = StyleSheet.create({
  content:
  {
    flexGrow: 1,
    justifyContent: "center"
  },
  container:
  {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 30
  },
  titleBold: {
    fontSize: 32,
    fontWeight: 800,
    fontFamily: "PoppinsBold",
    textAlign: "center",
  },
  titleNormal: {
    fontSize: 20,
    fontFamily: "PoppinsRegular",
    textAlign: "center",
    marginTop: 5,
  },
  inputWrapper:
  {
    position: "relative",
    width: "100%", marginBottom: 15
  },
  inputField: {
    backgroundColor: 'rgba(238, 236, 232, 0.3)', 
    borderRadius: 5, 
    paddingHorizontal: 18,
    paddingVertical: 14,
    fontSize: 16,
    color: Colors.light.text, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2, 
    borderWidth: 1,
    borderColor: 'rgba(224, 211, 211, 0.4)', 
  },
  eyeIcon:
  {
    position: "absolute",
    right: 10,
    top: 38
  },
  errorText:
  {
    color: "red",
    fontSize: 14,
    marginTop: 1,
    fontFamily: "PoppinsRegular"
  },
  forgotPasswordContainer: {
    marginTop: 3,
    marginBottom: 3,
    alignSelf: "flex-end",
  },

  forgotPasswordText: {
    color: Colors.light.primary,
    fontFamily: "PoppinsMedium",
    fontSize: 14,
  },

  registerContainer:
  {
    marginTop: 20,
    alignItems: "center"
  },
  registerText:
  {
    color: Colors.light.text,
    fontSize: 16,
    fontFamily: "PoppinsRegular"
  },
  registerLink:
  {
    fontFamily: "PoppinsMedium",
    color: Colors.light.primary
  },
});
