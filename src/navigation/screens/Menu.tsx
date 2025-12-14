import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { StyleSheet, View, FlatList, Image } from "react-native";
import { Colors } from "@/constants/Colors";
import { HeaderBar } from "@/components/ui/HeadBar";

const menuItems = [
  {
    id: "1",
    name: "Cappuccino",
    description: "Espresso with steamed milk and foam",
    price: "$3.50",
    image: "https://cdn-icons-png.flaticon.com/512/197/197488.png",
  },
  {
    id: "2",
    name: "Latte",
    description: "Smooth espresso with milk",
    price: "$4.00",
    image: "https://cdn-icons-png.flaticon.com/512/135/135637.png",
  },
  {
    id: "3",
    name: "Espresso",
    description: "Strong and bold espresso shot",
    price: "$2.50",
    image: "https://cdn-icons-png.flaticon.com/512/135/135623.png",
  },
  {
    id: "4",
    name: "Mocha",
    description: "Chocolate flavored espresso",
    price: "$4.50",
    image: "https://cdn-icons-png.flaticon.com/512/135/135622.png",
  },
];

export function Menu() {
  return (
    <ThemedView style={styles.container}>
      <HeaderBar title="Menu" showBack={true} />

      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.content}
        renderItem={({ item }) => (
          <View style={styles.menuCard}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.info}>
              <ThemedText style={styles.name}>{item.name}</ThemedText>
              <ThemedText style={styles.description}>{item.description}</ThemedText>
              <ThemedText style={styles.price}>{item.price}</ThemedText>
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
  menuCard: {
    flexDirection: "row",
    backgroundColor: Colors.light.background,
    borderRadius: 12,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  info: {
    flex: 1,
    marginLeft: 15,
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.light.text,
  },
  description: {
    fontSize: 14,
    color: Colors.light.primary,
    marginVertical: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: "500",
    color: Colors.light.text,
  },
});
