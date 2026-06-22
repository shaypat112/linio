// linio/mobile/app/index.tsx

import React, { useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Header } from "@react-navigation/elements";
import { Todo, mockTodos } from "../data/mockData";
import CreateModal from "../components/CreateModal";
import EmptyState from "../components/EmptyState";
import Filters from "../components/Filters";
import Stats from "../components/Stats";
import TodoItem from "../components/TodoItem";

export default function IndexScreen() {
  const [todos, setTodos] = useState<Todo[]>(mockTodos);
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const [modalVisible, setModalVisible] = useState(false);

  const filtered = todos.filter((t) => {
    if (filter === "all") return true;
    if (filter === "active") return !t.completed;
    return t.completed;
  });

  const stats = {
    active: todos.filter((t) => !t.completed).length,
    completed: todos.filter((t) => t.completed).length,
    total: todos.length,
  };

  const toggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  };

  const addTodo = (title: string) => {
    const newTodo: Todo = {
      id: Math.max(...todos.map((t) => t.id)) + 1,
      title,
      completed: false,
    };
    setTodos((prev) => [newTodo, ...prev]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />

      <Header name="Student" taskCount={stats.active} />
      <Stats {...stats} />
      <Filters activeFilter={filter} onFilterChange={setFilter} />

      <FlatList
        data={filtered}
        renderItem={({ item }) => (
          <TodoItem todo={item} onToggle={toggleTodo} />
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
        ListEmptyComponent={<EmptyState filter={filter} />}
        showsVerticalScrollIndicator={false}
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => setModalVisible(true)}
      >
        <Ionicons name="add" size={28} color="#FFFFFF" />
      </TouchableOpacity>

      <CreateModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={addTodo}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  list: {
    paddingHorizontal: 24,
    paddingBottom: 100,
  },
  fab: {
    position: "absolute",
    bottom: 32,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#4A90E2",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#4A90E2",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
});
