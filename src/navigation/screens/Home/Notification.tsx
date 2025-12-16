import { StyleSheet, View, FlatList, TouchableOpacity } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { HeaderBar } from "@/components/ui/HeadBar";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/context/ThemeContext";
import { Colors } from "@/constants/Colors";
import { showToast } from "@/utils/toast";

const sampleNotifications = [
  { id: "1", title: "Order Confirmed", description: "Your order #12345 has been confirmed.", time: "2h ago" },
  { id: "2", title: "New Offer", description: "Get 20% off on your next order!", time: "5h ago" },
  { id: "3", title: "Order Delivered", description: "Your order #12344 has been delivered.", time: "1d ago" },
  { id: "4", title: "Promotion", description: "Buy 1 get 1 free on selected items.", time: "2d ago" },
];

export function Notification({ navigation }: any) {
  const { theme } = useTheme();

  const bgColor = theme === "dark" ? Colors.dark.background : Colors.light.background;
  const cardColor = theme === "dark" ? "#2A2A2A" : Colors.light.background;
  const textColor = theme === "dark" ? Colors.dark.text : Colors.light.text;
  const secondaryText = theme === "dark" ? Colors.dark.primary : Colors.light.primary;

  const handleMarkAllRead = () => {
   
    showToast("error", "All notifications marked as read")
  };

  return (
    <ThemedView style={[styles.container, { backgroundColor: bgColor }]}>
      <HeaderBar title="Notifications" showBack={true} />

    
      <View style={styles.markReadContainer}>
        <TouchableOpacity
          style={[styles.markReadButton, { borderColor: secondaryText }]}
          onPress={handleMarkAllRead}
        >
          <ThemedText style={[styles.markReadText, { color: secondaryText }]}>
            Mark All as Read
          </ThemedText>
        </TouchableOpacity>
      </View>

      <FlatList
        data={sampleNotifications}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.content}
        renderItem={({ item }) => (
          <View style={[styles.notificationCard, { backgroundColor: cardColor }]}>
            <Ionicons name="notifications-outline" size={28} color={secondaryText} />
            <View style={styles.notificationInfo}>
              <ThemedText style={[styles.notificationTitle, { color: textColor }]}>{item.title}</ThemedText>
              <ThemedText style={[styles.notificationDescription, { color: secondaryText }]}>{item.description}</ThemedText>
              <ThemedText style={[styles.notificationTime, { color: secondaryText, opacity: 0.7 }]}>{item.time}</ThemedText>
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
  markReadContainer: {
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  markReadButton: {
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignSelf: "flex-start",
    marginTop: 15,
    marginBottom: 5,
  },
  markReadText: {
    fontSize: 14,
    fontWeight: "600",
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    gap: 15
  },
  notificationCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    borderRadius: 12,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  notificationInfo: {
    flex: 1,
    marginLeft: 15,
  },
  notificationTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  notificationDescription: {
    fontSize: 14,
    marginBottom: 6,
  },
  notificationTime: {
    fontSize: 12,
  },
});
