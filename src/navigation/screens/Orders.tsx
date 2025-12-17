import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { StyleSheet, View, FlatList, Image } from "react-native";
import { HeaderBar } from "@/components/ui/HeadBar";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/context/ThemeContext";

const sampleOrders = [
  { id: "1", name: "Cappuccino", description: "Espresso with steamed milk and foam", price: "$3.50", status: "Delivered", time: "2 hours ago", image: "https://cdn-icons-png.flaticon.com/512/197/197488.png" },
  { id: "2", name: "Latte", description: "Smooth espresso with milk", price: "$4.00", status: "Preparing", time: "1 hour ago", image: "https://cdn-icons-png.flaticon.com/512/135/135637.png" },
  { id: "3", name: "Espresso", description: "Strong and bold espresso shot", price: "$2.50", status: "Cancelled", time: "Yesterday", image: "https://cdn-icons-png.flaticon.com/512/135/135623.png" },
  { id: "4", name: "Mocha", description: "Chocolate flavored espresso", price: "$4.50", status: "Delivered", time: "2 days ago", image: "https://cdn-icons-png.flaticon.com/512/135/135622.png" },
];

export function Orders() {
  const { theme } = useTheme();

  const bgColor = theme === "dark" ? Colors.dark.background : Colors.light.background;
  const cardColor = theme === "dark" ? "#2A2A2A" : Colors.light.background;
  const textColor = theme === "dark" ? Colors.dark.text : Colors.light.text;
  const secondaryText = theme === "dark" ? Colors.dark.primary : Colors.light.primary;

  return (
    <ThemedView style={[styles.container, { backgroundColor: bgColor }]}>
      <HeaderBar title="Orders" showBack={true} />

      <FlatList
        data={sampleOrders}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        ListFooterComponent={<View style={{ height: 50 }} />}
        renderItem={({ item }) => (
          <View style={[styles.orderCard, { backgroundColor: cardColor }]}>
            <Image source={{ uri: item.image }} style={styles.image} />

            <View style={styles.left}>
              <ThemedText style={[styles.name, { color: textColor }]}>{item.name}</ThemedText>
              <ThemedText style={[styles.description, { color: secondaryText }]}>{item.description}</ThemedText>
              <View style={[styles.statusContainer, { backgroundColor: item.status === "Cancelled" ? "#FFC0C0" : "#E0FFE0" }]}>
                <ThemedText style={[styles.status, { color: item.status === "Cancelled" ? "red" : "green" }]}>{item.status}</ThemedText>
              </View>
            </View>

            <View style={styles.right}>
              <ThemedText style={[styles.price, { color: textColor }]}>{item.price}</ThemedText>
              <ThemedText style={[styles.time, { color: secondaryText }]}>{item.time}</ThemedText>
            </View>
          </View>
        )}
      />

    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    padding: 20,
    gap: 16
  },
  orderCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
    alignItems: "center"
  },
  image: {
    width: 64,
    height: 64,
    borderRadius: 12,
    marginRight: 12
  },
  left: {
    flex: 1
  },
  right: {
    alignItems: "flex-end"
  },
  name: {
    fontSize: 18,
    fontWeight: "600"
  },
  description: {
    fontSize: 14,
    marginVertical: 2,
    opacity: 0.8
  },
  statusContainer: {
    marginTop: 6,
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 8,
    alignSelf: "flex-start"
  },
  status: {
    fontSize: 12,
    fontWeight: "600"
  },
  price: {
    fontSize: 16,
    fontWeight: "600"
  },
  time: {
    fontSize: 12,
    opacity: 0.7
  }
});
