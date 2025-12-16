import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { StyleSheet, View, FlatList } from "react-native";
import { HeaderBar } from "@/components/ui/HeadBar";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/context/ThemeContext";

const sampleOrders = [
  { id: "1", name: "Cappuccino", orderNumber: "#12345", status: "Delivered", price: "$3.50", time: "2 hours ago" },
  { id: "2", name: "Latte", orderNumber: "#12346", status: "Preparing", price: "$4.00", time: "1 hour ago" },
  { id: "3", name: "Espresso", orderNumber: "#12347", status: "Cancelled", price: "$2.50", time: "Yesterday" },
  { id: "4", name: "Mocha", orderNumber: "#12348", status: "Delivered", price: "$4.50", time: "2 days ago" },
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
        renderItem={({ item }) => (
          <View style={[styles.orderCard, { backgroundColor: cardColor }]}>
            <View style={styles.info}>
              <ThemedText style={[styles.name, { color: textColor }]}>{item.name}</ThemedText>
              <ThemedText style={[styles.orderNumber, { color: secondaryText }]}>{item.orderNumber}</ThemedText>
              <ThemedText style={[styles.status, { color: textColor, opacity: 0.7 }]}>{item.status}</ThemedText>
            </View>
            <View style={styles.right}>
              <ThemedText style={[styles.price, { color: textColor }]}>{item.price}</ThemedText>
              <ThemedText style={[styles.time, { color: secondaryText, opacity: 0.7 }]}>{item.time}</ThemedText>
            </View>
          </View>
        )}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container:
  {
    flex: 1
  },
  content:
  {
    padding: 20,
    gap: 15
  },
  orderCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 12,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  info: {},
  right:
  {
    alignItems: "flex-end"
  },
  name:
  {
    fontSize: 18,
    fontWeight: "600"
  },
  orderNumber:
  {
    fontSize: 14,
    marginVertical: 2
  },
  status:
  {
    fontSize: 14,
    fontWeight: "500",
    opacity: 0.7
  },
  price:
  {
    fontSize: 16,
    fontWeight: "600"
  },
  time:
  {
    fontSize: 12,
    opacity: 0.7
  },
});
