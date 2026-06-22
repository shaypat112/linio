// linio/mobile/app/components/IntegrationCard.tsx

import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Switch } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Integration } from "../data/integrations";

interface IntegrationCardProps {
  integration: Integration;
  onToggle: (id: string) => void;
  isConnected: boolean;
}

export default function IntegrationCard({
  integration,
  onToggle,
  isConnected,
}: IntegrationCardProps) {
  return (
    <View style={[styles.card, isConnected && styles.cardConnected]}>
      <View style={styles.leftContent}>
        <View
          style={[
            styles.iconWrapper,
            { backgroundColor: integration.color + "15" },
          ]}
        >
          <Ionicons
            name={integration.icon as any}
            size={24}
            color={integration.color}
          />
        </View>

        <View style={styles.info}>
          <Text style={styles.name}>{integration.name}</Text>
          <Text style={styles.description}>{integration.description}</Text>
          {integration.comingSoon && (
            <View style={styles.comingSoonBadge}>
              <Text style={styles.comingSoonText}>Coming Soon</Text>
            </View>
          )}
        </View>
      </View>

      <Switch
        value={isConnected}
        onValueChange={() => onToggle(integration.id)}
        trackColor={{ false: "#D1D5DB", true: integration.color }}
        thumbColor={isConnected ? "#FFFFFF" : "#FFFFFF"}
        ios_backgroundColor="#D1D5DB"
        disabled={integration.comingSoon}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 14,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  cardConnected: {
    borderWidth: 1,
    borderColor: "#4CAF50",
  },
  leftContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  iconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1A1A2E",
    marginBottom: 2,
  },
  description: {
    fontSize: 13,
    color: "#6B7280",
    lineHeight: 18,
  },
  comingSoonBadge: {
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: "flex-start",
    marginTop: 4,
  },
  comingSoonText: {
    fontSize: 10,
    color: "#6B7280",
    fontWeight: "500",
  },
});
