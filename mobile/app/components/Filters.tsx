// linio/mobile/app/components/Filters.tsx

import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

type Filter = "all" | "active" | "completed";

interface FiltersProps {
  activeFilter: Filter;
  onFilterChange: (filter: Filter) => void;
}

export default function Filters({
  activeFilter,
  onFilterChange,
}: FiltersProps) {
  const filters: Filter[] = ["all", "active", "completed"];

  return (
    <View style={styles.container}>
      {filters.map((filter) => (
        <TouchableOpacity
          key={filter}
          style={[styles.tab, activeFilter === filter && styles.tabActive]}
          onPress={() => onFilterChange(filter)}
        >
          <Text
            style={[styles.text, activeFilter === filter && styles.textActive]}
          >
            {filter.charAt(0).toUpperCase() + filter.slice(1)}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: 24,
    marginBottom: 20,
    gap: 8,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#F1F5F9",
  },
  tabActive: {
    backgroundColor: "#4A90E2",
  },
  text: {
    fontSize: 14,
    fontWeight: "500",
    color: "#6B7280",
  },
  textActive: {
    color: "#FFFFFF",
  },
});
