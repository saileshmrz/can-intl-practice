import React from "react";
import { TouchableOpacity, Text, StyleSheet, GestureResponderEvent, View } from "react-native";
import { Colors } from "../constants/Colors";

interface FormButtonProps {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  colorScheme?: "light" | "dark";
  style?: object;
  leftComponent?: React.ReactNode;
}

export const FormButton: React.FC<FormButtonProps> = ({
  title,
  onPress,
  colorScheme = "light",
  style,
  leftComponent,
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: Colors[colorScheme].tint }, style]}
      onPress={onPress}
    >
      <View style={styles.leftPlaceholder}>
        {leftComponent ? leftComponent : null}
      </View>
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
    flexDirection: "row", 
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  leftPlaceholder: {
    marginRight: 8, 
  },
});
