import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const OutputView = ({ onBack }) => {
  const outputs = [
    { id: "Q0.0", label: "Blower Drive", status: "red" },
    { id: "Q0.1", label: "Heater Drive", status: "red" },
    { id: "Q0.2", label: "Condenser", status: "red" },
    { id: "Q0.3", label: "Compressor", status: "red" },
    { id: "Q0.4", label: "Hot gas valve", status: "red" },
    { id: "Q0.5", label: "Afterheat valve", status: "red" },
    { id: "Q0.6", label: "Chiller healthy", status: "red" },
    { id: "Q0.7", label: "Chiller Fault", status: "red" },
    { id: "Q1.0", label: "Chiller warning", status: "red" },
    { id: "Q1.1", label: "Buzzer on", status: "red" },
  ];

  return (
    <View style={styles.contentContainer}>
      <Text style={styles.settingsTitle}>OUTPUT</Text>

      {outputs.map((output, idx) => (
        <View key={idx} style={styles.signalRow}>
          <Text style={styles.signalCode}>{output.id}</Text>
          <Text style={styles.signalLabel}>{output.label}</Text>
          <View
            style={[
              styles.signalLight,
              {
                backgroundColor:
                  output.status === "red" ? "#DC2626" : "#10B981",
              },
            ]}
          />
        </View>
      ))}

      <TouchableOpacity style={styles.backBtn} onPress={onBack}>
        <Text style={styles.backBtnText}>BACK</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: { padding: 16 },
  settingsTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1F2937",
    textAlign: "center",
    marginBottom: 20,
  },
  signalRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: "#E5E7EB",
  },
  signalCode: {
    width: 50,
    fontWeight: "600",
    fontSize: 14,
    color: "#111827",
  },
  signalLabel: {
    flex: 1,
    fontSize: 14,
    color: "#111827",
  },
  signalLight: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginLeft: 8,
    borderWidth: 1,
    borderColor: "#111",
  },
  backBtn: {
    marginTop: 40,
    alignSelf: "center",
    backgroundColor: "#D1D5DB",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 6,
  },
  backBtnText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
});

export default OutputView;
