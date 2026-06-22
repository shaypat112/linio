// linio/mobile/app/components/Header.tsx

import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface HeaderProps {
  name?: string;
  taskCount: number;
}

export default function Header({ name = "Student", taskCount }: HeaderProps) {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Morning" : hour < 18 ? "Afternoon" : "Evening";

  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.greeting}>
          Good {greeting}, <Text style={styles.name}>{name}</Text>
        </Text>
        <Text style={styles.subtext}>{taskCount} tasks remaining</Text>
      </View>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{name[0]}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  greeting: {
    fontSize: 16,
    color: "#6B7280",
  },
  name: {
    color: "#1A1A2E",
    fontWeight: "700",
  },
  subtext: {
    fontSize: 13,
    color: "#9CA3AF",
    marginTop: 2,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#4A90E2",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});
