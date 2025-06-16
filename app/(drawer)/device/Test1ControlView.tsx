import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Test1ControlView({
  onBack,
  onNext,
  data
}: {
  onBack: () => void;
  onNext: () => void;
  data:any
}) {
  const [blower, setBlower] = useState(0);
  const [condenser, setCondenser] = useState(0);
  const [delay, setDelay] = useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>TEST-1</Text>
      <Text style={styles.serial}>SR. NO. GTPL-109</Text>

      <View style={styles.row}>
        <Text style={styles.label}>Blower</Text>
        <Text style={styles.value}>{data?.BLOWER_SET_POINT_MANUAL_MODE}</Text>
        <TouchableOpacity style={styles.startBtn} onPress={()=>{
          data?.BLOWER_START_MANUAL_MOD
        }}>
          <Text style={styles.btnText}>START</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.stopBtn} onPress={()=>{
          data?.BLOWER_STOP_MANUAL_MODE
        }}>
          <Text style={styles.btnText}>STOP</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Condenser</Text>
        <Text style={styles.value}>{data?.CONDN_FAN_SET_POINT_MANUAL}</Text>
        <TouchableOpacity style={styles.startBtn}>
          <Text style={styles.btnText} onPress={()=>{
          data?.CONDN_FAN_START_MANUAL_M
        }}>START</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.stopBtn}>
          <Text style={styles.btnText} onPress={()=>{
          data?.CONDN_FAN_STOP_MANUAL_M
        }}>STOP</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Compressor</Text>
   
        <TouchableOpacity style={styles.startBtn}>
          <Text style={styles.btnText} onPress={()=>{
          data?.COMPRESSOR_START_MANUAL
        }}>START</Text>
          <Text style={styles.btnText} onPress={()=>{
          data?.COMPRESSOR_STOP_MANUAL
        }}>STOP</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Comp start delay</Text>
        <Text style={styles.value}>{data?.DELAY_TIME}</Text>
        <Text style={styles.label}>Second</Text>
      </View>

      <View style={styles.bottomRow}>
        <TouchableOpacity style={styles.backBtn} onPress={onBack}>
          <Text style={styles.btnText}>BACK</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.nextBtn} onPress={onNext}>
          <Text style={styles.btnText}>NEXT</Text>
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
  nextBtn: {
    backgroundColor: "#444",
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 6,
  },
  btnText: { color: "white", fontWeight: "bold" },
});
