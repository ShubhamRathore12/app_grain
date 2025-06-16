import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const InputView = ({ onBack, onAnalog, onOutput }) => {
  const signals = [
    { id: "I0.0", label: "Blower circuit breaker fault", status: "green" },
    { id: "I0.1", label: "Blower drive fault", status: "green" },
    { id: "I0.2", label: "Blower drive operation", status: "green" },
    { id: "I0.3", label: "Spare", status: "green" },
    { id: "I0.4", label: "Condenser fan overheat", status: "red" },
    { id: "I0.5", label: "Spare", status: "green" },
    { id: "I0.6", label: "Compressor circuit breaker fault", status: "green" },
    { id: "I0.7", label: "Low pressure fault", status: "green" },
    { id: "I1.0", label: "High pressure fault", status: "green" },
    { id: "I1.1", label: "Three phase monitor fault", status: "green" },
    { id: "I1.2", label: "Heater overheat", status: "red" },
    {
      id: "I1.3",
      label: "Condenser fan circuit breaker fault",
      status: "green",
    },
    { id: "I1.4", label: "Heater circuit breaker fault", status: "green" },
    { id: "I1.5", label: "Heater RCCB fault", status: "green" },
    { id: "I1.6", label: "Condenser fan door open", status: "green" },
  ];

  return (
    <View style={styles.contentContainer}>
      <Text style={styles.settingsTitle}>INPUT</Text>
      {signals.map((signal, index) => (
        <View key={index} style={styles.signalRow}>
          <Text style={styles.signalCode}>{signal.id}</Text>
          <Text style={styles.signalLabel}>{signal.label}</Text>
          <View
            style={[
              styles.signalLight,
              {
                backgroundColor:
                  signal.status === "green" ? "#10B981" : "#DC2626",
              },
            ]}
          />
        </View>
      ))}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.greyBtn} onPress={onBack}>
          <Text style={styles.backBtnText}>BACK</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.greyBtn} onPress={onAnalog}>
          <Text style={styles.backBtnText}>ANALOG</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.greyBtn} onPress={onOutput}>
          <Text style={styles.backBtnText}>OUTPUT</Text>
        </TouchableOpacity>
      </View>
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
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 30,
  },
  greyBtn: {
    backgroundColor: "#D1D5DB",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  backBtnText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
});

export default InputView;
