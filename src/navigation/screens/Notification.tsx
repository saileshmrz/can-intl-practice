import { StyleSheet, View, ScrollView } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { HeaderBar } from "@/components/ui/HeadBar";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

const sampleNotifications = [
  { id: 1, title: "Order Confirmed", description: "Your order #12345 has been confirmed.", time: "2h ago" },
  { id: 2, title: "New Offer", description: "Get 20% off on your next order!", time: "5h ago" },
  { id: 3, title: "Order Delivered", description: "Your order #12344 has been delivered.", time: "1d ago" },
  { id: 4, title: "Promotion", description: "Buy 1 get 1 free on selected items.", time: "2d ago" },
];

export function Notification({ navigation }: any) {
  return (
    <ThemedView style={styles.container}>
      
      <HeaderBar
        title="Notifications"
        showBack={true} 
      />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {sampleNotifications.map(item => (
          <View key={item.id} style={styles.notificationCard}>
            <Ionicons name="notifications-outline" size={28} color={Colors.light.primary} />
            <View style={styles.notificationInfo}>
              <ThemedText style={styles.notificationTitle}>{item.title}</ThemedText>
              <ThemedText style={styles.notificationDescription}>{item.description}</ThemedText>
              <ThemedText style={styles.notificationTime}>{item.time}</ThemedText>
            </View>
          </View>
        ))}
      </ScrollView>
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
  },
  notificationCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: Colors.light.background || "rgba(238,236,232,0.3)",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  notificationInfo: {
    flex: 1,
    marginLeft: 15,
  },
  notificationTitle: {
    fontSize: 18,
    fontFamily: "PoppinsMedium",
    color: Colors.light.text,
    marginBottom: 4,
  },
  notificationDescription: {
    fontSize: 14,
    fontFamily: "PoppinsRegular",
    color: Colors.light.primary,
    marginBottom: 6,
  },
  notificationTime: {
    fontSize: 12,
    fontFamily: "PoppinsRegular",
    color: Colors.light.text,
    opacity: 0.6,
  },
});
