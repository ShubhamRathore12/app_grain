import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
} from "react-native";

const LoggingSettingsView = ({ logInterval, onBack }) => {
  const [showTransfer, setShowTransfer] = useState(false);
  const [transferAnim] = useState(new Animated.Value(0));

  const startTransfer = () => {
    setShowTransfer(true);
    transferAnim.setValue(0);
    Animated.timing(transferAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: false,
    }).start(() => {
      setTimeout(() => setShowTransfer(false), 1000);
    });
  };

  const transferWidth = transferAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  return (
    <View style={styles.contentContainer}>
      <Text style={styles.settingsTitle}>LOGGING SETTING</Text>

      <View style={styles.loggingRow}>
        <Text style={styles.label}>Log interval{"\n"}(1 min to 60 min)</Text>
        <View style={styles.valueBox}>
          <Text style={styles.valueText}>{logInterval}</Text>
        </View>
        <Text style={styles.unit}>min</Text>

        <TouchableOpacity onPress={startTransfer}>
          <Text style={styles.downloadIcon}>⬇️</Text>
        </TouchableOpacity>
      </View>

      {showTransfer && (
        <View style={styles.transferContainer}>
          <Animated.View
            style={[styles.transferBar, { width: transferWidth }]}
          />
          <Text style={styles.transferText}>Data Transfer</Text>
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
  loggingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 30,
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
  unit: {
    fontSize: 14,
    color: "#111827",
    marginLeft: 6,
  },
  downloadIcon: {
    fontSize: 30,
    color: "#DC2626",
    marginLeft: 10,
  },
  transferContainer: {
    marginTop: 30,
    height: 50,
    width: "100%",
    borderRadius: 8,
    backgroundColor: "#D1FAE5",
    justifyContent: "center",
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#10B981",
  },
  transferBar: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: "#10B981",
    zIndex: -1,
  },
  transferText: {
    textAlign: "center",
    fontWeight: "700",
    fontSize: 16,
    color: "#065F46",
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

export default LoggingSettingsView;
