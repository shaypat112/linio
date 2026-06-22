// linio/mobile/app/components/EmptyState.tsx

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface EmptyStateProps {
  filter: "all" | "active" | "completed";
}

export default function EmptyState({ filter }: EmptyStateProps) {
  const messages = {
    all: "No todos yet",
    active: "All done! 🎉",
    completed: "No completed tasks",
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconWrapper}>
        <Ionicons name="checkmark-done" size={48} color="#4A90E2" />
      </View>
      <Text style={styles.title}>{messages[filter]}</Text>
      <Text style={styles.subtitle}>
        {filter === "all" && "Tap + to create your first task"}
        {filter === "active" && "You have no active tasks"}
        {filter === "completed" && "Complete a task to see it here"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  iconWrapper: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#EBF5FF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1A1A2E",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#9CA3AF",
    textAlign: "center",
  },
});
