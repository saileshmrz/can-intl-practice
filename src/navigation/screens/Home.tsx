import { StyleSheet, View, ScrollView, TouchableOpacity } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { HeaderBar } from "@/components/ui/HeadBar";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { SearchBar } from "@/components/ui/serachBar";
import { useState } from "react";
import { FormButton } from "@/components/FormButton";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useNavigation } from "@react-navigation/native";


export function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigation = useNavigation<any>();

  return (
    <ThemedView style={styles.container}>
      
      <HeaderBar 
        title="Dashboard" 
        showBack={false} 
        rightComponent={
          <TouchableOpacity onPress={() => navigation.navigate("Notification")}>
            <Ionicons name="notifications-outline" size={28} color={Colors.light.primary} />
          </TouchableOpacity>
        }
      />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        
        <ThemedText style={styles.welcomeText} type="title">Welcome Back!</ThemedText>
        <View style={styles.searchContainer}>
          <SearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search for content"
          />
        </View>

        <FormButton
          title="Start Your Order"
          onPress={() => {}}
          colorScheme="light"
          leftComponent={
            <MaterialIcons name="coffee-maker" size={24} color={Colors.light.background} />
          }
        />

        <ThemedText style={styles.subtitleText} type="subtitle">Daily Specials</ThemedText>

        <View style={styles.cardsContainer}>

          <TouchableOpacity style={styles.card}>
            <ThemedView>
              <Ionicons name="chatbubble-ellipses-outline" size={32} color={Colors.light.primary} />
              <ThemedText style={styles.cardTitle}>Messages</ThemedText>
              <ThemedText style={styles.cardSubtitle}>Check your latest messages</ThemedText>
            </ThemedView>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card}>
            <ThemedView>
              <Ionicons name="settings-outline" size={32} color={Colors.light.primary} />
              <ThemedText style={styles.cardTitle}>Settings</ThemedText>
              <ThemedText style={styles.cardSubtitle}>Manage your preferences</ThemedText>
            </ThemedView>
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
    fontWeight: 700,
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
  card: {
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontFamily: "PoppinsMedium",
    marginTop: 10,
  },
  cardSubtitle: {
    fontSize: 14,
    fontFamily: "PoppinsRegular",
    marginTop: 4,
  },
});
