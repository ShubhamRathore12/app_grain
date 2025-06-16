import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function TestSelectionView({
  onSelectTest1,
  onSelectTest2,
  onBack,
}: {
  onSelectTest1: () => void;
  onSelectTest2: () => void;
  onBack: () => void;
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Test</Text>
      <TouchableOpacity style={styles.button} onPress={onSelectTest1}>
        <Text style={styles.buttonText}>TEST 1</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onSelectTest2}>
        <Text style={styles.buttonText}>TEST 2</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Text style={styles.buttonText}>BACK</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 24 },
  button: {
    backgroundColor: "#222",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 6,
    marginVertical: 10,
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  backButton: {
    marginTop: 20,
    backgroundColor: "#666",
    padding: 12,
    borderRadius: 6,
  },
});
