import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from "react-native";
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
          style={styles.sideComponent}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back-outline" size={28} color={textColor} />
        </TouchableOpacity>
      ) : (
        <View style={styles.sideComponent} />
      )}

      <Text style={[styles.title, { color: textColor }]}>{title}</Text>

      <View style={styles.sideComponent}>
        {rightComponent ? rightComponent : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-end",      
    width: "100%",
    paddingHorizontal: 15,
    paddingTop: StatusBar.currentHeight ? StatusBar.currentHeight + 5 : 20, 
    paddingBottom: 0,            
    height: 70,                  
    elevation: 5,
  },
  sideComponent: {
    width: 40,
    justifyContent: "flex-end",   
    alignItems: "center",
    paddingBottom: 0,
  },
  title: {
    flex: 1,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "600",
    fontFamily: "PoppinsBold",
    marginBottom: 0,              
  },
});
