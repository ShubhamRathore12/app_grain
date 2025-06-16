import { useAuth } from "@/context/AuthContext";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Sample data for quota stats
const quotaData = [
  { label: "SMS", used: 0, total: 50 },
  { label: "EMAIL", used: 0, total: 1000 },
  { label: "DEVICE", used: 2, total: 50 },
  { label: "CONTACT", used: 0, total: 10 },
  { label: "TRIGGER", used: 0, total: 500 },
  { label: "Dashboard Widget", used: 0, total: 10 },
  { label: "REPORT", used: 0, total: 70 },
];

// Sample data for device activity
const deviceActivity = [
  {
    name: "VI MIXER",
    lastActivity: "17/08/23 @ 03:00:08 am",
    status: "online",
  },
  {
    name: "VI CUTTER",
    lastActivity: "17/08/23 @ 03:00:08 am",
    status: "online",
  },
  {
    name: "AGITATOR MIXER 1",
    lastActivity: "17/08/23 @ 03:00:08 am",
    status: "offline",
  },
  {
    name: "NAS TANK",
    lastActivity: "17/08/23 @ 03:00:08 am",
    status: "online",
  },
  {
    name: "BLENDER 09",
    lastActivity: "17/08/23 @ 03:00:08 am",
    status: "maintenance",
  },
];

export default function DashboardScreen() {
  const { user, token, isAuthenticated, signOut } = useAuth();
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    console.log("=== DASHBOARD COMPONENT MOUNTED ===");
    console.log("User:", user);
    console.log("Token exists:", !!token);
    console.log("Is authenticated:", isAuthenticated);

    // Check authentication status
    if (!isAuthenticated || !user) {
      console.error("Dashboard accessed without proper authentication");
      Alert.alert(
        "Authentication Error",
        "Session expired. Please log in again.",
        [
          {
            text: "OK",
            onPress: async () => {
              try {
                await signOut();
              } catch (error) {
                console.error("SignOut error:", error);
              }
              router.replace("/login");
            },
          },
        ]
      );
      return;
    }

    setIsInitialized(true);
  }, [user, token, isAuthenticated, signOut, router]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const handleLogout = async () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          try {
         
            await signOut();
           

            // Navigate back to login, outside the drawer
            router.replace("/login");
          } catch (error) {
            console.error("Logout error:", error);
            // Force navigation even if signOut fails
            router.replace("/login");
          }
        },
      },
    ]);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "#10B981";
      case "offline":
        return "#EF4444";
      case "maintenance":
        return "#F59E0B";
      default:
        return "#6B7280";
    }
  };

  // Show loading state if not initialized
  if (!isInitialized) {
    return (
      <SafeAreaView style={[styles.container, styles.centerContent]}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading dashboard...</Text>
        </View>
      </SafeAreaView>
    );
  }

  // Show error state if user data is missing
  if (!user) {
    return (
      <SafeAreaView style={[styles.container, styles.centerContent]}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorTitle}>Authentication Error</Text>
          <Text style={styles.errorText}>Please log in again</Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={() => router.replace("/login")}
          >
            <Text style={styles.retryButtonText}>Go to Login</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#3B82F6"]}
            tintColor="#3B82F6"
          />
        }
      >
        {/* Header Section */}
        <View style={styles.header}>
          <View>
            <Text style={styles.welcomeText}>Welcome back!</Text>
            <Text style={styles.userNameText}>
              {user.name || user.email || "User"}
            </Text>
          </View>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>

        {/* Stats Section */}
        <View style={styles.statsContainer}>
          <Text style={styles.sectionTitle}>Account Quota Stats</Text>
          {quotaData.map((item, index) => (
            <View key={index} style={styles.statRow}>
              <Text style={styles.statLabel}>{item.label}</Text>
              <View style={styles.statBarContainer}>
                <LinearGradient
                  colors={["#3B82F6", "#60A5FA"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={[
                    styles.statBar,
                    {
                      width: `${Math.max((item.used / item.total) * 100, 2)}%`,
                    },
                  ]}
                />
              </View>
              <Text style={styles.statValue}>
                {item.used}/{item.total}
              </Text>
            </View>
          ))}
        </View>

        {/* Activity Sections */}
        <View style={styles.activitiesContainer}>
          <View style={styles.activityCard}>
            <View style={styles.activityHeader}>
              <View style={styles.activityHeaderIcon}>
                <Text style={styles.activityIconText}>📊</Text>
              </View>
              <Text style={styles.activityTitle}>Trigger/Report Activity</Text>
            </View>
            <View style={styles.activityContent}>
              <Text style={styles.activitySubtitle}>Recent Activities</Text>
              <Text style={styles.activityInfo}>
                No recent trigger or report activities found.
              </Text>
            </View>
          </View>

          <View style={styles.activityCard}>
            <View style={styles.activityHeader}>
              <View style={styles.activityHeaderIcon}>
                <Text style={styles.activityIconText}>📱</Text>
              </View>
              <Text style={styles.activityTitle}>Device Activity</Text>
            </View>
            <View style={styles.activityContent}>
              {deviceActivity.map((device, index) => (
                <View key={index} style={styles.deviceItem}>
                  <View
                    style={[
                      styles.deviceStatusDot,
                      { backgroundColor: getStatusColor(device.status) },
                    ]}
                  />
                  <View style={styles.deviceInfo}>
                    <Text style={styles.deviceName}>{device.name}</Text>
                    <Text style={styles.deviceLastActivity}>
                      Last Activity: {device.lastActivity}
                    </Text>
                    <Text
                      style={[
                        styles.deviceStatus,
                        { color: getStatusColor(device.status) },
                      ]}
                    >
                      {device.status.charAt(0).toUpperCase() +
                        device.status.slice(1)}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Debug Info (remove in production) */}
        <View style={styles.debugContainer}>
          <Text style={styles.debugTitle}>Debug Info</Text>
          <Text style={styles.debugText}>User ID: {user.id}</Text>
          <Text style={styles.debugText}>Email: {user.email}</Text>
          <Text style={styles.debugText}>
            Token: {token ? "Present" : "Missing"}
          </Text>
          <Text style={styles.debugText}>
            Authenticated: {isAuthenticated ? "Yes" : "No"}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  centerContent: {
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  loadingContainer: {
    alignItems: "center",
    padding: 32,
  },
  loadingText: {
    fontSize: 16,
    color: "#6B7280",
  },
  errorContainer: {
    alignItems: "center",
    padding: 32,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#EF4444",
    marginBottom: 8,
  },
  errorText: {
    fontSize: 16,
    color: "#6B7280",
    marginBottom: 24,
  },
  retryButton: {
    backgroundColor: "#3B82F6",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
    paddingHorizontal: 4,
  },
  welcomeText: {
    fontSize: 16,
    color: "#6B7280",
  },
  userNameText: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1F2937",
  },
  logoutButton: {
    backgroundColor: "#EF4444",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  logoutButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
  statsContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 16,
  },
  statRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  statLabel: {
    width: 120,
    fontSize: 14,
    color: "#4B5563",
    fontWeight: "500",
  },
  statBarContainer: {
    flex: 1,
    height: 8,
    backgroundColor: "#E5E7EB",
    borderRadius: 4,
    overflow: "hidden",
    marginHorizontal: 12,
  },
  statBar: {
    height: "100%",
    borderRadius: 4,
  },
  statValue: {
    width: 80,
    fontSize: 14,
    color: "#4B5563",
    textAlign: "right",
    fontWeight: "500",
  },
  activitiesContainer: {
    flexDirection: "column",
    gap: 16,
  },
  activityCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  activityHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  activityHeaderIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  activityIconText: {
    fontSize: 16,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
  },
  activityContent: {
    padding: 16,
  },
  activitySubtitle: {
    fontSize: 12,
    fontWeight: "600",
    color: "#6B7280",
    marginBottom: 8,
  },
  activityInfo: {
    fontSize: 14,
    color: "#4B5563",
  },
  deviceItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  deviceStatusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 12,
    marginTop: 6,
  },
  deviceInfo: {
    flex: 1,
  },
  deviceName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 4,
  },
  deviceLastActivity: {
    fontSize: 12,
    color: "#6B7280",
    marginBottom: 2,
  },
  deviceStatus: {
    fontSize: 12,
    fontWeight: "600",
  },
  debugContainer: {
    backgroundColor: "#E3F2FD",
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
  },
  debugTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1565C0",
    marginBottom: 8,
  },
  debugText: {
    fontSize: 12,
    color: "#1565C0",
    marginBottom: 2,
  },
});
