import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function CurrentFaultsView({
  onBack,
  onFaultCode,
}: {
  onBack: () => void;
  onFaultCode: () => void;
}) {
  const [faults, setFaults] = useState<string[]>([
    "Blower Circuit Breaker Fault",
    "Overheat Warning",
    "Sensor Malfunction",
  ]);

  const handleReset = () => {
    setFaults([]);
    console.log("Faults reset");
  };

  const handleFaultLog = () => {
    console.log("Opening fault log");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>CURRENT FAULTS</Text>

      <View style={styles.faultContainer}>
        <ScrollView
          style={styles.faultScrollView}
          showsVerticalScrollIndicator={true}
        >
          {faults.length === 0 ? (
            <View style={styles.noFaultsContainer}>
              <Text style={styles.noFaultsText}>✅ No faults available</Text>
              <Text style={styles.noFaultsSubtext}>
                System is operating normally
              </Text>
            </View>
          ) : (
            faults.map((fault, index) => (
              <View key={`${fault}-${index}`} style={styles.faultItem}>
                <View style={styles.faultIndicator} />
                <Text style={styles.faultText}>• {fault}</Text>
              </View>
            ))
          )}
        </ScrollView>

        <View style={styles.scrollControls}>
          <TouchableOpacity style={styles.scrollBtn}>
            <Text style={styles.scrollIcon}>▲</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.scrollBtn, { marginTop: 12 }]}>
            <Text style={styles.scrollIcon}>▼</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={onBack}>
          <Text style={styles.buttonText}>BACK</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.resetButton]}
          onPress={handleReset}
        >
          <Text style={styles.buttonText}>FAULT RESET</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.codeButton]}
          onPress={onFaultCode}
        >
          <Text style={styles.buttonText}>FAULT CODE</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.logButton]}
          onPress={handleFaultLog}
        >
          <Text style={styles.buttonText}>FAULT LOG</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#0D0D0D",
  },
  title: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 20,
    textAlign: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#2E2E2E",
    marginBottom: 16,
    letterSpacing: 1,
  },
  faultContainer: {
    flex: 1,
    backgroundColor: "#1C1C1E",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#2E2E2E",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  faultScrollView: {
    flex: 1,
  },
  noFaultsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },
  noFaultsText: {
    color: "#10B981",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  noFaultsSubtext: {
    color: "#6B7280",
    fontSize: 14,
  },
  faultItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  faultIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#EF4444",
    marginRight: 8,
  },
  faultText: {
    color: "#D0D0D0",
    fontSize: 15,
    flex: 1,
  },
  scrollControls: {
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 12,
  },
  scrollBtn: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 8,
    padding: 8,
    borderColor: "#444",
    borderWidth: 1,
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollIcon: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  buttonRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 20,
  },
  button: {
    backgroundColor: "#2A2A2A",
    borderColor: "#4F4F4F",
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginVertical: 6,
    minWidth: "48%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  resetButton: {
    backgroundColor: "#F59E0B",
    borderColor: "#D97706",
  },
  codeButton: {
    backgroundColor: "#3B82F6",
    borderColor: "#2563EB",
  },
  logButton: {
    backgroundColor: "#10B981",
    borderColor: "#059669",
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "500",
    fontSize: 14,
    letterSpacing: 0.5,
  },
});
