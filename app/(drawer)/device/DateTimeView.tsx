import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const DateTimeView = ({ plcDateTime, onBack }:any) => {
  const fields = [
    { label: "Year", key: "year" },
    { label: "Month", key: "month" },
    { label: "Day", key: "day" },
    { label: "Hour", key: "hour" },
    { label: "Minute", key: "minute" },
    { label: "Second", key: "second" },
  ];

  return (
    <View style={styles.contentContainer}>
      <Text style={styles.settingsTitle}>SET PLC DATE & TIME</Text>
      <View style={styles.dateTimeGrid}>
        {fields.map((field, idx) => (
          <View key={idx} style={styles.dateTimeBox}>
            <Text style={styles.label}>{field.label}</Text>
            <View style={styles.valueBox}>
              <Text style={styles.valueText}>
                {plcDateTime[field.key] || 0}
              </Text>
            </View>
          </View>
        ))}
      </View>
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
  dateTimeGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 20,
    marginTop: 10,
  },
  dateTimeBox: {
    alignItems: "center",
    marginBottom: 20,
    width: "30%",
  },
  label: {
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

export default DateTimeView;
