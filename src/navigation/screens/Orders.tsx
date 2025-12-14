import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { StyleSheet, View, FlatList } from "react-native";
import { Colors } from "@/constants/Colors";
import { HeaderBar } from "@/components/ui/HeadBar";

const sampleOrders = [
  {
    id: "1",
    name: "Cappuccino",
    orderNumber: "#12345",
    status: "Delivered",
    price: "$3.50",
    time: "2 hours ago",
  },
  {
    id: "2",
    name: "Latte",
    orderNumber: "#12346",
    status: "Preparing",
    price: "$4.00",
    time: "1 hour ago",
  },
  {
    id: "3",
    name: "Espresso",
    orderNumber: "#12347",
    status: "Cancelled",
    price: "$2.50",
    time: "Yesterday",
  },
  {
    id: "4",
    name: "Mocha",
    orderNumber: "#12348",
    status: "Delivered",
    price: "$4.50",
    time: "2 days ago",
  },
];

export function Orders() {
  return (
    <ThemedView style={styles.container}>
      
      <HeaderBar title="Orders" showBack={true} />

      <FlatList
        data={sampleOrders}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.content}
        renderItem={({ item }) => (
          <View style={styles.orderCard}>
            <View style={styles.info}>
              <ThemedText style={styles.name}>{item.name}</ThemedText>
              <ThemedText style={styles.orderNumber}>{item.orderNumber}</ThemedText>
              <ThemedText style={styles.status}>{item.status}</ThemedText>
            </View>
            <View style={styles.right}>
              <ThemedText style={styles.price}>{item.price}</ThemedText>
              <ThemedText style={styles.time}>{item.time}</ThemedText>
            </View>
          </View>
        )}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  content: {
    padding: 20,
    gap: 15,
  },
  orderCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: Colors.light.background,
    borderRadius: 12,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  info: {},
  right: {
    alignItems: "flex-end",
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.light.text,
  },
  orderNumber: {
    fontSize: 14,
    color: Colors.light.primary,
    marginVertical: 2,
  },
  status: {
    fontSize: 14,
    fontWeight: "500",
    color: Colors.light.text,
    opacity: 0.7,
  },
  price: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.light.text,
  },
  time: {
    fontSize: 12,
    color: Colors.light.text,
    opacity: 0.6,
  },
});
