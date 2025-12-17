import { StyleSheet, View, ScrollView, TouchableOpacity } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { HeaderBar } from "@/components/ui/HeadBar";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { SearchBar } from "@/components/ui/serachBar";
import { useState } from "react";
import { FormButton } from "@/components/FormButton";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "@/context/ThemeContext";

export function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigation = useNavigation<any>();
  const { theme } = useTheme();
  const notificationCount = 3;

  const bgColor = theme === "dark" ? Colors.dark.background : Colors.light.background;
  const cardColor = theme === "dark" ? "#2A2A2A" : Colors.light.background;
  const textColor = theme === "dark" ? Colors.dark.text : Colors.light.text;
  const secondaryText = theme === "dark" ? Colors.dark.primary : Colors.light.primary;

  return (
    <ThemedView style={[styles.container, { backgroundColor: bgColor }]}>
      <HeaderBar
        title="Dashboard"
        showBack={false}
        rightComponent={
          <TouchableOpacity onPress={() => navigation.navigate("Notification")}>
            <View style={styles.iconWrapper}>
              <Ionicons
                name="notifications-outline"
                size={28}
                color={secondaryText}
              />
              {notificationCount > 0 && (
                <View style={styles.badge}>
                  <ThemedText style={styles.badgeText}>
                    {notificationCount > 99 ? "99+" : notificationCount}
                  </ThemedText>
                </View>
              )}
            </View>
          </TouchableOpacity>
        }
      />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <ThemedText style={[styles.welcomeText, { color: textColor }]} type="title">
          Welcome Back!
        </ThemedText>

        <View style={styles.searchContainer}>
          <SearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search for drinks or snacks"
          />
        </View>

        <FormButton
          title="Start Your Order"
          onPress={() => navigation.navigate("OrderForm")}
          colorScheme="light"
          leftComponent={
            <MaterialIcons name="coffee-maker" size={24} color={Colors.light.background} />
          }
        />

        <ThemedText style={[styles.subtitleText, { color: textColor }]} type="subtitle">
          Today at Our Café
        </ThemedText>

        <View style={styles.cardsContainer}>
        
          <TouchableOpacity style={[styles.orderCard, { backgroundColor: cardColor }]} onPress={()=>navigation.navigate("Menu")}>
            <View style={styles.info}>
              <ThemedText style={[styles.name, { color: textColor }]}>
                Today’s Special
              </ThemedText>
              <ThemedText style={[styles.orderNumber, { color: secondaryText }]}>
                Caramel Latte & Butter Croissant
              </ThemedText>
            </View>
            <View style={styles.right}>
              <Ionicons name="cafe-outline" size={28} color={secondaryText} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.orderCard, { backgroundColor: cardColor }]} onPress={()=>navigation.navigate("Orders")}>
            <View style={styles.info}>
              <ThemedText style={[styles.name, { color: textColor }]}>
                Your Orders
              </ThemedText>
              <ThemedText style={[styles.orderNumber, { color: secondaryText }]}>
                Track and reorder your favorites
              </ThemedText>
            </View>
            <View style={styles.right}>
              <Ionicons name="receipt-outline" size={28} color={secondaryText} />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    paddingHorizontal: 5,
    marginTop: 5,
    marginBottom: 10,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  welcomeText: {
    fontSize: 30,
    fontFamily: "PoppinsBold",
    fontWeight: "700",
    marginBottom: 5,
    marginTop: 15,
    padding: 5,
  },
  subtitleText: {
    fontSize: 20,
    fontWeight: "600",
    fontFamily: "Poppins-Regular",
    marginTop: 25,
    marginBottom: 15,
  },
  cardsContainer: {
    flexDirection: "column",
    gap: 15,
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
  right: {
    alignItems: "flex-end",
    justifyContent: "center",
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
  },
  orderNumber: {
    fontSize: 14,
    marginVertical: 2,
  },
  iconWrapper: {
    position: "relative",
  },
  badge: {
    position: "absolute",
    top: -6,
    right: -6,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#FF3B30",
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "700",
    textAlign: "center",
    lineHeight: 12,
  },
});
