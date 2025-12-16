import { View, Text, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors"; 

export const toastConfig = {
  success: ({ text1, text2 }: any) => (
    <View style={[styles.toast, { backgroundColor: Colors.light.background }]}>
      <Text style={[styles.title, { color: Colors.light.primary }]}>{text1}</Text>
      {text2 && <Text style={styles.message}>{text2}</Text>}
    </View>
  ),

  error: ({ text1, text2 }: any) => (
    <View style={[styles.toast, { backgroundColor: Colors.light.background }]}>
      <Text style={[styles.title, { color: Colors.light.primary }]}>{text1}</Text>
      {text2 && <Text style={styles.message}>{text2}</Text>}
    </View>
  ),

  info: ({ text1, text2 }: any) => (
    <View style={[styles.toast, { backgroundColor: Colors.light.background }]}>
      <Text style={[styles.title, { color: Colors.light.primary }]}>{text1}</Text>
      {text2 && <Text style={styles.message}>{text2}</Text>}
    </View>
  ),
};

const styles = StyleSheet.create({
  toast: {
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  title: {
    fontSize: 16,
    fontFamily: "PoppinsMedium",
  },
  message: {
    fontSize: 14,
    fontFamily: "PoppinsRegular",
    marginTop: 2,
    color: "#666",
    lineHeight: 20,
  },
});
