import React from "react";
import { TouchableOpacity, Text, StyleSheet, GestureResponderEvent } from "react-native";
import { Colors } from "../constants/Colors"; 

interface FormButtonProps {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  colorScheme?: "light" | "dark";
  style?: object;
}

export const FormButton: React.FC<FormButtonProps> = ({
  title,
  onPress,
  colorScheme = "light",
  style,
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: Colors[colorScheme].tint }, style]}
      onPress={onPress}
    >
      <Text style={[styles.buttonText, { color: Colors[colorScheme].background }]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
