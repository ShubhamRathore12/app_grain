import { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function FaultCodeView({ onBack, data, id }: { onBack: () => void, data: any, id: any }) {

  const [setId, setIsId] = useState(1);
  const [currentView, setCurrentView] = useState('codes'); // 'codes' or 'logs'
  
  useEffect(() => {
    setIsId(id);
  }, [id]);

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

  const s7_200_faultCodes = [
    { code: 1, description: "Compressor circuit breaker fault" },
    { code: 2, description: "Condenser fan door open" },
    { code: 3, description: "Blower drive fault" },
    { code: 4, description: "Blower circuit breaker fault" },
    { code: 6, description: "Heater circuit breaker fault" },
    { code: 7, description: "Three phase monitor fault" },
    { code: 8, description: "Low Pressure Fault" },
    { code: 9, description: "Ambient temp lower than set temp" },
    { code: 10, description: "Ambient temp. Over 43°C" },
    { code: 12, description: "Heater RCCB fault" },
    { code: 13, description: "Cond Fan circuit breaker fault" },
    { code: 14, description: "Low pressure fault : Locked" },
    { code: 15, description: "Anti Freeze Protection" },
    { code: 16, description: "High pressure fault : Locked" },
    { code: 17, description: "Ambient temp. Over 40°C" },
    { code: 18, description: "Ambient temp. Less than 4°C" },
    { code: 19, description: "Cond Fan TOP" },
    { code: 23, description: "Ambient Temp Sensor T2 Open" },
    { code: 24, description: "Ambient Temp Sensor T2 Short Circuit" },
    { code: 27, description: "Air Outlet Temp Sensor T0 Open" },
    { code: 28, description: "Air Outlet Temp Sensor T0 Short Circuit" },
    { code: 31, description: "Cold Air Temp Sensor T1 Open" },
    { code: 32, description: "Cold Air Temp Sensor T1 short circuit" },
    { code: 35, description: "Air After Heater Temp Sensor TH Open" },
    { code: 36, description: "Air After Heater Temp Sensor TH short circuit" },
    { code: 39, description: "High Pressure Fault" },
    { code: 41, description: "Heater TOP fault" },
    { code: 44, description: "TH Air After Heater Temp more than 50 °C" },
    { code: 45, description: "Warning : Delta value not achieved in aeration mode" },
    { code: 48, description: "Warning : LP transducer failure" },
    { code: 49, description: "Warning : HP transducer failure" },
  ];

  const s7_200_tags = [
    { tag: "AERATION_MODE_WITH_HEAT", value: data?.AERATION_MODE_WITH_HEAT },
    { tag: "AERATION_MODE_WITHOUT_HEAT", value: data?.AERATION_MODE_WITHOUT_HEAT },
    { tag: "AERATION_WITH_HEATER_START", value: data?.AERATION_WITH_HEATER_START },
    { tag: "AERATION_WITH_HEATER_STOP", value: data?.AERATION_WITH_HEATER_STOP },
    { tag: "AERATION_WITHOUT_HEATER_START", value: data?.AERATION_WITHOUT_HEATER_START },
    { tag: "AERATION_WITHOUT_HEATER_STOP", value: data?.AERATION_WITHOUT_HEATER_STOP },
    { tag: "AFTER_HEAT_TEMP_MORE_THAN_50", value: data?.AFTER_HEAT_TEMP_MORE_THAN_50 },
    { tag: "AFTER_HEAT_TEMP_SENSOR_TH_OPEN", value: data?.AFTER_HEAT_TEMP_SENSOR_TH_OPEN },
    { tag: "AFTER_HEAT_TEMP_SENSOR_TH_SHORT_CIRCUIT", value: data?.AFTER_HEAT_TEMP_SENSOR_TH_SHORT_CIRCUIT },
    { tag: "AFTER_HEAT_VALVE_ON", value: data?.AFTER_HEAT_VALVE_ON },
    { tag: "AHT_START_MANUAL_MODE", value: data?.AHT_START_MANUAL_MODE },
    { tag: "AHT_STOP_MANUAL_MODE", value: data?.AHT_STOP_MANUAL_MODE },
    { tag: "AIR_OUTLET_TEMP_SENSOR_T0_OPEN", value: data?.AIR_OUTLET_TEMP_SENSOR_T0_OPEN },
    { tag: "AIR_OUTLET_TEMP_SENSOR_T0_SHORT_CIRCUIT", value: data?.AIR_OUTLET_TEMP_SENSOR_T0_SHORT_CIRCUIT },
    { tag: "AMBIENT_TEMP_LESS_THAN_4", value: data?.AMBIENT_TEMP_LESS_THAN_4 },
    { tag: "AMBIENT_TEMP_LOW_THAN_SET_TEMP", value: data?.AMBIENT_TEMP_LOW_THAN_SET_TEMP },
    { tag: "AMBIENT_TEMP_OVER_40", value: data?.AMBIENT_TEMP_OVER_40 },
    { tag: "AMBIENT_TEMP_OVER_43", value: data?.AMBIENT_TEMP_OVER_43 },
    { tag: "AMBIENT_TEMP_SENSOR_T2_OPEN", value: data?.AMBIENT_TEMP_SENSOR_T2_OPEN },
    { tag: "AMBIENT_TEMP_SENSOR_T2_SHORT_CIRCUIT", value: data?.AMBIENT_TEMP_SENSOR_T2_SHORT_CIRCUIT },
    { tag: "ANTI_FREEZE_PROTECTION", value: data?.ANTI_FREEZE_PROTECTION },
    { tag: "AUTO_AERATION_ENABLE", value: data?.AUTO_AERATION_ENABLE },
    { tag: "AUTO_EN", value: data?.AUTO_EN },
    { tag: "AUTO_PROCESS_PB", value: data?.AUTO_PROCESS_PB },
    { tag: "AUTO_PROCESS_STOP_PB", value: data?.AUTO_PROCESS_STOP_PB },
    { tag: "BLOWER_CIRCUIT_BREAKER_FAULT", value: data?.BLOWER_CIRCUIT_BREAKER_FAULT },
    { tag: "BLOWER_DRIVE_ENABLE", value: data?.BLOWER_DRIVE_ENABLE },
    { tag: "BLOWER_DRIVE_FAULT", value: data?.BLOWER_DRIVE_FAULT },
    { tag: "BLOWER_DRIVE_ON", value: data?.BLOWER_DRIVE_ON },
    { tag: "BLOWER_START_MANUAL_MOD", value: data?.BLOWER_START_MANUAL_MOD },
    { tag: "BLOWER_STOP_MANUAL_MODE", value: data?.BLOWER_STOP_MANUAL_MODE },
    { tag: "BUZZER_ON", value: data?.BUZZER_ON },
    { tag: "C0ND_FAN_TOP", value: data?.C0ND_FAN_TOP },
    { tag: "COLD_AIR_TEMP_SENSOR_T1_OPEN", value: data?.COLD_AIR_TEMP_SENSOR_T1_OPEN },
    { tag: "COLD_AIR_TEMP_SENSOR_T1_SHORT_CIRCUIT", value: data?.COLD_AIR_TEMP_SENSOR_T1_SHORT_CIRCUIT },
    { tag: "COMPRESSOR_CIRCUIT_BREA_FAULT", value: data?.COMPRESSOR_CIRCUIT_BREA_FAULT },
    { tag: "COMPRESSOR_ON", value: data?.COMPRESSOR_ON },
    { tag: "COMPRESSOR_START_MANUAL", value: data?.COMPRESSOR_START_MANUAL },
    { tag: "COMPRESSOR_STOP_MANUAL", value: data?.COMPRESSOR_STOP_MANUAL },
    { tag: "COMPRESSOR_VISIBLE", value: data?.COMPRESSOR_VISIBLE },
    { tag: "COND_FAN_CIRCUIT_BREAKE_FAULT", value: data?.COND_FAN_CIRCUIT_BREAKE_FAULT },
    { tag: "COND_FAN_MOTOR_OVERHEAT", value: data?.COND_FAN_MOTOR_OVERHEAT },
    { tag: "cond_fan_on", value: data?.cond_fan_on },
    { tag: "COND_FAN_START_MANUAL_M", value: data?.COND_FAN_START_MANUAL_M },
    { tag: "COND_FAN_STOP_MANUAL_M", value: data?.COND_FAN_STOP_MANUAL_M },
    { tag: "CONDENSER_FAN_DOOR_OPEN", value: data?.CONDENSER_FAN_DOOR_OPEN },
    { tag: "CONTINUOUS_MODE", value: data?.CONTINUOUS_MODE },
    { tag: "FAULT_RESET", value: data?.FAULT_RESET },
    { tag: "GREEN_LIGHT", value: data?.GREEN_LIGHT },
    { tag: "HEATER_CIRCUIT_BREAKER_FAULT", value: data?.HEATER_CIRCUIT_BREAKER_FAULT },
    { tag: "HEATER_OVER_HEAT", value: data?.HEATER_OVER_HEAT },
    { tag: "HEATER_RCCCB_TRIP_FAULT", value: data?.HEATER_RCCCB_TRIP_FAULT },
    { tag: "HEATER_START_MANUAL", value: data?.HEATER_START_MANUAL },
    { tag: "HEATER_STOP_MANUAL", value: data?.HEATER_STOP_MANUAL },
    { tag: "HEATER_TOP_FAULT", value: data?.HEATER_TOP_FAULT },
    { tag: "HIGH_PRESSURE_FAULT", value: data?.HIGH_PRESSURE_FAULT },
    { tag: "HIGH_PRESSURE_FAULT_LOCKED", value: data?.HIGH_PRESSURE_FAULT_LOCKED },
    { tag: "HOT_GAS_VALVE_ON", value: data?.HOT_GAS_VALVE_ON },
    { tag: "HOT_GAS_VALVE_START_MAN", value: data?.HOT_GAS_VALVE_START_MAN },
    { tag: "HOT_GAS_VALVE_STOP_MAN", value: data?.HOT_GAS_VALVE_STOP_MAN },
    { tag: "HP_TRANSDUCEER_FAILURE", value: data?.HP_TRANSDUCEER_FAILURE },
    { tag: "LOW_PRESSURE_FAULT", value: data?.LOW_PRESSURE_FAULT },
    { tag: "LOW_PRESSURE_FAULT_LOCKED", value: data?.LOW_PRESSURE_FAULT_LOCKED },
    { tag: "LP_TRANSDUCER_FAILURE", value: data?.LP_TRANSDUCER_FAILURE },
    { tag: "MANUAL_EN", value: data?.MANUAL_EN },
    { tag: "OPERATING_HOURS_RESET", value: data?.OPERATING_HOURS_RESET },
    { tag: "SET_POINT_NOT_ACHIEVED_IN_AERATION_MODE", value: data?.SET_POINT_NOT_ACHIEVED_IN_AERATION_MODE },
    { tag: "SET_TIME", value: data?.SET_TIME },
    { tag: "THREE_PHASE_MONITORING_FAULT", value: data?.THREE_PHASE_MONITORING_FAULT },
    { tag: "YELLOW_LIGHT", value: data?.YELLOW_LIGHT },
  ];

  // Function to get status color based on value
  const getStatusColor = (value:any) => {
    if (value === "fa" || value === false) {
      return "#22C55E"; // Green color
    } else if (value === "tr" || value === true) {
      return "#EF4444"; // Red color
    } else {
      return "#6B7280"; // Gray color for undefined/null values
    }
  };

  // Function to get status text
  const getStatusText = (value:any) => {
    if (value === "fa" || value === false) {
      return "FALSE";
    } else if (value === "tr" || value === true) {
      return "TRUE";
    } else {
      return "N/A";
    }
  };

  // Function to format created date
  const formatDate = (dateString:any) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      return date.toLocaleString();
    } catch (error) {
      return "Invalid Date";
    }
  };

  // Render fault codes view
  const renderFaultCodes = () => {
    const codes = setId === 1 ? faultCodes : s7_200_faultCodes;
    const mid = Math.ceil(codes.length / 2);
    const leftCodes = codes.slice(0, mid);
    const rightCodes = codes.slice(mid);

    return (
      <View style={styles.columnsContainer}>
        <View style={styles.column}>
          <Text style={styles.columnHeader}>Codes 1-25</Text>
          {leftCodes.map((item:any, index:any) => (
            <View key={`${item.code}-${index}`} style={styles.codeItem}>
              <Text style={styles.codeNumber}>{item.code}.</Text>
              <Text style={styles.codeText}>
                {setId === 1 ? item.message : item.description}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.column}>
          <Text style={styles.columnHeader}>Codes 26-49</Text>
          {rightCodes.map((item:any, index:any) => (
            <View key={`${item.code}-${index}`} style={styles.codeItem}>
              <Text style={styles.codeNumber}>{item.code}.</Text>
              <Text style={styles.codeText}>
                {setId === 1 ? item.message : item.description}
              </Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  // Render fault logs view
  const renderFaultLogs = () => {
    return (
      <View style={styles.logsContainer}>
        {/* Date and Time Header */}
        <View style={styles.dateHeader}>
          <Text style={styles.dateText}>
            Created: {formatDate(data?.created_at)}
          </Text>
        </View>

        {/* Tags List */}
        <View style={styles.tagsListContainer}>
          {s7_200_tags.map((item, index) => (
            <View key={`${item.tag}-${index}`} style={[
              styles.logItem,
              { backgroundColor: getStatusColor(item.value) + '20' } // Adding transparency
            ]}>
              <View style={styles.logItemContent}>
                <Text style={styles.tagName}>{item.tag}</Text>
                <View style={styles.statusContainer}>
                  <View style={[
                    styles.statusIndicator,
                    { backgroundColor: getStatusColor(item.value) }
                  ]} />
                  <Text style={[
                    styles.tagStatus,
                    { color: getStatusColor(item.value) }
                  ]}>
                    {getStatusText(item.value)}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {currentView === 'codes' 
          ? (setId === 1 ? "FAULT CODES" : "S7-200 FAULT CODES")
          : "FAULT LOGS"
        }
      </Text>

      {/* Toggle View Buttons */}
      <View style={styles.toggleContainer}>
        <TouchableOpacity 
          style={[
            styles.toggleButton, 
            currentView === 'codes' && styles.activeToggleButton
          ]}
          onPress={() => setCurrentView('codes')}
        >
          <Text style={[
            styles.toggleButtonText,
            currentView === 'codes' && styles.activeToggleButtonText
          ]}>
            Fault Codes
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.toggleButton, 
            currentView === 'logs' && styles.activeToggleButton
          ]}
          onPress={() => setCurrentView('logs')}
        >
          <Text style={[
            styles.toggleButtonText,
            currentView === 'logs' && styles.activeToggleButtonText
          ]}>
            Fault Logs
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={true}
      >
        {currentView === 'codes' ? renderFaultCodes() : renderFaultLogs()}
      </ScrollView>

      <View style={styles.actionContainer}>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>📄 Print {currentView === 'codes' ? 'Codes' : 'Logs'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>📤 Export {currentView === 'codes' ? 'List' : 'Logs'}</Text>
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
  toggleContainer: {
    flexDirection: "row",
    marginBottom: 16,
    backgroundColor: "#1A1A1A",
    borderRadius: 8,
    padding: 4,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignItems: "center",
  },
  activeToggleButton: {
    backgroundColor: "#3B82F6",
  },
  toggleButtonText: {
    color: "#9CA3AF",
    fontSize: 14,
    fontWeight: "500",
  },
  activeToggleButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
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
  logsContainer: {
    flex: 1,
  },
  dateHeader: {
    backgroundColor: "#1A1A1A",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: "#3B82F6",
  },
  dateText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  tagsListContainer: {
    flex: 1,
  },
  logItem: {
    marginVertical: 2,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#2E2E2E",
  },
  logItemContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  tagName: {
    fontSize: 13,
    color: "#DDDDDD",
    fontWeight: "500",
    flex: 1,
    marginRight: 12,
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  tagStatus: {
    fontSize: 12,
    fontWeight: "600",
    minWidth: 50,
    textAlign: "right",
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