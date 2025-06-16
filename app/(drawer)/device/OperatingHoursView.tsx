import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const OperatingHoursView = ({ operatingTime, onReset, onBack }) => {
  const [showResetPopup, setShowResetPopup] = useState(false);

  return (
    <View style={styles.contentContainer}>
      <Text style={styles.settingsTitle}>OPERATING HOURS</Text>

      <View style={styles.operatingRow}>
        <View style={styles.operatingTimeBox}>
          <Text style={styles.valueText}>{operatingTime.hours}</Text>
          <Text style={styles.unit}>HOURS</Text>
        </View>
        <Text style={styles.colon}>:</Text>
        <View style={styles.operatingTimeBox}>
          <Text style={styles.valueText}>{operatingTime.minutes}</Text>
          <Text style={styles.unit}>MINUTES</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.resetBtn}
        onPress={() => setShowResetPopup(true)}
      >
        <Text style={styles.resetBtnText}>🗑️ Reset</Text>
      </TouchableOpacity>

      {showResetPopup && (
        <View style={styles.popup}>
          <Text style={styles.popupText}>Press OK to delete stored values</Text>
          <View style={styles.popupActions}>
            <TouchableOpacity
              style={styles.popupButton}
              onPress={() => setShowResetPopup(false)}
            >
              <Text style={styles.popupButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.popupButton}
              onPress={() => {
                onReset();
                setShowResetPopup(false);
              }}
            >
              <Text style={styles.popupButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

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
  operatingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
  },
  operatingTimeBox: {
    alignItems: "center",
    marginHorizontal: 12,
    padding: 12,
    backgroundColor: "#000",
    borderWidth: 2,
    borderColor: "#10B981",
    borderRadius: 8,
    minWidth: 80,
  },
  colon: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#1F2937",
  },
  valueText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  unit: {
    fontSize: 14,
    color: "#111827",
  },
  resetBtn: {
    marginTop: 16,
    backgroundColor: "#F3F4F6",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    alignSelf: "center",
  },
  resetBtnText: {
    color: "#DC2626",
    fontSize: 16,
    fontWeight: "600",
  },
  popup: {
    marginTop: 30,
    backgroundColor: "#F9FAFB",
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#D1D5DB",
  },
  popupText: {
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
    marginBottom: 20,
    color: "#111827",
  },
  popupActions: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  popupButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: "#E5E7EB",
    borderRadius: 6,
  },
  popupButtonText: {
    fontWeight: "600",
    color: "#111827",
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

export default OperatingHoursView;
