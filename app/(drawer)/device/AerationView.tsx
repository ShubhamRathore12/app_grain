import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function AerationView({
  onWithoutHeating,
  onWithHeating,
  onBack,
}: {
  onWithoutHeating: () => void;
  onWithHeating: () => void;
  onBack: () => void;
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>AERATION</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={onWithoutHeating}>
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>🌪️</Text>
          </View>
          <Text style={styles.buttonText}>AERATION WITHOUT HEATING</Text>
          <Text style={styles.buttonSubtext}>Standard aeration mode</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={onWithHeating}>
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>🔥</Text>
          </View>
          <Text style={styles.buttonText}>AERATION WITH HEATING</Text>
          <Text style={styles.buttonSubtext}>Heated aeration mode</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Text style={styles.backText}>← BACK</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#F9FAFB",
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 40,
    color: "#1F2937",
    textAlign: "center",
  },
  buttonContainer: {
    width: "100%",
    gap: 20,
    marginBottom: 40,
  },
  button: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 12,
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 2,
    borderColor: "#E5E7EB",
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#EFF6FF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  icon: {
    fontSize: 24,
  },
  buttonText: {
    fontWeight: "bold",
    color: "#1F2937",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 4,
  },
  buttonSubtext: {
    fontSize: 12,
    color: "#6B7280",
    textAlign: "center",
  },
  backButton: {
    position: "absolute",
    bottom: 10,
    left: 50,
  
    backgroundColor: "#6B7280",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  backText: {
    fontWeight: "bold",
    color: "#FFFFFF",
    fontSize: 16,
  },
});
