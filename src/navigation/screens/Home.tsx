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

export function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <ThemedView style={[styles.container, { backgroundColor: Colors.light.background }]}>
      
      <HeaderBar 
        title="Dashboard" 
        showBack={false} 
        rightComponent={
          <TouchableOpacity >
            <Ionicons name="notifications-outline" size={28} color={Colors.light.primary} />
          </TouchableOpacity>
        }
      />


      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        
        <ThemedText style={styles.welcomeText}>Welcome Back!</ThemedText>
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
                  leftComponent= {
                    <MaterialIcons name="coffee-maker" size={24} color={Colors.light.background}/>
                  }
                />
        <ThemedText style={styles.subtitleText}>Daily Specials</ThemedText>

        <View style={styles.cardsContainer}>

          <TouchableOpacity style={styles.card}>
            <Ionicons name="chatbubble-ellipses-outline" size={32} color={Colors.light.primary} />
            <ThemedText style={styles.cardTitle}>Messages</ThemedText>
            <ThemedText style={styles.cardSubtitle}>Check your latest messages</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card}>
            <Ionicons name="settings-outline" size={32} color={Colors.light.primary} />
            <ThemedText style={styles.cardTitle}>Settings</ThemedText>
            <ThemedText style={styles.cardSubtitle}>Manage your preferences</ThemedText>
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
    color: Colors.light.text,
    fontWeight:700,
    marginBottom: 5,
    marginTop: 15,
    padding: 5,
  },
  subtitleText: {
    fontSize: 20,
    fontWeight: 600,
    fontFamily: "Poppins-Regular",
    color: Colors.light.text,
    marginTop:25,
    marginBottom: 15,
  },
  cardsContainer: {
    flexDirection: "column",
    gap: 15,
  },
  card: {
    backgroundColor: Colors.light.background,
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
    color: Colors.light.text,
    marginTop: 10,
  },
  cardSubtitle: {
    fontSize: 14,
    fontFamily: "PoppinsRegular",
    color: Colors.light.primary,
    marginTop: 4,
  },
});
