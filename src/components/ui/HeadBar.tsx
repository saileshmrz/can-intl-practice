import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useThemeColor } from "@/hooks/useThemeColor";

type HeaderBarProps = {
  title?: string;
  showBack?: boolean;
  backgroundColor?: string; 
  rightComponent?: React.ReactNode;
};

export const HeaderBar: React.FC<HeaderBarProps> = ({ title, showBack = true, rightComponent }) => {
  const navigation = useNavigation<any>();

  
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');

  return (
    <View style={[styles.container, { backgroundColor }]}>
      {showBack ? (
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back-outline" size={28} color={textColor} />
        </TouchableOpacity>
      ) : (
        <View style={{ width: 40 }} />
      )}

      <Text style={[styles.title, { color: textColor }]}>{title}</Text>

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
    fontWeight: "600",
    fontFamily: "PoppinsBold",
  },
  rightPlaceholder: {
    width: 40,
    alignItems: "center",
    justifyContent: "center",
  },
});
