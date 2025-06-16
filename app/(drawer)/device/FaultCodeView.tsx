import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function FaultCodeView({ onBack }: { onBack: () => void }) {
  const faultCodes = [
    { code: 1, message: "Compressor circuit breaker fault" },
    { code: 2, message: "Condenser fan door open" },
    { code: 3, message: "Blower drive fault" },
    { code: 4, message: "Blower circuit breaker fault" },
    { code: 6, message: "Heater circuit breaker fault" },
    { code: 7, message: "Three phase monitor fault" },
    { code: 8, message: "Low Pressure Fault" },
    { code: 9, message: "Ambient temp lower than set temp" },
    { code: 10, message: "Ambient temp. Over 43°C" },
    { code: 12, message: "Heater RCCB fault" },
    { code: 13, message: "Cond Fan circuit breaker fault" },
    { code: 14, message: "Low pressure fault : Locked" },
    { code: 15, message: "Anti Freeze Protection" },
    { code: 16, message: "High pressure fault : Locked" },
    { code: 17, message: "Ambient temp. Over 40°C" },
    { code: 18, message: "Ambient temp. Less than 4°C" },
    { code: 19, message: "Cond Fan  TOP" },
    { code: 23, message: "Ambient Temp Sensor T2 Open" },
    { code: 24, message: "Ambient Temp Sensor T2 Short Circuit" },
    { code: 27, message: "Air Outlet Temp Sensor T0 Open" },
    { code: 28, message: "Air Outlet Temp Sensor T0 Short Circuit" },
    { code: 32, message: "Cold Air Temp Sensor T1 Open" },
    { code: 33, message: "Cold Air Temp Sensor T1 short circuit" },
    { code: 34, message: "Air After Heater Temp Sensor TH Open" },
    { code: 35, message: "Air After Heater Temp Sensor TH short circuit" },
    { code: 39, message: "High pressure fault" },
    { code: 41, message: "Heater TOP fault" },
    { code: 44, message: "TH Air After Heater Temp more than 50 ℃" },
    {
      code: 45,
      message: "Warning : Delta value not achieved in aeration mode",
    },
    { code: 48, message: "Warning : LP transducer failure" },
    { code: 49, message: "Warning : HP transducer failure" },
  ];

  const mid = Math.ceil(faultCodes.length / 2);
  const leftCodes = faultCodes.slice(0, mid);
  const rightCodes = faultCodes.slice(mid);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>FAULT CODES</Text>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={true}
      >
        <View style={styles.columnsContainer}>
          <View style={styles.column}>
            <Text style={styles.columnHeader}>Codes 1-25</Text>
            {leftCodes.map(({ code, message }, index) => (
              <View key={`${code}-${message}`} style={styles.codeItem}>
                <Text style={styles.codeNumber}>{code}.</Text>
                <Text style={styles.codeText}>{message}</Text>
              </View>
            ))}
          </View>

          <View style={styles.column}>
            <Text style={styles.columnHeader}>Codes 26-49</Text>
            {rightCodes.map(({ code, message }, index) => (
              <View key={`${code}-${message}`} style={styles.codeItem}>
                <Text style={styles.codeNumber}>{code}.</Text>
                <Text style={styles.codeText}>{message}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={styles.actionContainer}>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>📄 Print Codes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>📤 Export List</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Text style={styles.backButtonText}>← BACK</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D0D0D",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 16,
    color: "#fff",
    borderBottomWidth: 1,
    borderColor: "#333",
    paddingBottom: 6,
  },
  scrollContent: {
    flexGrow: 1,
  },
  columnsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
  },
  column: {
    flex: 1,
  },
  columnHeader: {
    fontSize: 16,
    fontWeight: "600",
    color: "#3B82F6",
    marginBottom: 12,
    textAlign: "center",
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#2E2E2E",
  },
  codeItem: {
    flexDirection: "row",
    marginVertical: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: "#1A1A1A",
    borderRadius: 4,
    borderLeftWidth: 3,
    borderLeftColor: "#EF4444",
  },
  codeNumber: {
    fontSize: 14,
    fontWeight: "600",
    color: "#F59E0B",
    minWidth: 30,
  },
  codeText: {
    fontSize: 13,
    color: "#DDDDDD",
    flex: 1,
    lineHeight: 18,
  },
  actionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 16,
    gap: 12,
  },
  actionButton: {
    flex: 1,
    backgroundColor: "#2A2A2A",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#4F4F4F",
  },
  actionButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "500",
  },
  backButton: {
    backgroundColor: "#333",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
  backButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
