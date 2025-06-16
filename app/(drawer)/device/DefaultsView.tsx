import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const DefaultsView = ({ defaultsData, onBack }) => {
  return (
    <View style={styles.contentContainer}>
      <Text style={styles.settingsTitle}>DEFAULTS</Text>
      {[
        { label: "T1", value: defaultsData.T1, unit: "°C" },
        { label: "TH-T1", value: defaultsData.THT1, unit: "°C" },
        { label: "Delta(A)", value: defaultsData.deltaA, unit: "°C" },
        { label: "HP", value: defaultsData.hp, unit: "psi" },
        {
          label: "Auto aeration >",
          value: defaultsData.autoAeration,
          unit: "min",
        },
      ].map((item, idx) => (
        <View key={idx} style={styles.row}>
          <Text style={styles.label}>{item.label}</Text>
          <View style={styles.valueBox}>
            <Text style={styles.valueText}>{item.value}</Text>
          </View>
          <Text style={styles.unit}>{item.unit}</Text>
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
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    justifyContent: "center",
  },
  label: {
    width: 110,
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    textAlign: "center",
  },
  valueBox: {
    width: 60,
    height: 40,
    backgroundColor: "#000",
    borderWidth: 2,
    borderColor: "#10B981",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
    marginBottom: 8,
  },
  valueText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  unit: {
    fontSize: 14,
    color: "#111827",
    marginLeft: 6,
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

export default DefaultsView;
