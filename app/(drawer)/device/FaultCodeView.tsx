import { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function FaultCodeView({ 
  onBack, 
  data, 
  id 
}: { 
  onBack: () => void; 
  data: any; 
  id: any; 
}) {
  const [setId, setIsId] = useState(1);
  const [currentView, setCurrentView] = useState('codes'); // 'codes', 'logs', 'details'
  const [selectedFault, setSelectedFault] = useState<any>(null);
  
  useEffect(() => {
    setIsId(id);
  }, [id]);

  // S7-1200 fault codes (original codes)
  const s7_1200_faultCodes = [
    { code: 1, description: "Compressor_circuit_breaker_fault" },
    { code: 2, description: "Oil_pressure_low" },
    { code: 3, description: "Blower_drive_fault" },
    { code: 4, description: "Blower_circuit_breaker_fault" },
    { code: 5, description: "Ambient_air_sensor_1open" },
    { code: 6, description: "COND_FAN_OVERLOAD" },
    { code: 7, description: "Three_phase_monitor_fault" },
    { code: 8, description: "High_pressure_fault" },
    { code: 9, description: "Ambient_temp._lower_than_set_temp." },
    { code: 10, description: "Ambient_temp._over_50°C" },
    { code: 11, description: "COMP._MODULE_FEEDBACK_ERROR_(Si-I1)" },
    { code: 14, description: "Low_pressure_1_fault" },
    { code: 15, description: "COMP_FBK_ERROR" },
    { code: 16, description: "Low_pressure_2_fault" },
    { code: 17, description: "Ambient_temp._over_47°C" },
    { code: 18, description: "Condenser_fan_2_TOP_fault" },
    { code: 19, description: "Condenser_fan_3_TOP_fault" },
    { code: 20, description: "Condenser_fan_4_TOP_fault" },
    { code: 21, description: "Condenser_fan_2_circuit_breaker_fault" },
    { code: 22, description: "Condenser_fan_3_circuit_breaker_fault" },
    { code: 23, description: "Condenser_fan_4_circuit_breaker_fault" },
    { code: 24, description: "Condenser_fan_5_TOP_fault" },
    { code: 25, description: "Condenser_fan_6_TOP_fault" },
    { code: 26, description: "Condenser_fan_5_circuit_breaker_fault" },
    { code: 27, description: "Condenser_fan_6_circuit_breaker_fault" },
    { code: 30, description: "Condenser_fan_1_circuit_breaker_fault" },
    { code: 31, description: "Condenser_fan_1_TOP_fault" },
    { code: 32, description: "Ambient_air_sensor_1_short_circuit" },
    { code: 33, description: "Ambient_air_sensor_2_open" },
    { code: 34, description: "Ambient_air_sensor_2_short_circuit" },
    { code: 35, description: "Cold_air_sensor_1_open" },
    { code: 36, description: "Cold_air_sensor_1_short_circuit" },
    { code: 37, description: "Cold_air_sensor_2_open" },
    { code: 38, description: "Cold_air_sensor_2_short_circuit" },
    { code: 39, description: "Air_outlet_sensor_1_open" },
    { code: 40, description: "Air_outlet_sensor_1_short_circuit" },
    { code: 41, description: "Air_outlet_sensor_2_open" },
    { code: 42, description: "Air_outlet_sensor_2_short_circuit" },
  ];

  // S7-200 fault codes
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

  // GPL-115 fault codes
  const gpl_115_faultCodes = [
    { code: 1, description: "Compressor_circuit_breaker_fault" },
    { code: 2, description: "Condenser_fan_door_open" },
    { code: 3, description: "Blower_drive_fault" },
    { code: 4, description: "Blower_circuit_breaker_fault" },
    { code: 6, description: "Heater_circuit_breaker_fault" },
    { code: 7, description: "Three_phase_monitor_fault" },
    { code: 8, description: "Low_Pressure_Fault" },
    { code: 9, description: "Ambient_temp_lower_than_set_temp" },
    { code: 10, description: "Ambient_temp_Over_43C" },
    { code: 11, description: "Compressor_motor_overheat" },
    { code: 12, description: "Heater_RCCB_fault" },
    { code: 14, description: "Low_pressure_fault_Locked" },
    { code: 15, description: "Anti_Freeze_Protection" },
    { code: 16, description: "High_pressure_fault_Locked" },
    { code: 17, description: "Ambient_temp_Over_40C" },
    { code: 18, description: "Ambient_temp_Less_than_4C" },
    { code: 20, description: "Cond_Fan_circuit_breaker_fault" },
    { code: 21, description: "Cond_Fan_drive_fault" },
    { code: 22, description: "Cond_Fan_TOP" },
    { code: 23, description: "Ambient_Temp_Sensor_T2_1_Open" },
    { code: 24, description: "Ambient_Temp_Sensor_T2_1_Short_Circuit" },
    { code: 25, description: "Ambient_Temp_Sensor_T2_2_Open" },
    { code: 26, description: "Ambient_Temp_Sensor_T2_2_Short_Circuit" },
    { code: 27, description: "Air_Outlet_Temp_Sensor_T0_1_Open" },
    { code: 28, description: "Air_Outlet_Temp_Sensor_T0_1_Short_Circuit" },
    { code: 29, description: "Air_Outlet_Temp_Sensor_T0_2_Open" },
    { code: 30, description: "Air_Outlet_Temp_Sensor_T0_2_Short_Circuit" },
    { code: 31, description: "Cold_Air_Temp_Sensor_T1_1_Open" },
    { code: 32, description: "Cold_Air_Temp_Sensor_T1_1_Short_Circuit" },
    { code: 33, description: "Cold_Air_Temp_Sensor_T1_2_Open" },
    { code: 34, description: "Cold_Air_Temp_Sensor_T1_2_Short_Circuit" },
    { code: 35, description: "Air_After_Heater_Temp_Sensor_TH_1_Open" },
    { code: 36, description: "Air_After_Heater_Temp_Sensor_TH_1_Short_Circuit" },
    { code: 37, description: "Air_After_Heater_Temp_Sensor_TH_2_Open" },
    { code: 38, description: "Air_After_Heater_Temp_Sensor_TH_2_Short_Circuit" },
    { code: 39, description: "High_Pressure_Fault" },
    { code: 41, description: "Heater_TOP_fault" },
    { code: 42, description: "Heater_drive_Fault" },
    { code: 44, description: "TH_Temp_more_than_50C" },
    { code: 45, description: "Delta_not_achieved_in_aeration_mode" },
    { code: 48, description: "Warning_LP_transducer_failure" },
    { code: 49, description: "Warning_HP_transducer_failure" }
  ];

  // S7-200 Tags with boolean values
  const s7_200_tags = [
    { tag: "AFTER_HEAT_TEMP_MORE_THAN_50", value: data?.AFTER_HEAT_TEMP_MORE_THAN_50 },
    { tag: "AFTER_HEAT_TEMP_SENSOR_TH_OPEN", value: data?.AFTER_HEAT_TEMP_SENSOR_TH_OPEN },
    { tag: "AFTER_HEAT_TEMP_SENSOR_TH_SHORT_CIRCUIT", value: data?.AFTER_HEAT_TEMP_SENSOR_TH_SHORT_CIRCUIT },
    { tag: "AIR_OUTLET_TEMP_SENSOR_T0_OPEN", value: data?.AIR_OUTLET_TEMP_SENSOR_T0_OPEN },
    { tag: "AIR_OUTLET_TEMP_SENSOR_T0_SHORT_CIRCUIT", value: data?.AIR_OUTLET_TEMP_SENSOR_T0_SHORT_CIRCUIT },
    { tag: "AMBIENT_TEMP_LESS_THAN_4", value: data?.AMBIENT_TEMP_LESS_THAN_4 },
    { tag: "AMBIENT_TEMP_LOW_THAN_SET_TEMP", value: data?.AMBIENT_TEMP_LOW_THAN_SET_TEMP },
    { tag: "AMBIENT_TEMP_OVER_40", value: data?.AMBIENT_TEMP_OVER_40 },
    { tag: "AMBIENT_TEMP_OVER_43", value: data?.AMBIENT_TEMP_OVER_43 },
    { tag: "AMBIENT_TEMP_SENSOR_T2_OPEN", value: data?.AMBIENT_TEMP_SENSOR_T2_OPEN },
    { tag: "AMBIENT_TEMP_SENSOR_T2_SHORT_CIRCUIT", value: data?.AMBIENT_TEMP_SENSOR_T2_SHORT_CIRCUIT },
    { tag: "BLOWER_CIRCUIT_BREAKER_FAULT", value: data?.BLOWER_CIRCUIT_BREAKER_FAULT },
    { tag: "BLOWER_DRIVE_FAULT", value: data?.BLOWER_DRIVE_FAULT },
    { tag: "C0ND_FAN_TOP", value: data?.C0ND_FAN_TOP },
    { tag: "COLD_AIR_TEMP_SENSOR_T1_OPEN", value: data?.COLD_AIR_TEMP_SENSOR_T1_OPEN },
    { tag: "COLD_AIR_TEMP_SENSOR_T1_SHORT_CIRCUIT", value: data?.COLD_AIR_TEMP_SENSOR_T1_SHORT_CIRCUIT },
    { tag: "COMPRESSOR_CIRCUIT_BREA_FAULT", value: data?.COMPRESSOR_CIRCUIT_BREA_FAULT },
    { tag: "COND_FAN_CIRCUIT_BREAKE_FAULT", value: data?.COND_FAN_CIRCUIT_BREAKE_FAULT },
    { tag: "CONDENSER_FAN_DOOR_OPEN", value: data?.CONDENSER_FAN_DOOR_OPEN },
    { tag: "HEATER_CIRCUIT_BREAKER_FAULT", value: data?.HEATER_CIRCUIT_BREAKER_FAULT },
    { tag: "HEATER_RCCCB_TRIP_FAULT", value: data?.HEATER_RCCCB_TRIP_FAULT },
    { tag: "HEATER_TOP_FAULT", value: data?.HEATER_TOP_FAULT },
    { tag: "HIGH_PRESSURE_FAULT", value: data?.HIGH_PRESSURE_FAULT },
    { tag: "HIGH_PRESSURE_FAULT_LOCKED", value: data?.HIGH_PRESSURE_FAULT_LOCKED },
    { tag: "HP_TRANSDUCEER_FAILURE", value: data?.HP_TRANSDUCEER_FAILURE },
    { tag: "LOW_PRESSURE_FAULT", value: data?.LOW_PRESSURE_FAULT },
    { tag: "LOW_PRESSURE_FAULT_LOCKED", value: data?.LOW_PRESSURE_FAULT_LOCKED },
    { tag: "LP_TRANSDUCER_FAILURE", value: data?.LP_TRANSDUCER_FAILURE },
    { tag: "SET_POINT_NOT_ACHIEVED_IN_AERATION_MODE", value: data?.SET_POINT_NOT_ACHIEVED_IN_AERATION_MODE },
    { tag: "THREE_PHASE_MONITORING_FAULT", value: data?.THREE_PHASE_MONITORING_FAULT },
    { tag: "created_at", value: data?.created_at },
  ];

  // S7-1200 Tags
  const s7_1200_tags = [
    { tag: "COMPRESSOR_CIRCUIT_BREAKER_FAULT", value: data?.Compressor_circuit_breaker_fault },
    { tag: "OIL_PRESSURE_LOW", value: data?.Oil_pressure_low },
    { tag: "BLOWER_DRIVE_FAULT", value: data?.Blower_drive_fault },
    { tag: "BLOWER_CIRCUIT_BREAKER_FAULT", value: data?.Blower_circuit_breaker_fault },
    { tag: "AMBIENT_AIR_SENSOR_1_OPEN", value: data?.Ambient_air_sensor_1open },
    { tag: "COND_FAN_OVERLOAD", value: data?.COND_FAN_OVERLOAD },
    { tag: "THREE_PHASE_MONITOR_FAULT", value: data?.Three_phase_monitor_fault },
    { tag: "HIGH_PRESSURE_FAULT", value: data?.High_pressure_fault },
    { tag: "AMBIENT_TEMP_LOWER_THAN_SET_TEMP", value: data?.Ambient_temp_lower_than_set_temp },
    { tag: "AMBIENT_TEMP_OVER_50C", value: data?.Ambient_temp_over_50C },
    { tag: "COMP_MODULE_FEEDBACK_ERROR", value: data?.COMP_MODULE_FEEDBACK_ERROR_Si_I1 },
    { tag: "LOW_PRESSURE_1_FAULT", value: data?.Low_pressure_1_fault },
    { tag: "COMP_FBK_ERROR", value: data?.COMP_FBK_ERROR },
    { tag: "LOW_PRESSURE_2_FAULT", value: data?.Low_pressure_2_fault },
    { tag: "AMBIENT_TEMP_OVER_47C", value: data?.Ambient_temp_over_47C },
    { tag: "CONDENSER_FAN_2_TOP_FAULT", value: data?.Condenser_fan_2_TOP_fault },
    { tag: "CONDENSER_FAN_3_TOP_FAULT", value: data?.Condenser_fan_3_TOP_fault },
    { tag: "CONDENSER_FAN_4_TOP_FAULT", value: data?.Condenser_fan_4_TOP_fault },
    { tag: "CONDENSER_FAN_2_CB_FAULT", value: data?.Condenser_fan_2_circuit_breaker_fault },
    { tag: "CONDENSER_FAN_3_CB_FAULT", value: data?.Condenser_fan_3_circuit_breaker_fault },
    { tag: "CONDENSER_FAN_4_CB_FAULT", value: data?.Condenser_fan_4_circuit_breaker_fault },
    { tag: "CONDENSER_FAN_5_TOP_FAULT", value: data?.Condenser_fan_5_TOP_fault },
    { tag: "CONDENSER_FAN_6_TOP_FAULT", value: data?.Condenser_fan_6_TOP_fault },
    { tag: "CONDENSER_FAN_5_CB_FAULT", value: data?.Condenser_fan_5_circuit_breaker_fault },
    { tag: "CONDENSER_FAN_6_CB_FAULT", value: data?.Condenser_fan_6_circuit_breaker_fault },
    { tag: "CONDENSER_FAN_1_CB_FAULT", value: data?.Condenser_fan_1_circuit_breaker_fault },
    { tag: "CONDENSER_FAN_1_TOP_FAULT", value: data?.Condenser_fan_1_TOP_fault },
    { tag: "AMBIENT_AIR_SENSOR_1_SHORT", value: data?.Ambient_air_sensor_1_short_circuit },
    { tag: "AMBIENT_AIR_SENSOR_2_OPEN", value: data?.Ambient_air_sensor_2_open },
    { tag: "AMBIENT_AIR_SENSOR_2_SHORT", value: data?.Ambient_air_sensor_2_short_circuit },
    { tag: "COLD_AIR_SENSOR_1_OPEN", value: data?.Cold_air_sensor_1_open },
    { tag: "COLD_AIR_SENSOR_1_SHORT", value: data?.Cold_air_sensor_1_short_circuit },
    { tag: "COLD_AIR_SENSOR_2_OPEN", value: data?.Cold_air_sensor_2_open },
    { tag: "COLD_AIR_SENSOR_2_SHORT", value: data?.Cold_air_sensor_2_short_circuit },
    { tag: "AIR_OUTLET_SENSOR_1_OPEN", value: data?.Air_outlet_sensor_1_open },
    { tag: "AIR_OUTLET_SENSOR_1_SHORT", value: data?.Air_outlet_sensor_1_short_circuit },
    { tag: "AIR_OUTLET_SENSOR_2_OPEN", value: data?.Air_outlet_sensor_2_open },
    { tag: "AIR_OUTLET_SENSOR_2_SHORT", value: data?.Air_outlet_sensor_2_short_circuit },
    { tag: "created_at", value: data?.created_at },
  ];

  // GPL-115 Tags
  const gpl_115_faultTags = [
    { tag: "COMPRESSOR_CIRCUIT_BREAKER_FAULT", value: data?.Compressor_circuit_breaker_fault },
    { tag: "CONDENSER_FAN_DOOR_OPEN", value: data?.Condenser_fan_door_open },
    { tag: "BLOWER_DRIVE_FAULT", value: data?.Blower_drive_fault },
    { tag: "BLOWER_CIRCUIT_BREAKER_FAULT", value: data?.Blower_circuit_breaker_fault },
    { tag: "HEATER_CIRCUIT_BREAKER_FAULT", value: data?.Heater_circuit_breaker_fault },
    { tag: "THREE_PHASE_MONITOR_FAULT", value: data?.Three_phase_monitor_fault },
    { tag: "LOW_PRESSURE_FAULT", value: data?.Low_Pressure_Fault },
    { tag: "AMBIENT_TEMP_LOWER_THAN_SET_TEMP", value: data?.Ambient_temp_lower_than_set_temp },
    { tag: "AMBIENT_TEMP_OVER_43C", value: data?.Ambient_temp_Over_43C },
    { tag: "COMPRESSOR_MOTOR_OVERHEAT", value: data?.Compressor_motor_overheat },
    { tag: "HEATER_RCCB_FAULT", value: data?.Heater_RCCB_fault },
    { tag: "LOW_PRESSURE_FAULT_LOCKED", value: data?.Low_pressure_fault_Locked },
    { tag: "ANTI_FREEZE_PROTECTION", value: data?.Anti_Freeze_Protection },
    { tag: "HIGH_PRESSURE_FAULT_LOCKED", value: data?.High_pressure_fault_Locked },
    { tag: "AMBIENT_TEMP_OVER_40C", value: data?.Ambient_temp_Over_40C },
    { tag: "AMBIENT_TEMP_LESS_THAN_4C", value: data?.Ambient_temp_Less_than_4C },
    { tag: "COND_FAN_CIRCUIT_BREAKER_FAULT", value: data?.Cond_Fan_circuit_breaker_fault },
    { tag: "COND_FAN_DRIVE_FAULT", value: data?.Cond_Fan_drive_fault },
    { tag: "COND_FAN_TOP", value: data?.Cond_Fan_TOP },
    { tag: "AMBIENT_TEMP_SENSOR_T2_1_OPEN", value: data?.Ambient_Temp_Sensor_T2_1_Open },
    { tag: "AMBIENT_TEMP_SENSOR_T2_1_SHORT_CIRCUIT", value: data?.Ambient_Temp_Sensor_T2_1_Short_Circuit },
    { tag: "AMBIENT_TEMP_SENSOR_T2_2_OPEN", value: data?.Ambient_Temp_Sensor_T2_2_Open },
    { tag: "AMBIENT_TEMP_SENSOR_T2_2_SHORT_CIRCUIT", value: data?.Ambient_Temp_Sensor_T2_2_Short_Circuit },
    { tag: "AIR_OUTLET_TEMP_SENSOR_T0_1_OPEN", value: data?.Air_Outlet_Temp_Sensor_T0_1_Open },
    { tag: "AIR_OUTLET_TEMP_SENSOR_T0_1_SHORT_CIRCUIT", value: data?.Air_Outlet_Temp_Sensor_T0_1_Short_Circuit },
    { tag: "AIR_OUTLET_TEMP_SENSOR_T0_2_OPEN", value: data?.Air_Outlet_Temp_Sensor_T0_2_Open },
    { tag: "AIR_OUTLET_TEMP_SENSOR_T0_2_SHORT_CIRCUIT", value: data?.Air_Outlet_Temp_Sensor_T0_2_Short_Circuit },
    { tag: "COLD_AIR_TEMP_SENSOR_T1_1_OPEN", value: data?.Cold_Air_Temp_Sensor_T1_1_Open },
    { tag: "COLD_AIR_TEMP_SENSOR_T1_1_SHORT_CIRCUIT", value: data?.Cold_Air_Temp_Sensor_T1_1_Short_Circuit },
    { tag: "COLD_AIR_TEMP_SENSOR_T1_2_OPEN", value: data?.Cold_Air_Temp_Sensor_T1_2_Open },
    { tag: "COLD_AIR_TEMP_SENSOR_T1_2_SHORT_CIRCUIT", value: data?.Cold_Air_Temp_Sensor_T1_2_Short_Circuit },
    { tag: "AIR_AFTER_HEATER_TEMP_SENSOR_TH_1_OPEN", value: data?.Air_After_Heater_Temp_Sensor_TH_1_Open },
    { tag: "AIR_AFTER_HEATER_TEMP_SENSOR_TH_1_SHORT_CIRCUIT", value: data?.Air_After_Heater_Temp_Sensor_TH_1_Short_Circuit },
    { tag: "AIR_AFTER_HEATER_TEMP_SENSOR_TH_2_OPEN", value: data?.Air_After_Heater_Temp_Sensor_TH_2_Open },
    { tag: "AIR_AFTER_HEATER_TEMP_SENSOR_TH_2_SHORT_CIRCUIT", value: data?.Air_After_Heater_Temp_Sensor_TH_2_Short_Circuit },
    { tag: "HIGH_PRESSURE_FAULT", value: data?.High_Pressure_Fault },
    { tag: "HEATER_TOP_FAULT", value: data?.Heater_TOP_fault },
    { tag: "HEATER_DRIVE_FAULT", value: data?.Heater_drive_Fault },
    { tag: "TH_TEMP_MORE_THAN_50C", value: data?.TH_Temp_more_than_50C },
    { tag: "DELTA_NOT_ACHIEVED_IN_AERATION_MODE", value: data?.Delta_not_achieved_in_aeration_mode },
    { tag: "WARNING_LP_TRANSDUCER_FAILURE", value: data?.Warning_LP_transducer_failure },
    { tag: "WARNING_HP_TRANSDUCER_FAILURE", value: data?.Warning_HP_transducer_failure },
    { tag: "created_at", value: data?.created_at },
  ];

  // Machine type detection
  const s7_200_machines = [
    "GTPL-108-gT-40E-P-S7-200",
    "GTPL-109-gT-40E-P-S7-200", 
    "GTPL-110-gT-40E-P-S7-200",
    "GTPL-111-gT-80E-P-S7-200",
    "GTPL-112-gT-80E-P-S7-200",
    "GTPL-113-gT-80E-P-S7-200",
    "GTPL-118-gT-80E-P-S7-200",
  ];

  const s7_1200_machines = [
    "GTPL-114-gT-140E-S7-1200",
    "GTPL-115-gT-180E-S7-1200",
    "GTPL-116-gT-240E-S7-1200",
    "GTPL-119-gT-180E-S7-1200",
    "GTPL-120-gT-180E-S7-1200",
    "GTPL-121-gT-1000T-S7-1200",
    "GTPL-122-gT-1000T-S7-1200",
    "Gtpl-S7-1200-02",
  ];

  const gpl_115_machines = ["GTPL-115-gT-180E-S7-1200", "GTPL-117-gT-320E-S7-1200"];

  // Determine machine type based on ID
  const normalizedId = id?.toString().toUpperCase() || "";
  
  const isGPL_115 = gpl_115_machines.some((machine) =>
    normalizedId.includes(machine.toUpperCase())
  );

  const isS7_200 = s7_200_machines.some((machine) =>
    normalizedId.includes(machine.toUpperCase())
  );

  const isS7_1200 = s7_1200_machines.some((machine) =>
    normalizedId.includes(machine.toUpperCase())
  );

  const modelType = isGPL_115
    ? "GPL-115" 
    : isS7_200
    ? s7_200_machines.find((m) => normalizedId.includes(m.toUpperCase())) || "S7-200"
    : s7_1200_machines.find((m) => normalizedId.includes(m.toUpperCase())) || "S7-1200";

  // Define faultCodes and currentTags based on model type
  const faultCodes = isGPL_115
    ? gpl_115_faultCodes
    : isS7_200
    ? s7_200_faultCodes
    : s7_1200_faultCodes;

  const currentTags = isGPL_115
    ? gpl_115_faultTags
    : isS7_200
    ? s7_200_tags
    : s7_1200_tags;

  // Function to get status color based on value
  const getStatusColor = (value: any) => {
    if (value === "fa" || value === false) {
      return "#22C55E"; // Green color
    } else if (value === "tr" || value === true) {
      return "#EF4444"; // Red color
    } else {
      return "#6B7280"; // Gray color for undefined/null values
    }
  };

  // Function to get status text
  const getStatusText = (value: any) => {
    if (value === "fa" || value === false) {
      return "FALSE";
    } else if (value === "tr" || value === true) {
      return "TRUE";
    } else {
      return "N/A";
    }
  };

  // Function to check if tag is active
  const isActiveTag = (value: any) => {
    if (!value) return false;
    const normalized = value.toString().toLowerCase();
    return normalized === "true" || normalized === "tr";
  };

  // Function to format created date
  const formatDate = (dateString: any) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      return date.toLocaleString();
    } catch (error) {
      return "Invalid Date";
    }
  };

  // Handle fault code selection
  const handleViewFaultCode = (faultItem: any) => {
    setSelectedFault(faultItem);
    setCurrentView('details');
  };

  // Render fault code details view
  const renderFaultDetails = () => {
    if (!selectedFault) return null;

    return (
      <View style={styles.container}>
        <Text style={styles.title}>FAULT CODE DETAILS - {modelType}</Text>
        <Text style={styles.subtitle}>
          Code {selectedFault.code}: {selectedFault.description}
        </Text>

        <View style={styles.detailsCard}>
          <Text style={styles.sectionTitle}>Fault Information</Text>
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>
              <Text style={styles.infoLabel}>Fault Code:</Text> {selectedFault.code}
            </Text>
            <Text style={styles.infoText}>
              <Text style={styles.infoLabel}>Description:</Text> {selectedFault.description}
            </Text>
            <Text style={styles.infoText}>
              <Text style={styles.infoLabel}>Model:</Text> {modelType}
            </Text>
            <Text style={styles.infoText}>
              <Text style={styles.infoLabel}>Timestamp:</Text> {new Date().toLocaleString()}
            </Text>
          </View>

          {/* Active Tags for this fault */}
          <Text style={styles.sectionTitle}>Active System Tags</Text>
          <ScrollView style={styles.tagsScrollView}>
            {currentTags
              .filter((tag) => isActiveTag(tag.value))
              .map((tag, index) => (
                <View key={index} style={styles.tagItem}>
                  <Text style={styles.tagName}>{tag.tag}</Text>
                  <View style={styles.tagStatus}>
                    <View style={[
                      styles.statusIndicator,
                      { backgroundColor: getStatusColor(tag.value) }
                    ]} />
                    <Text style={[
                      styles.tagValue,
                      { color: getStatusColor(tag.value) }
                    ]}>
                      {getStatusText(tag.value)}
                    </Text>
                  </View>
                </View>
              ))}
            {currentTags.filter((tag) => isActiveTag(tag.value)).length === 0 && (
              <Text style={styles.noDataText}>No active tags found</Text>
            )}
          </ScrollView>
        </View>

        <TouchableOpacity style={styles.backButton} onPress={() => setCurrentView('codes')}>
          <Text style={styles.backButtonText}>← BACK TO FAULT CODES</Text>
        </TouchableOpacity>
      </View>
    );
  };

  // Render fault logs view
  const renderFaultLogs = () => {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>ACTIVE ALARMS - {modelType}</Text>
        <Text style={styles.subtitle}>Real-time fault status monitoring</Text>

        {/* Toggle View Buttons */}
        <View style={styles.toggleContainer}>
          <TouchableOpacity 
            style={[styles.toggleButton, currentView === 'codes' && styles.activeToggleButton]}
            onPress={() => setCurrentView('codes')}
          >
            <Text style={[styles.toggleButtonText, currentView === 'codes' && styles.activeToggleButtonText]}>
              Fault Codes
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.toggleButton, currentView === 'logs' && styles.activeToggleButton]}
            onPress={() => setCurrentView('logs')}
          >
            <Text style={[styles.toggleButtonText, currentView === 'logs' && styles.activeToggleButtonText]}>
              Active Alarms
            </Text>
          </TouchableOpacity>
        </View>

        {/* Date and Time Header */}
        <View style={styles.dateHeader}>
          <Text style={styles.dateText}>
            Last Updated: {formatDate(data?.created_at)}
          </Text>
        </View>

        {/* Active Tags List */}
        <ScrollView style={styles.logsScrollView}>
          {currentTags
            .filter((tag) => isActiveTag(tag.value))
            .map((tag, index) => (
              <View key={index} style={[
                styles.logItem,
                { backgroundColor: getStatusColor(tag.value) + '20' }
              ]}>
                <View style={styles.logItemContent}>
                  <Text style={styles.tagName}>{tag.tag}</Text>
                  <View style={styles.statusContainer}>
                    <View style={[
                      styles.statusIndicator,
                      { backgroundColor: getStatusColor(tag.value) }
                    ]} />
                    <Text style={[
                      styles.tagStatus,
                      { color: getStatusColor(tag.value) }
                    ]}>
                      {getStatusText(tag.value)}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          {currentTags.filter((tag) => isActiveTag(tag.value)).length === 0 && (
            <View style={styles.noAlarmsContainer}>
              <Text style={styles.noAlarmsText}>✅ No Active Alarms</Text>
              <Text style={styles.noAlarmsSubtext}>System is operating normally</Text>
            </View>
          )}
        </ScrollView>

        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>← BACK</Text>
        </TouchableOpacity>
      </View>
    );
  };

  // Render fault codes view
  const renderFaultCodes = () => {
    const mid = Math.ceil(faultCodes.length / 2);
    const leftCodes = faultCodes.slice(0, mid);
    const rightCodes = faultCodes.slice(mid);

    return (
      <View style={styles.container}>
        <Text style={styles.title}>FAULT CODES - {modelType}</Text>
        <Text style={styles.subtitle}>
          System fault codes and descriptions for {modelType} model
        </Text>

        {/* Toggle View Buttons */}
        <View style={styles.toggleContainer}>
          <TouchableOpacity 
            style={[styles.toggleButton, currentView === 'codes' && styles.activeToggleButton]}
            onPress={() => setCurrentView('codes')}
          >
            <Text style={[styles.toggleButtonText, currentView === 'codes' && styles.activeToggleButtonText]}>
              Fault Codes
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.toggleButton, currentView === 'logs' && styles.activeToggleButton]}
            onPress={() => setCurrentView('logs')}
          >
            <Text style={[styles.toggleButtonText, currentView === 'logs' && styles.activeToggleButtonText]}>
              Active Alarms
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.columnsContainer}>
            <View style={styles.column}>
              <Text style={styles.columnHeader}>Codes 1-{mid}</Text>
              {leftCodes.map((item: any, index: any) => (
                <View key={`${item.code}-${index}`} style={styles.codeItem}>
                  <Text style={styles.codeNumber}>{item.code}.</Text>
                  <View style={styles.codeContent}>
                    <Text style={styles.codeText}>{item.description}</Text>
                    <TouchableOpacity 
                      style={styles.viewButton}
                      onPress={() => handleViewFaultCode(item)}
                    >
                      <Text style={styles.viewButtonText}>View</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>

            <View style={styles.column}>
              <Text style={styles.columnHeader}>Codes {mid + 1}-{faultCodes.length}</Text>
              {rightCodes.map((item: any, index: any) => (
                <View key={`${item.code}-${index}`} style={styles.codeItem}>
                  <Text style={styles.codeNumber}>{item.code}.</Text>
                  <View style={styles.codeContent}>
                    <Text style={styles.codeText}>{item.description}</Text>
                    <TouchableOpacity 
                      style={styles.viewButton}
                      onPress={() => handleViewFaultCode(item)}
                    >
                      <Text style={styles.viewButtonText}>View</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>

        <View style={styles.actionContainer}>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>📄 Export Codes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>📤 Print List</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>← BACK</Text>
        </TouchableOpacity>
      </View>
    );
  };

  // Main render logic
  if (currentView === 'details') {
    return renderFaultDetails();
  } else if (currentView === 'logs') {
    return renderFaultLogs();
  } else {
    return renderFaultCodes();
  }
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
    marginBottom: 8,
    color: "#fff",
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 16,
    color: "#9CA3AF",
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
    paddingVertical: 8,
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
  codeContent: {
    flex: 1,
    marginLeft: 8,
  },
  codeText: {
    fontSize: 12,
    color: "#DDDDDD",
    lineHeight: 16,
    marginBottom: 4,
  },
  viewButton: {
    backgroundColor: "#3B82F6",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: "flex-start",
  },
  viewButtonText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "600",
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
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
  logsScrollView: {
    flex: 1,
    marginBottom: 16,
  },
  tagsScrollView: {
    maxHeight: 300,
    marginBottom: 16,
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
  tagItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginVertical: 2,
    backgroundColor: "#1A1A1A",
    borderRadius: 6,
  },
  tagName: {
    fontSize: 12,
    color: "#DDDDDD",
    fontWeight: "500",
    flex: 1,
    marginRight: 12,
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  tagStatus: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  tagValue: {
    fontSize: 12,
    fontWeight: "600",
    minWidth: 50,
    textAlign: "right",
  },
  tagStatus: {
    fontSize: 12,
    fontWeight: "600",
    minWidth: 50,
    textAlign: "right",
  },
  noAlarmsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },
  noAlarmsText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#10B981",
    marginBottom: 8,
  },
  noAlarmsSubtext: {
    fontSize: 14,
    color: "#6B7280",
  },
  noDataText: {
    textAlign: "center",
    color: "#6B7280",
    fontSize: 14,
    paddingVertical: 20,
  },
  detailsCard: {
    backgroundColor: "#1A1A1A",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#3B82F6",
    marginBottom: 12,
  },
  infoContainer: {
    marginBottom: 16,
  },
  infoText: {
    fontSize: 14,
    color: "#DDDDDD",
    marginBottom: 8,
  },
  infoLabel: {
    fontWeight: "600",
    color: "#FFFFFF",
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