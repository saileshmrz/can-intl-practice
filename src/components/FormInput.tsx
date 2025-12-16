import React from "react";
import { TextInput, StyleSheet, View, Text, TextInputProps } from "react-native";
import { Colors } from "../constants/Colors";

interface FormInputProps extends TextInputProps {
  label?: string;
  colorScheme?: "light" | "dark";
  error?: string; 
  textColor ?: string,
}

export const FormInput: React.FC<FormInputProps> = ({
  label,
  colorScheme = "light",
  style,
  error,   
  textColor,
  ...props
}) => {
  return (
    <View style={styles.container}>
      {label && (
        <Text style={[styles.label, { color: Colors[colorScheme].text }]}>
          {label}
        </Text>
      )}

      <TextInput
        style={[
          styles.input,
          {
            borderColor: error
              ? "red"
              : Colors[colorScheme].icon,
            color: Colors[colorScheme].text,
          },
          style,
        ]}
        placeholderTextColor={Colors[colorScheme].icon}
        {...props}
      />

      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    width: "100%",
  },
  label: {
    marginBottom: 5,
    fontSize: 14,
    fontWeight: "500",
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: "#f9f9f9",
  },
  errorText: {
    color: "red",
    fontSize: 13,
    marginTop: 4,
  },
});
