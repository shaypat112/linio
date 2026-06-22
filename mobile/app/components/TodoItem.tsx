// linio/mobile/app/components/TodoItem.tsx

import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Todo } from "../data/mockData";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
}

export default function TodoItem({ todo, onToggle }: TodoItemProps) {
  const priorityColors = {
    high: "#FF6B6B",
    medium: "#FFB347",
    low: "#4CAF50",
  };

  return (
    <TouchableOpacity style={styles.card} onPress={() => onToggle(todo.id)}>
      <View style={styles.left}>
        <View style={[styles.checkbox, todo.completed && styles.checked]}>
          {todo.completed && (
            <Ionicons name="checkmark" size={16} color="#FFF" />
          )}
        </View>

        <View style={styles.content}>
          <Text style={[styles.title, todo.completed && styles.completed]}>
            {todo.title}
          </Text>

          <View style={styles.meta}>
            {todo.dueDate && (
              <View style={styles.tag}>
                <Ionicons name="calendar-outline" size={12} color="#6B7280" />
                <Text style={styles.tagText}>{todo.dueDate}</Text>
              </View>
            )}
            {todo.priority && (
              <View
                style={[
                  styles.dot,
                  { backgroundColor: priorityColors[todo.priority] },
                ]}
              />
            )}
          </View>
        </View>
      </View>

      <Ionicons name="ellipsis-vertical" size={18} color="#9CA3AF" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 14,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: "#D1D5DB",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  checked: {
    backgroundColor: "#4A90E2",
    borderColor: "#4A90E2",
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: "500",
    color: "#1A1A2E",
    marginBottom: 4,
  },
  completed: {
    textDecorationLine: "line-through",
    color: "#9CA3AF",
  },
  meta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  tag: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  tagText: {
    fontSize: 12,
    color: "#6B7280",
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
});
