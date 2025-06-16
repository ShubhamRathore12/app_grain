"use client";
import Colors from "@/constants/Colors";
import type { Device } from "@/types";
import { useRouter } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface DeviceCardProps {
  device: Device;
  onPress: (device: Device) => void;
}

export default function DeviceCard({ device, onPress }: DeviceCardProps) {
  const router = useRouter();

  const handleViewMore = () => {
    router.push(`/(drawer)/device/${device.id}`);
  };

  // ✅ Safely check each status — default is false (RED)
  const isMachineRunning = device.machineStatus === "Running" ? true : false;
  const isInternetConnected =
    device.internetStatus === "Connected" ? true : false;
  const isCoolingActive = device.coolingStatus === "Active" ? true : false;

  return (
    <View style={styles.container}>
      <Image source={device.imageUrl} style={styles.image} />
      <Text style={styles.title}>{device.name}</Text>
      <Text style={styles.model}>{device.model}</Text>

      {/* Status Section */}
      <View style={styles.statusContainer}>
        <StatusItem label="Machine" active={isMachineRunning} />
        <StatusItem label="Internet" active={isInternetConnected} />
        <StatusItem label="Cooling" active={isCoolingActive} />
      </View>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleViewMore}>
          <Text style={styles.buttonText}>View More</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Download Files</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// 🔥 Small component for status with dot
function StatusItem({ label, active }: { label: string; active: boolean }) {
  return (
    <View style={styles.statusItem}>
      <Text style={styles.statusText}>{label} Status</Text>
      <View
        style={[
          styles.statusDot,
          { backgroundColor: active ? "#10B981" : "#EF4444" }, // green or red
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
    width: "48%",
    margin: "1%",
  },
  image: {
    width: "100%",
    height: 120,
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: "#f0f0f0",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
    color: "#1F2937",
  },
  model: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 8,
  },
  statusContainer: {
    marginBottom: 16,
  },
  statusItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  statusText: {
    fontSize: 12,
    color: "#6B7280",
    flex: 1,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  buttonContainer: {
    flexDirection: "column",
    gap: 8,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: Colors.light.border,
    borderRadius: 6,
    alignItems: "center",
    backgroundColor: "#F9FAFB",
  },
  buttonText: {
    color: "#374151",
    fontSize: 12,
    fontWeight: "500",
  },
});
