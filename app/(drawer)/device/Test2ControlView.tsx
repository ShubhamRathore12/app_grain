import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Test2ControlView({ onBack,data }: { onBack: () => void,data:any }) {
  const [hotGas, setHotGas] = useState(0);
  const [afterHeat, setAfterHeat] = useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>TEST-2</Text>
      <Text style={styles.serial}>SR. NO. GTPL-109</Text>

      <View style={styles.row}>
        <Text style={styles.label}>Hot gas valve</Text>
        <Text style={styles.value}>{data?.HOT_GAS_VALVE_SET_POINT_MANAUAL || '0'}</Text>
        <TouchableOpacity style={styles.startBtn}>
          <Text style={styles.btnText}>START</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.stopBtn}>
          <Text style={styles.btnText}>STOP</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Afterheat valve</Text>
        <Text style={styles.value}>{data?.AFTER_HEATER_VALVE_SET_POINT_MANUAL || '0'}</Text>
        <TouchableOpacity style={styles.startBtn}>
          <Text style={styles.btnText}  onPress={()=>{
          data?.AFT_START_MANUAL_MODE
        }}>START</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.stopBtn}>
          <Text style={styles.btnText} onPress={()=>{
          data?.AFT_STOP_MANUAL_MODE
        }}>STOP</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Heater</Text>
        <TouchableOpacity style={styles.startBtn}>
          <Text style={styles.btnText}  onPress={()=>{
          data?.HEATER_START_MANUAL
        }}>ON</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.stopBtn}>
          <Text style={styles.btnText} onPress={()=>{
          data?.HEATER_STOP_MANUAL
        }}>OFF</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bottomRow}>
        <TouchableOpacity style={styles.backBtn} onPress={onBack}>
          <Text style={styles.btnText}>BACK</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.autoBtn} onPress={onBack}>
          <Text style={styles.btnText}>AUTO</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  title: { fontSize: 20, fontWeight: "bold", textAlign: "center" },
  serial: { fontSize: 14, marginTop: 10, textAlign: "center" },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 12,
    justifyContent: "space-between",
  },
  label: { fontSize: 14, fontWeight: "bold", width: 120 },
  value: {
    backgroundColor: "black",
    color: "yellow",
    paddingHorizontal: 12,
    paddingVertical: 6,
    textAlign: "center",
    minWidth: 40,
  },
  startBtn: {
    backgroundColor: "green",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  stopBtn: {
    backgroundColor: "darkred",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 32,
  },
  backBtn: {
    backgroundColor: "#444",
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 6,
  },
  autoBtn: {
    backgroundColor: "#444",
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 6,
  },
  btnText: { color: "white", fontWeight: "bold" },
});
