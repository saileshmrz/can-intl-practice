import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { StyleSheet, View } from "react-native";
import { Colors } from "@/constants/Colors";

export function Orders() {
  return (
    <ThemedView style={styles.container}>
      <View style={styles.content}>
        <ThemedText style={styles.title}>Orders</ThemedText>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 10,
    color: Colors.light.text,
  },
});
