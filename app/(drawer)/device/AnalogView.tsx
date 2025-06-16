import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const AnalogView = ({ onBack,data }:any) => {
  const analogInputCurrent = [
    { id: "AIW72", label: "Suction pressure", value: data?.LP },
    { id: "AIW74", label: "Discharge pressure", value: data?.HP },
  ];

  const analogInputRTD = [
    { id: "AIW112", label: "T0 probe (Afterheater)", value: data?.AIR_OUTLET_TEMP },
    { id: "AIW116", label: "T1 probe (Cold Air)", value: data?.COLD_AIR_TEMP_T1 },
    { id: "AIW120", label: "T2 probe (Ambient Air)", value:data?.AMBIENT_AIR_TEMP_T2  },
    { id: "AIW124", label: "TH probe (Supply Air)", value: data?.AFTER_HEATER_TEMP_Th },
  ];

  const analogOutputs = [
    { id: "AQW72", label: "Blower speed", value: data?.BLOWER_RPM },
    { id: "AQW74", label: "Cond. Fan speed", value: data?.CONDENSER_RPM },
    { id: "AQW80", label: "Hot gas valve", value: data?.HOT_GAS_VALVE_RPM },
    { id: "AQW82", label: "Afterheat valve", value: data?.AFTER_HEATER_VALVE_RPM },
  ];

  const renderRows = (data:any) =>
    data.map((item:any, idx:any) => (
      <View key={idx} style={styles.analogRow}>
        <Text style={styles.signalCode}>{item.id}</Text>
        <Text style={styles.signalLabel}>{item.label}</Text>
        <View style={styles.valueBox}>
          <Text style={styles.valueText}>{item.value}</Text>
        </View>
      </View>
    ));

  return (
    <View style={styles.contentContainer}>
      <Text style={styles.settingsTitle}>ANALOG</Text>

      <Text style={styles.analogSectionTitle}>Analog Input (4-20mA)</Text>
      {renderRows(analogInputCurrent)}

      <Text style={styles.analogSectionTitle}>Analog Input (RTD Type)</Text>
      {renderRows(analogInputRTD)}

      <Text style={styles.analogSectionTitle}>Analog Output</Text>
      {renderRows(analogOutputs)}

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
  analogRow: {
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
  analogSectionTitle: {
    fontWeight: "700",
    fontSize: 16,
    color: "#111827",
    backgroundColor: "#D1D5DB",
    textAlign: "center",
    paddingVertical: 6,
    marginTop: 16,
    marginBottom: 8,
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

export default AnalogView;
