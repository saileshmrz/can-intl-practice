import { View, FlatList, StyleSheet, Image, TouchableOpacity } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { HeaderBar } from "@/components/ui/HeadBar";
import { useCart } from "@/context/cartContext";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/context/ThemeContext";
import { showToast } from "@/utils/toast";

export default function AddToCart() {
  const { state, dispatch } = useCart();
  const { theme } = useTheme();

  const bgColor =
    theme === "dark" ? Colors.dark.background : Colors.light.background;
  const textColor =
    theme === "dark" ? Colors.dark.text : Colors.light.text;
  const mutedText =
    theme === "dark" ? Colors.dark.primary : Colors.light.primary;
  const cardColor =
    theme === "dark" ? "#2A2A2A" : Colors.light.background;

  const totalPrice = state.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    showToast("success","Checkout successfull");
  };

  return (
    <ThemedView style={[styles.container, { backgroundColor: bgColor }]}>
      <HeaderBar title="My Cart" showBack />

      {state.items.length === 0 ? (
        <View style={styles.emptyContainer}>
          <ThemedText style={[styles.emptyText, { color: mutedText }]}>
            Your cart is empty ☕
          </ThemedText>
        </View>
      ) : (
        <>
          <FlatList
            data={state.items}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.content}
            ListFooterComponent={<View style={{ height: 140 }} />}
            renderItem={({ item }) => (
              <View style={[styles.card, { backgroundColor: cardColor }]}>
                <Image source={{ uri: item.image }} style={styles.image} />

                <View style={styles.info}>
                  <ThemedText style={[styles.name, { color: textColor }]}>
                    {item.name}
                  </ThemedText>

                  <ThemedText style={[styles.price, { color: textColor }]}>
                    ${item.price.toFixed(2)}
                  </ThemedText>

                  <View style={styles.qtyRow}>
                    <TouchableOpacity
                      style={[
                        styles.qtyBtn,
                        {
                          backgroundColor:
                            theme === "dark" ? "#1F1F1F" : "#F2F2F2",
                        },
                      ]}
                      onPress={() =>
                        dispatch({
                          type: "UPDATE_CART",
                          payload: {
                            id: item.id,
                            quantity: Math.max(1, item.quantity - 1),
                          },
                        })
                      }
                    >
                      <ThemedText style={styles.qtyText}>−</ThemedText>
                    </TouchableOpacity>

                    <ThemedText style={styles.qtyValue}>
                      {item.quantity}
                    </ThemedText>

                    <TouchableOpacity
                      style={[
                        styles.qtyBtn,
                        {
                          backgroundColor:
                            theme === "dark" ? "#1F1F1F" : "#F2F2F2",
                        },
                      ]}
                      onPress={() =>
                        dispatch({
                          type: "UPDATE_CART",
                          payload: {
                            id: item.id,
                            quantity: item.quantity + 1,
                          },
                        })
                      }
                    >
                      <ThemedText style={styles.qtyText}>+</ThemedText>
                    </TouchableOpacity>
                  </View>
                </View>

                <TouchableOpacity
                  onPress={() =>
                    dispatch({
                      type: "REMOVE_FROM_CART",
                      payload: { id: item.id },
                    })
                  }
                >
                  <ThemedText style={styles.remove}>✕</ThemedText>
                </TouchableOpacity>
              </View>
            )}
          />

          <View
            style={[
              styles.footer,
              {
                backgroundColor: cardColor,
                borderTopColor: theme === "dark" ? "#333" : "#E5E5E5",
              },
            ]}
          >
            <View style={styles.totalRow}>
              <ThemedText style={[styles.totalLabel, { color: mutedText }]}>
                Total
              </ThemedText>
              <ThemedText style={[styles.totalValue, { color: textColor }]}>
                ${totalPrice.toFixed(2)}
              </ThemedText>
            </View>

            <TouchableOpacity style={styles.checkoutBtn} onPress={handleCheckout}>
              <ThemedText style={styles.checkoutText}>
                Checkout
              </ThemedText>
            </TouchableOpacity>
          </View>
        </>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: {
    padding: 20,
    gap: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "500",
    opacity: 0.8,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 4,
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
  name: {
    fontSize: 17,
    fontWeight: "600",
  },
  price: {
    fontSize: 15,
    marginTop: 4,
    opacity: 0.8,
  },
  qtyRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    gap: 14,
  },
  qtyBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  qtyText: {
    fontSize: 18,
    fontWeight: "600",
  },
  qtyValue: {
    fontSize: 16,
    fontWeight: "600",
  },
  remove: {
    fontSize: 18,
    color: "#FF4D4D",
    marginLeft: 10,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 18,
    borderTopWidth: 1,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "500",
  },
  totalValue: {
    fontSize: 20,
    fontWeight: "700",
  },
  checkoutBtn: {
    backgroundColor: Colors.light.primary,
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: "center",
  },
  checkoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
