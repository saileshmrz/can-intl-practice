import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "@/constants/Colors";

type HeaderBarProps = {
  title?: string;
  showBack?: boolean;
  rightComponent?: React.ReactNode;
};

export const HeaderBar: React.FC<HeaderBarProps> = ({ title, showBack = true, rightComponent }) => {
  const navigation = useNavigation<any>();

  return (
    <View style={[styles.container, { backgroundColor: Colors.light.background }]}>
      {showBack ? (
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back-outline" size={28} color={Colors.light.text} />
        </TouchableOpacity>
      ) : (
        <View style={{ width: 40 }} />
      )}

      <Text style={styles.title}>{title}</Text>

      <View style={styles.rightPlaceholder}>
        {rightComponent ? rightComponent : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    width:"100%",
    paddingHorizontal: 15,
    paddingVertical: 20,
    backgroundColor: Colors.light.background,
    borderRadius: 12,
    marginTop: 20,
    elevation: 5,
  },
  backButton: {
    width: 40,
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    borderRadius: 8,
    
  },
  title: {
    flex: 1,
    textAlign: "center",
    fontSize: 20,
    fontWeight: 600,
    fontFamily: "PoppinsBold",
    color: Colors.light.text,
  },
  rightPlaceholder: {
    width: 40,
    alignItems: "center",
    justifyContent: "center",
  },
});
