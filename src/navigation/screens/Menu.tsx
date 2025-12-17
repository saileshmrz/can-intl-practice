import { StyleSheet, View, FlatList, Image, TouchableOpacity } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { HeaderBar } from "@/components/ui/HeadBar";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/context/ThemeContext";
import { useCart } from "@/context/cartContext";
import { useNavigation } from "@react-navigation/native";

const menuItems = [
  { id: "1", name: "Cappuccino", description: "Espresso with steamed milk and foam", price: "$3.50", rating: 4.8, time: "5 min", image: "https://cdn-icons-png.flaticon.com/512/197/197488.png" },
  { id: "2", name: "Latte", description: "Smooth espresso with milk", price: "$4.00", rating: 4.6, time: "6 min", image: "https://cdn-icons-png.flaticon.com/512/135/135637.png" },
  { id: "3", name: "Espresso", description: "Strong and bold espresso shot", price: "$2.50", rating: 4.9, time: "3 min", image: "https://cdn-icons-png.flaticon.com/512/135/135623.png" },
  { id: "4", name: "Mocha", description: "Chocolate flavored espresso", price: "$4.50", rating: 4.7, time: "6 min", image: "https://cdn-icons-png.flaticon.com/512/135/135622.png" },
  { id: "5", name: "Americano", description: "Espresso with hot water", price: "$3.00", rating: 4.5, time: "4 min", image: "https://cdn-icons-png.flaticon.com/512/197/197489.png" },
  { id: "6", name: "Macchiato", description: "Espresso with a small amount of foam", price: "$3.75", rating: 4.6, time: "5 min", image: "https://cdn-icons-png.flaticon.com/512/197/197490.png" },
  { id: "7", name: "Flat White", description: "Espresso with steamed milk", price: "$4.25", rating: 4.7, time: "6 min", image: "https://cdn-icons-png.flaticon.com/512/197/197491.png" },
  { id: "8", name: "Iced Coffee", description: "Chilled coffee over ice", price: "$3.50", rating: 4.4, time: "5 min", image: "https://cdn-icons-png.flaticon.com/512/197/197492.png" },
  { id: "9", name: "Frappuccino", description: "Blended iced coffee with cream", price: "$5.00", rating: 4.8, time: "7 min", image: "https://cdn-icons-png.flaticon.com/512/197/197493.png" },
];

export function Menu() {
  const { theme } = useTheme();
  const { dispatch } = useCart();
  const navigation = useNavigation();

  const bgColor =
    theme === "dark" ? Colors.dark.background : Colors.light.background;
  const textColor =
    theme === "dark" ? Colors.dark.text : Colors.light.text;
  const secondaryText =
    theme === "dark" ? Colors.dark.primary : Colors.light.primary;
  const cardColor =
    theme === "dark" ? "#2A2A2A" : Colors.light.background;

  return (
    <ThemedView style={[styles.container, { backgroundColor: bgColor }]}>
      <HeaderBar title="Menu" showBack />

      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={<View style={{ height: 50 }} />}
        renderItem={({ item }) => (
          <View style={[styles.menuCard, { backgroundColor: cardColor }]}>
            <Image source={{ uri: item.image }} style={styles.image} />

            <View style={styles.info}>
              <View style={styles.rowBetween}>
                <ThemedText style={[styles.name, { color: textColor }]}>
                  {item.name}
                </ThemedText>
                <ThemedText style={[styles.price, { color: textColor }]}>
                  {item.price}
                </ThemedText>
              </View>

              <ThemedText
                numberOfLines={2}
                style={[styles.description, { color: secondaryText }]}
              >
                {item.description}
              </ThemedText>

              <View style={styles.metaRow}>
                <ThemedText style={styles.metaText}>⭐ {item.rating}</ThemedText>
                <ThemedText style={styles.metaText}>⏱ {item.time}</ThemedText>
              </View>

              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  dispatch({
                    type: "ADD_TO_CART",
                    payload: {
                      id: item.id,
                      name: item.name,
                      price: parseFloat(item.price.replace("$", "")),
                      quantity: 1,
                      image: item.image,
                    },
                  });

                  navigation.navigate("AddToCart" as never);
                }}
              >
                <ThemedText style={styles.buttonText}>
                  Add to Cart
                </ThemedText>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: {
    padding: 20,
    gap: 16,
  },
  menuCard: {
    flexDirection: "row",
    borderRadius: 14,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: 64,
    height: 64,
    borderRadius: 12,
  },
  info: {
    flex: 1,
    marginLeft: 16,
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
  },
  description: {
    fontSize: 14,
    marginTop: 4,
    opacity: 0.85,
  },
  price: {
    fontSize: 16,
    fontWeight: "600",
  },
  metaRow: {
    flexDirection: "row",
    gap: 14,
    marginVertical: 6,
  },
  metaText: {
    fontSize: 13,
    opacity: 0.8,
  },
  button: {
    marginTop: 8,
    alignSelf: "flex-start",
    backgroundColor: Colors.light.primary,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },
  buttonText: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "500",
  },
});
