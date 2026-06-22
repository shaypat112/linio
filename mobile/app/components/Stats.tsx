// linio/mobile/app/components/Stats.tsx

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import "../app.css";

interface StatsProps {
  active: number;
  completed: number;
  total: number;
}

export default function Stats({ active, completed, total }: StatsProps) {
  return (
    <View style={styles.container}>
      <View style={styles.stat}>
        <Text style={styles.number}>{active}</Text>
        <Text style={styles.label}>Active</Text>
      </View>
      <View style={styles.divider} />
      <View style={styles.stat}>
        <Text style={styles.number}>{completed}</Text>
        <Text style={styles.label}>Done</Text>
      </View>
      <View style={styles.divider} />
      <View style={styles.stat}>
        <Text style={styles.number}>{total}</Text>
        <Text style={styles.label}>Total</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginHorizontal: 24,
    marginBottom: 20,
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  stat: {
    flex: 1,
    alignItems: "center",
  },
  number: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1A1A2E",
  },
  label: {
    fontSize: 12,
    color: "#9CA3AF",
    marginTop: 2,
  },
  divider: {
    width: 1,
    backgroundColor: "#E5E7EB",
  },
});
