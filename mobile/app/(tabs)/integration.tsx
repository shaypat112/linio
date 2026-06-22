// linio/mobile/app/(tabs)/integration.tsx
// Simple version without the broken dynamic import

import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StatusBar,
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import IntegrationCard from "../components/IntegrationCard";
import { integrations } from "../data/integrations";

const API_BASE_URL = "http://localhost:3000/api";

export default function IntegrationsPage() {
  const router = useRouter();
  const [connectedServices, setConnectedServices] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);

  useEffect(() => {
    // Mock check for now - replace with real API call later
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const handleToggle = async (id: string) => {
    const integration = integrations.find((i) => i.id === id);

    if (integration?.comingSoon) {
      Alert.alert(
        "Coming Soon!",
        `${integration.name} integration is coming soon.`,
      );
      return;
    }

    const isConnected = connectedServices.includes(id);

    if (isConnected) {
      Alert.alert(
        "Disconnect",
        `Are you sure you want to disconnect ${integration?.name}?`,
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Disconnect",
            style: "destructive",
            onPress: () => {
              setConnectedServices((prev) => prev.filter((s) => s !== id));
              Alert.alert(
                "Disconnected",
                `${integration?.name} has been disconnected`,
              );
            },
          },
        ],
      );
    } else {
      Alert.alert(
        `Connect to ${integration?.name}`,
        `You'll be redirected to ${integration?.name} to authorize access.`,
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Connect",
            onPress: async () => {
              try {
                // Open browser for OAuth
                const result = await WebBrowser.openAuthSessionAsync(
                  "https://example.com/oauth",
                  "linio://",
                );

                if (result.type === "success") {
                  setConnectedServices((prev) => [...prev, id]);
                  Alert.alert(
                    "Connected!",
                    `Successfully connected to ${integration?.name}`,
                  );
                }
              } catch (error) {
                Alert.alert("Error", "Failed to connect. Please try again.");
              }
            },
          },
        ],
      );
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4A90E2" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#1A1A2E" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Integrations</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{connectedServices.length}</Text>
            <Text style={styles.statLabel}>Connected</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{integrations.length}</Text>
            <Text style={styles.statLabel}>Available</Text>
          </View>
        </View>

        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>
            Connect your school accounts to automatically sync assignments,
            deadlines, and notifications.
          </Text>
        </View>

        <View style={styles.listContainer}>
          {integrations.map((integration) => (
            <IntegrationCard
              key={integration.id}
              integration={integration}
              onToggle={handleToggle}
              isConnected={connectedServices.includes(integration.id)}
            />
          ))}
        </View>

        <View style={styles.helpContainer}>
          <Ionicons name="help-circle-outline" size={20} color="#6B7280" />
          <Text style={styles.helpText}>Need help connecting?</Text>
          <TouchableOpacity>
            <Text style={styles.helpLink}>Learn More</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: "#6B7280",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E8ECF1",
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1A1A2E",
  },
  placeholder: {
    width: 32,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  statsContainer: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  statCard: {
    flex: 1,
    alignItems: "center",
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1A1A2E",
  },
  statLabel: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    backgroundColor: "#E5E7EB",
  },
  descriptionContainer: {
    marginBottom: 20,
  },
  description: {
    fontSize: 14,
    color: "#6B7280",
    lineHeight: 22,
  },
  listContainer: {
    marginBottom: 20,
  },
  helpContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#F3F4F6",
    borderRadius: 12,
    gap: 8,
  },
  helpText: {
    fontSize: 13,
    color: "#6B7280",
  },
  helpLink: {
    fontSize: 13,
    color: "#4A90E2",
    fontWeight: "600",
  },
  bottomPadding: {
    height: 40,
  },
});
