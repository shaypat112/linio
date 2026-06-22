import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const integrations = [
  { id: "canvas", name: "Canvas", icon: "school", connected: false },
  { id: "cpcc", name: "CPCC", icon: "book", connected: false },
  { id: "notion", name: "Notion", icon: "document-text", connected: false },
  {
    id: "google-classroom",
    name: "Google Classroom",
    icon: "logo-google",
    connected: false,
  },
  {
    id: "khan-academy",
    name: "Khan Academy",
    icon: "logo-khan-academy",
    connected: false,
  },
];

export default function SettingsScreen() {
  const [integrationsState, setIntegrationsState] = useState(integrations);
  const navigation = useNavigation();

  const toggleIntegration = (id: string) => {
    setIntegrationsState(
      integrationsState.map((integration) =>
        integration.id === id
          ? { ...integration, connected: !integration.connected }
          : integration,
      ),
    );
  };

  const renderIntegrationItem = ({
    id,
    name,
    icon,
    connected,
  }: (typeof integrations)[0]) => (
    <View style={styles.integrationItem} key={id}>
      <View style={styles.integrationLeft}>
        <Ionicons name={icon as any} size={24} color="#4A90E2" />
        <Text style={styles.integrationName}>{name}</Text>
      </View>
      <Switch
        value={connected}
        onValueChange={() => toggleIntegration(id)}
        trackColor={{ false: "#767577", true: "#4A90E2" }}
      />
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Integrations</Text>
        <Text style={styles.sectionDescription}>
          Connect your learning tools to sync assignments, notes, and more.
        </Text>
        {integrationsState.map(renderIntegrationItem)}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>App Settings</Text>
        <View style={styles.settingItem}>
          <Text style={styles.settingName}>Dark Mode</Text>
          <Switch
            value={false} // Replace with your dark mode state
            onValueChange={() => {}}
            trackColor={{ false: "#767577", true: "#4A90E2" }}
          />
        </View>
        <View style={styles.settingItem}>
          <Text style={styles.settingName}>Notifications</Text>
          <Switch
            value={true} // Replace with your notifications state
            onValueChange={() => {}}
            trackColor={{ false: "#767577", true: "#4A90E2" }}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <TouchableOpacity style={styles.aboutItem}>
          <Text style={styles.aboutText}>Privacy Policy</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.aboutItem}>
          <Text style={styles.aboutText}>Terms of Service</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.aboutItem}>
          <Text style={styles.aboutText}>Version 1.0.0</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  sectionDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 20,
  },
  integrationItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  integrationLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  integrationName: {
    fontSize: 16,
    marginLeft: 15,
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  settingName: {
    fontSize: 16,
  },
  aboutItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  aboutText: {
    fontSize: 16,
    color: "#4A90E2",
  },
});
