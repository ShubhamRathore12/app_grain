"use client";

import { useAuth } from "@/context/AuthContext";
import { Redirect } from "expo-router";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

export default function IndexScreen() {
  const { isAuthenticated, isInitialized, isLoading } = useAuth();

  console.log("🔄 Index screen mounted");
  console.log("Auth state:", { isAuthenticated, isInitialized, isLoading });

  if (!isInitialized || isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text style={styles.text}>Loading...</Text>
      </View>
    );
  }

  if (isAuthenticated) {
    return <Redirect href="/dashboard" />;
  }

  return <Redirect href="/login" />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
  },
  text: {
    marginTop: 16,
    fontSize: 16,
    color: "#6B7280",
  },
});
