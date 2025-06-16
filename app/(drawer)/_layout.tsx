import { useAuth } from "@/context/AuthContext";
import { Redirect } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { useEffect } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

// Custom drawer content component
function CustomDrawerContent(props: any) {
  const { user, signOut } = useAuth();

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
            // Navigation will be handled by auth state change
          } catch (error) {
            console.error("Logout error:", error);
          }
        },
      },
    ]);
  };

  // Define which routes should appear in the drawer
  const drawerRoutes = [
    { name: "dashboard", displayName: "Dashboard" },
    { name: "devices", displayName: "Devices" },
    { name: "contact", displayName: "Contact Us" },
    { name: "registration", displayName: "Registration" },
    { name: "reports", displayName: "Reports" },
  ];

  return (
    <View style={styles.drawerContainer}>
      <View style={styles.drawerHeader}>
        <Text style={styles.drawerTitle}>Grain Technik</Text>
        <Text style={styles.drawerSubtitle}>
          Welcome, {user?.name || user?.email || "User"}
        </Text>
      </View>

      <View style={styles.drawerContent}>
        {drawerRoutes.map((route) => {
          const isFocused =
            props.state.routeNames.includes(route.name) &&
            props.state.routes[props.state.index]?.name === route.name;

          return (
            <TouchableOpacity
              key={route.name}
              style={[styles.drawerItem, isFocused && styles.drawerItemActive]}
              onPress={() => props.navigation.navigate(route.name)}
            >
              <Text
                style={[
                  styles.drawerItemText,
                  isFocused && styles.drawerItemTextActive,
                ]}
              >
                {route.displayName}
              </Text>
            </TouchableOpacity>
          );
        })}

        <TouchableOpacity
          style={[styles.drawerItem, styles.logoutItem]}
          onPress={handleLogout}
        >
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function DrawerLayout() {
  const { user, isLoading, isAuthenticated, isInitialized } = useAuth();

  useEffect(() => {
    console.log("🔄 DrawerLayout mounted");
    console.log("Auth state:", {
      isInitialized,
      isAuthenticated,
      hasUser: !!user,
      isLoading,
    });
  }, [isInitialized, isAuthenticated, isLoading, user]);

  // Show loading while auth is initializing
  if (!isInitialized || isLoading) {
    console.log("⏳ Showing loading screen");
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text style={styles.loadingText}>Loading...</Text>
        <Text style={styles.debugText}>
          Initialized: {isInitialized ? "Yes" : "No"}
        </Text>
        <Text style={styles.debugText}>
          Loading: {isLoading ? "Yes" : "No"}
        </Text>
        <Text style={styles.debugText}>
          Authenticated: {isAuthenticated ? "Yes" : "No"}
        </Text>
      </View>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated || !user) {
    console.log("❌ User not authenticated, redirecting to login");
    return <Redirect href="/login" />;
  }

  console.log("✅ Rendering drawer navigation");

  return (
    <SafeAreaProvider>
    <Drawer
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: "#ffffff",
          elevation: 2,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 3,
        },
        headerTintColor: "#1F2937",
        headerTitleStyle: {
          fontWeight: "600",
          fontSize: 18,
        },
        sceneContainerStyle: {
          backgroundColor: "#F9FAFB",
        },
        drawerStyle: {
          backgroundColor: "#ffffff",
          width: 280,
        },
        drawerActiveTintColor: "#3B82F6",
        drawerInactiveTintColor: "#6B7280",
        swipeEnabled: true,
        overlayColor: "rgba(0, 0, 0, 0.5)",
        drawerType: "front",
      }}
    >
      <Drawer.Screen
        name="dashboard"
        options={{
          title: "Dashboard",
          drawerLabel: "Dashboard",
        }}
      />
      <Drawer.Screen
        name="devices"
        options={{
          title: "Devices",
          drawerLabel: "Devices",
        }}
      />
      <Drawer.Screen
        name="contact"
        options={{
          title: "Contact Us",
          drawerLabel: "Contact Us",
        }}
      />
      <Drawer.Screen
        name="registration"
        options={{
          title: "Registration",
          drawerLabel: "Registration",
        }}
      />
      <Drawer.Screen
        name="reports"
        options={{
          title: "Reports",
          drawerLabel: "Reports",
        }}
      />
      {/* Hide device sub-routes from drawer but keep them accessible */}
      <Drawer.Screen
        name="device"
        options={{
          drawerItemStyle: { display: "none" },
          headerShown: false,
        }}
      />
    </Drawer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    padding: 20,
  },
  loadingText: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 16,
    marginBottom: 20,
    color: "#1F2937",
  },
  debugText: {
    fontSize: 12,
    marginBottom: 4,
    color: "#6B7280",
    textAlign: "center",
  },
  drawerContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  drawerHeader: {
    backgroundColor: "#3B82F6",
    padding: 20,
    paddingTop: 60,
    paddingBottom: 30,
  },
  drawerTitle: {
    color: "#ffffff",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 4,
  },
  drawerSubtitle: {
    color: "#E0E7FF",
    fontSize: 14,
  },
  drawerContent: {
    flex: 1,
    paddingTop: 20,
  },
  drawerItem: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    borderRadius: 8,
    marginBottom: 2,
  },
  drawerItemActive: {
    backgroundColor: "#EFF6FF",
  },
  drawerItemText: {
    fontSize: 16,
    color: "#6B7280",
    fontWeight: "500",
  },
  drawerItemTextActive: {
    color: "#3B82F6",
    fontWeight: "600",
  },
  logoutItem: {
    marginTop: "auto",
    marginBottom: 30,
    backgroundColor: "#FEF2F2",
  },
  logoutText: {
    fontSize: 16,
    color: "#EF4444",
    fontWeight: "600",
  },
});
