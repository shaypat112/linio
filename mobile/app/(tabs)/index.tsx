// linio/mobile/app/(tabs)/index.tsx

import React from "react";
import {
  SafeAreaView,
  StatusBar,
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import FeatureCard from "../components/FeatureCard";
import SectionHeader from "../components/SectionHeader";
import { features } from "../data/features";

export default function LandingPage() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View style={styles.hero}>
          <View style={styles.heroIcon}>
            <Ionicons name="sparkles" size={32} color="#4A90E2" />
          </View>
          <Text style={styles.heroTitle}>Welcome to Linio</Text>
          <Text style={styles.heroSubtitle}>
            Your all-in-one student productivity companion
          </Text>

          <TouchableOpacity style={styles.heroButton}>
            <Text style={styles.heroButtonText}>Get Started</Text>
            <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Features Section */}
        <View style={styles.section}>
          <SectionHeader
            title="Everything you need"
            subtitle="Smart tools designed for students"
          />

          {features.map((feature) => (
            <FeatureCard
              key={feature.id}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              color={feature.color}
            />
          ))}
        </View>

        {/* Bottom CTA */}
        <View style={styles.cta}>
          <Text style={styles.ctaTitle}>Ready to get started?</Text>
          <Text style={styles.ctaSubtitle}>
            Join thousands of students using Linio
          </Text>
          <TouchableOpacity style={styles.ctaButton}>
            <Text style={styles.ctaButtonText}>Create Account</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.footer}>© 2026 Linio. All rights reserved.</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  hero: {
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 48,
    alignItems: "center",
  },
  heroIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#EBF5FF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: "700",
    color: "#1A1A2E",
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 24,
  },
  heroButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4A90E2",
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
  },
  heroButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  cta: {
    marginHorizontal: 24,
    padding: 24,
    backgroundColor: "#4A90E2",
    borderRadius: 16,
    alignItems: "center",
    marginBottom: 24,
  },
  ctaTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  ctaSubtitle: {
    fontSize: 14,
    color: "#D1E3FF",
    marginBottom: 16,
  },
  ctaButton: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 10,
  },
  ctaButtonText: {
    color: "#4A90E2",
    fontWeight: "600",
    fontSize: 16,
  },
  footer: {
    textAlign: "center",
    fontSize: 12,
    color: "#9CA3AF",
    paddingVertical: 24,
  },
});
