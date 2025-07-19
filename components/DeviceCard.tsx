"use client";
import type { Device } from "@/types";
import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import { Animated, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface DeviceCardProps {
  device: Device;
  onPress: (device: Device) => void;
}

export default function DeviceCard({ device, onPress }: DeviceCardProps) {
  const router = useRouter();
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleViewMore = () => {
    router.push(`/(drawer)/device/${device.id}`);
  };

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  // ✅ Safely check each status — default is false (RED)
  const isMachineRunning = device.machineStatus === "Running";
  const isInternetConnected = device.internetStatus === "Connected";
  const isCoolingActive = device.coolingStatus === "Active";

  return (
    <Animated.View 
      style={[
        styles.container,
        {
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }]
        }
      ]}
    >
      <TouchableOpacity
        onPress={() => onPress(device)}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.9}
      >
        {/* Status indicator */}
        <View style={styles.statusIndicator}>
          <View
            style={[
              styles.statusDot,
              { backgroundColor: isMachineRunning ? "#10B981" : "#EF4444" },
            ]}
          />
        </View>

        <Image source={device.imageUrl} style={styles.image} />
        
        <View style={styles.content}>
          <Text style={styles.title} numberOfLines={2}>{device.name}</Text>
          <Text style={styles.model}>{device.model}</Text>
          <Text style={styles.location}>📍 {device.location}</Text>

          {/* Enhanced Status Section */}
          <View style={styles.statusContainer}>
            <StatusItem 
              label="Machine" 
              active={isMachineRunning} 
              icon="⚙️"
              status={device.machineStatus}
            />
            <StatusItem 
              label="Internet" 
              active={isInternetConnected} 
              icon="📶"
              status={device.internetStatus}
            />
            <StatusItem 
              label="Cooling" 
              active={isCoolingActive} 
              icon="❄️"
              status={device.coolingStatus}
            />
          </View>

          {/* Enhanced Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={[styles.button, styles.primaryButton]} 
              onPress={handleViewMore}
            >
              <Text style={styles.primaryButtonText}>👁️ View More</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, styles.secondaryButton]}>
              <Text style={styles.secondaryButtonText}>📥</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

// 🔥 Small component for status with dot
function StatusItem({ 
  label, 
  active, 
  icon, 
  status 
}: { 
  label: string; 
  active: boolean; 
  icon: string;
  status: string;
}) {
  return (
    <View style={styles.statusItem}>
      <View style={styles.statusLeft}>
        <Text style={styles.statusIcon}>{icon}</Text>
        <Text style={styles.statusText}>{label}</Text>
      </View>
      <View style={styles.statusRight}>
        <View
          style={[
            styles.statusDot,
            { backgroundColor: active ? "#10B981" : "#EF4444" },
          ]}
        />
        <Text style={[
          styles.statusValue,
          { color: active ? "#10B981" : "#EF4444" }
        ]}>
          {status}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    width: "48%",
    margin: "1%",
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(59, 130, 246, 0.1)",
  },
  statusIndicator: {
    position: "absolute",
    top: 12,
    right: 12,
    zIndex: 10,
  },
  content: {
    padding: 16,
  },
  image: {
    width: "100%",
    height: 100,
    marginBottom: 8,
    backgroundColor: "#f0f0f0",
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
    color: "#1F2937",
    lineHeight: 18,
  },
  model: {
    fontSize: 12,
    color: "#6B7280",
    marginBottom: 4,
    fontWeight: "500",
  },
  location: {
    fontSize: 11,
    color: "#9CA3AF",
    marginBottom: 12,
  },
  statusContainer: {
    marginBottom: 12,
    gap: 6,
  },
  statusItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 2,
  },
  statusLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  statusIcon: {
    fontSize: 10,
    marginRight: 4,
  },
  statusText: {
    fontSize: 10,
    color: "#6B7280",
    fontWeight: "500",
  },
  statusRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 4,
  },
  statusValue: {
    fontSize: 9,
    fontWeight: "600",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 6,
  },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButton: {
    flex: 1,
    backgroundColor: "#3B82F6",
  },
  secondaryButton: {
    width: 32,
    backgroundColor: "#10B981",
  },
  primaryButtonText: {
    color: "white",
    fontSize: 10,
    fontWeight: "600",
  },
  secondaryButtonText: {
    color: "white",
    fontSize: 10,
    fontWeight: "500",
  },
});
