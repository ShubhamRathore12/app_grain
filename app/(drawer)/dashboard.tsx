import { useAuth } from "@/context/AuthContext";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Dimensions,
  Image,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

// Get device dimensions for responsive map sizing
const { width: screenWidth } = Dimensions.get("window");

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

// Updated markers with Delhi and surrounding areas
const markers = [
  {
    id: 1,
    latitude: 28.6139,
    longitude: 77.209,
    title: "New Delhi",
    description: "India Gate and Central Delhi area",
    color: "#1f63e6",
    icon: "building",
  },
  {
    id: 2,
    latitude: 28.6692,
    longitude: 77.4538,
    title: "Noida",
    description: "IT Hub - Sector 62 area",
    color: "#e63946",
    icon: "laptop",
  },
  {
    id: 3,
    latitude: 28.4595,
    longitude: 77.0266,
    title: "Gurgaon",
    description: "Cyber City - Corporate hub",
    color: "#f77f00",
    icon: "briefcase",
  },
  {
    id: 4,
    latitude: 28.5355,
    longitude: 77.391,
    title: "Faridabad",
    description: "Industrial area - Manufacturing hub",
    color: "#06d6a0",
    icon: "industry",
  },
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

// Geoapify configuration
const GEOAPIFY_API_KEY = "92618f03bcbb4054b71951fa563d1200"; // Replace with your actual API key

// Helper function to calculate optimal bounds for all markers
const calculateBounds = (markers: any[]) => {
  if (markers.length === 0) return null;

  const lats = markers.map((m) => m.latitude);
  const lngs = markers.map((m) => m.longitude);

  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);
  const minLng = Math.min(...lngs);
  const maxLng = Math.max(...lngs);

  // Add padding to ensure all markers are visible
  const latPadding = (maxLat - minLat) * 0.2; // 20% padding
  const lngPadding = (maxLng - minLng) * 0.2; // 20% padding

  return {
    minLat: minLat - latPadding,
    maxLat: maxLat + latPadding,
    minLng: minLng - lngPadding,
    maxLng: maxLng + lngPadding,
    centerLat: (minLat + maxLat) / 2,
    centerLng: (minLng + maxLng) / 2,
  };
};

// Helper function to generate Geoapify static map URL with bounds
const generateMapUrl = (
  markers: any[],
  options: {
    width?: number;
    height?: number;
    style?: string;
  } = {}
) => {
  const { width = 600, height = 300, style = "osm-bright-grey" } = options;

  const bounds = calculateBounds(markers);
  if (!bounds) return "";

  // Generate marker string for URL
  const markerString = markers
    .map(
      (marker, index) =>
        `lonlat:${marker.longitude},${
          marker.latitude
        };type:material;color:${encodeURIComponent(
          marker.color || "#1f63e6"
        )};size:large;icon:${marker.icon || "cloud"};icontype:awesome;text:${
          index + 1
        };whitecircle:no`
    )
    .join("|");

  // Use bbox (bounding box) instead of center+zoom for better fit
  const bbox = `${bounds.minLng},${bounds.minLat},${bounds.maxLng},${bounds.maxLat}`;

  return `https://maps.geoapify.com/v1/staticmap?style=${style}&width=${width}&height=${height}&bbox=${bbox}&marker=${markerString}&apiKey=${GEOAPIFY_API_KEY}`;
};

// Helper function to generate individual location map
const generateLocationMapUrl = (
  marker: any,
  options: {
    width?: number;
    height?: number;
    style?: string;
    zoom?: number;
  } = {}
) => {
  const {
    width = 400,
    height = 200,
    style = "osm-bright",
    zoom = 14,
  } = options;

  const markerString = `lonlat:${marker.longitude},${
    marker.latitude
  };type:material;color:${encodeURIComponent(
    marker.color || "#1f63e6"
  )};size:large;icon:${marker.icon || "cloud"};icontype:awesome;whitecircle:no`;

  return `https://maps.geoapify.com/v1/staticmap?style=${style}&width=${width}&height=${height}&center=lonlat:${marker.longitude},${marker.latitude}&zoom=${zoom}&marker=${markerString}&apiKey=${GEOAPIFY_API_KEY}`;
};

export default function DashboardScreen() {
  const { user, token, isAuthenticated, signOut } = useAuth();
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);

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
  }, [user, token, isAuthenticated, signOut, router]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setMapError(null);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

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

  // Show error state if user data is missing
  if (!user) {
    return (
      <SafeAreaView style={[styles.container, styles.centerContent]}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorTitle}>Authentication Error</Text>
          <Text style={styles.errorText}>Please log in again</Text>
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

        {/* Maps Section */}
        <View style={styles.mapsContainer}>
          {/* Global Map View - Delhi Region */}
          <View style={styles.mapCard}>
            <View style={styles.mapHeader}>
              <View style={styles.mapHeaderIcon}>
                <Text style={styles.mapIconText}>🇮🇳</Text>
              </View>
              <Text style={styles.mapTitle}>Devices Locations Overview</Text>
            </View>
            <View style={styles.mapContent}>
              <Image
                source={{
                  uri: generateMapUrl(markers, {
                    width: Math.floor(screenWidth - 32), // Account for card padding
                    height: 280, // Increased height for better visibility
                    style: "osm-bright-grey",
                  }),
                }}
                style={[styles.mapImage, { height: 280 }]}
                onError={(error) => {
                  console.error("Map loading error:", error);
                  setMapError("Failed to load map");
                }}
                resizeMode="cover"
              />
              {mapError && (
                <View style={styles.mapErrorContainer}>
                  <Text style={styles.mapErrorText}>{mapError}</Text>
                </View>
              )}

              {/* Map Legend */}
              <View style={styles.mapLegend}>
                <Text style={styles.legendTitle}>
                  Delhi NCR Locations ({markers.length})
                </Text>
                <View style={styles.legendGrid}>
                  {markers.map((marker, index) => (
                    <View key={marker.id} style={styles.legendItem}>
                      <View
                        style={[
                          styles.legendDot,
                          { backgroundColor: marker.color },
                        ]}
                      />
                      <Text style={styles.legendText}>
                        {index + 1}. {marker.title}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </View>

          {/* Individual Location Maps */}
          <View style={styles.mapCard}>
            <View style={styles.mapHeader}>
              <View style={styles.mapHeaderIcon}>
                <Text style={styles.mapIconText}>📍</Text>
              </View>
              <Text style={styles.mapTitle}>Location Details</Text>
            </View>
            <View style={styles.mapContent}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {markers.map((marker) => (
                  <View key={marker.id} style={styles.locationCard}>
                    <Image
                      source={{
                        uri: generateLocationMapUrl(marker, {
                          width: 280,
                          height: 160,
                          style: "osm-bright",
                          zoom: 12, // Adjusted zoom for better city view
                        }),
                      }}
                      style={styles.locationMapImage}
                      resizeMode="cover"
                    />
                    <View style={styles.locationInfo}>
                      <Text style={styles.locationTitle}>{marker.title}</Text>
                      <Text style={styles.locationDescription}>
                        {marker.description}
                      </Text>
                      <View style={styles.locationCoords}>
                        <Text style={styles.coordsText}>
                          {marker.latitude.toFixed(4)},{" "}
                          {marker.longitude.toFixed(4)}
                        </Text>
                      </View>
                    </View>
                  </View>
                ))}
              </ScrollView>
            </View>
          </View>
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
  // Map styles
  mapsContainer: {
    marginBottom: 20,
  },
  mapCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
    marginBottom: 16,
  },
  mapHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  mapHeaderIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  mapIconText: {
    fontSize: 16,
  },
  mapTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
  },
  mapContent: {
    position: "relative",
  },
  mapImage: {
    width: "100%",
    backgroundColor: "#F3F4F6",
  },
  mapErrorContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
  },
  mapErrorText: {
    color: "#EF4444",
    fontSize: 14,
    fontWeight: "500",
  },
  // Map Legend Styles
  mapLegend: {
    position: "absolute",
    bottom: 12,
    left: 12,
    right: 12,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: 8,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  legendTitle: {
    fontSize: 12,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 8,
  },
  legendGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    minWidth: "48%",
    marginBottom: 4,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  legendText: {
    fontSize: 10,
    color: "#4B5563",
    fontWeight: "500",
    flex: 1,
  },
  locationCard: {
    marginRight: 16,
    backgroundColor: "#F9FAFB",
    borderRadius: 8,
    overflow: "hidden",
    width: 280,
  },
  locationMapImage: {
    width: 280,
    height: 160,
    backgroundColor: "#F3F4F6",
  },
  locationInfo: {
    padding: 12,
  },
  locationTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 4,
  },
  locationDescription: {
    fontSize: 12,
    color: "#6B7280",
    marginBottom: 8,
  },
  locationCoords: {
    backgroundColor: "#E5E7EB",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: "flex-start",
  },
  coordsText: {
    fontSize: 10,
    color: "#4B5563",
    fontFamily: "monospace",
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
});
