import plc2 from "@/assets/images/1200auto-Photoroom.png";
import plc1 from "@/assets/images/autos200-Photoroom.png";
import { useFormat } from "@/hooks/useFormat";
import { useMachineData } from "@/hooks/useMachineData";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Switch } from "react-native-gesture-handler";


const AutoView = ({ onBack, id }: any) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [isAutoAerationOn, setIsAutoAerationOn] = useState(false);
  const [setId, setIsId] = useState(1);
  useEffect(() => {
    setIsId(id);
  }, [id]);

  const { data, error, isConnected } = useMachineData({
    url:
      id == 2
        ? `https://grain-backend.onrender.com/api/alldata/alldata`
        : `https://grain-backend.onrender.com/api/ws/current-data`,
  });



  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.5,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  useEffect(() => {
    if (id == 1 || id == 2) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }).start();
    }
  }, [id]);

  // Cards based on id
  const cardData =
    id == 1
      ? [
          { label: "RH", value: "50%" },
          { label: "TH", value: `${useFormat(data?.AI_TH_Act) ?? "--"}` },
          {
            label: "HTR",
            value: `${useFormat(data?.Value_to_Display_HEATER) ?? "--"}`,
          },
          {
            label: "HGs",
            value: `${
              useFormat(data?.Value_to_Display_HOT_GAS_VALVE_OPEN) ?? "--"
            }`,
          },
          {
            label: "AHT",
            value: `${useFormat(data?.Value_to_Display_AHT_VALE_OPEN) ?? "--"}`,
          },
          {
            label: "T0",
            value: `${useFormat(data?.AI_AIR_OUTLET_TEMP) ?? "--"}`,
          },
          {
            label: "T1",
            value: `${useFormat(data?.AI_COLD_AIR_TEMP) ?? "--"}`,
          },
          {
            label: "T1 SET POINT",
            value: `${useFormat(data?.AI_COLD_AIR_TEMP || data?.T1_SET_POINT) ?? "--"}`,
          },
          { label: "T2", value: `${useFormat(data?.AI_AMBIANT_TEMP) ?? "--"}` },
          { label: "T1 - TH", value: `${useFormat(data?.AI_TH_Act) ?? "--"}` },
          { label: "PH", value: "120 Pa" },
          { label: "PA", value: "100 Pa" },
          {
            label: "COND",
            value: `${
              useFormat(data?.Value_to_Display_COND_ACT_SPEED) ?? "--"
            }`,
          },
          {
            label: "BLOWER",
            value: `${data?.Value_to_Display_EVAP_ACT_SPEED ?? "--"}`,
          },
          {
            label: "HP",
            value: `${useFormat(data?.AI_COND_PRESSURE) ?? "--"}`,
          },
          { label: "LP", value: `${useFormat(data?.AI_SUC_PRESSURE) ?? "--"}` },
        ]
      : [
          {
            label: "TH",
            value: `${useFormat(data?.AFTER_HEATER_TEMP_Th) ?? "--"}`,
          },
          { label: "T0", value: `${useFormat(data?.AIR_OUTLET_TEMP) ?? "--"}` },
          {
            label: "T1",
            value: `${useFormat(data?.COLD_AIR_TEMP_T1) ?? "--"}`,
          },
          {
            label: "T1 SET POINT",
            value: `${useFormat(data?.T1_SET_POINT) ?? "--"}`,
          },
          {
            label: "T2",
            value: `${useFormat(data?.AMBIENT_AIR_TEMP_T2) ?? "--"}`,
          },
          { label: "TH-T1", value: `${useFormat(data?.Th_T1) ?? "--"}` },
          { label: "COND", value: `${useFormat(data?.CONDENSER_RPM) ?? "--"}` },
          { label: "BLOWER", value: `${useFormat(data?.BLOWER_RPM) ?? "--"}` },
          {
            label: "COMP",
            value: `${useFormat(data?.COMPRESSOR_TIME) ?? "--"}`,
          },
          { label: "HP", value: `${useFormat(data?.HP) ?? "--"}` },
          { label: "LP", value: `${useFormat(data?.LP) ?? "--"}` },
        ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>AUTO</Text>
      <Animated.View
        style={{
          width: 12,
          height: 12,
          borderRadius: 6,
          backgroundColor: isConnected ? "#34D399" : "#F87171", // green or red
          transform: [{ scale: pulseAnim }],
        }}
      />

      {/* Connection Text */}
      <Text
        style={{
          fontSize: 18,
          fontWeight: "bold",
          color: isConnected ? "#10B981" : "#EF4444",
        }}
      >
        {isConnected ? "Connected" : "Disconnected"}
      </Text>

      <Image
        source={id == 1 ? plc2 : plc1}
        style={styles.image}
        resizeMode="contain"
      />

      {(id == 1 || id == 2) && (
        <Animated.View style={[styles.cardsContainer, { opacity: fadeAnim }]}>
          {cardData.map((item, index) => (
            <View key={index} style={styles.card}>
              <Text style={styles.cardLabel}>{item.label}</Text>
              <Text style={styles.cardValue}>{item.value}</Text>
            </View>
          ))}
          {id == 1 && (
            <TouchableOpacity style={styles.selectAutoCard}>
              <Text style={styles.selectAutoText}>SELECT AUTO</Text>
            </TouchableOpacity>
          )}
          {id == 2 && (
            <>
              <TouchableOpacity style={styles.startButtonCard}>
                <Text style={styles.startStopText}>START</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.stopButtonCard}>
                <Text style={styles.startStopText}>STOP</Text>
              </TouchableOpacity>

              <View style={styles.toggleCard}>
                <Text style={styles.toggleLabel}>AUTO AERATION</Text>
                <Switch
                  value={isAutoAerationOn}
                  onValueChange={(value) => setIsAutoAerationOn(value)}
                />
              </View>
            </>
          )}
        </Animated.View>
      )}

      <TouchableOpacity style={styles.backBtn} onPress={onBack}>
        <Text style={styles.backBtnText}>BACK</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 16,
    backgroundColor: "#F9FAFB",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 20,
  },
  image: {
    width: "100%",
    height: 250,
    marginBottom: 20,
  },
  cardsContainer: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 10,
    marginBottom: 20,
  },
  card: {
    width: "30%",
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardLabel: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 4,
    textAlign: "center",
  },
  cardValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#111827",
    textAlign: "center",
  },
  selectAutoCard: {
    width: "65%",
    backgroundColor: "#3B82F6",
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  selectAutoText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  startButtonCard: {
    width: "45%",
    backgroundColor: "#22C55E",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  stopButtonCard: {
    width: "45%",
    backgroundColor: "#EF4444",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  startStopText: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 16,
  },
  toggleCard: {
    width: "65%",
    backgroundColor: "#ffffff",
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  toggleLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#111827",
  },
  backBtn: {
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

export default AutoView;
