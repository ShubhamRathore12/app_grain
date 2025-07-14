import { useMachineData } from "@/hooks/useMachineData";
import { useEffect, useRef, useState } from "react";
import {
    Animated,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

// Import images
const plc1 = require("@/assets/images/aerationheating-Photoroom.png");
const plc2 = require("@/assets/images/aerationwithheating-Photoroom.png");
const plc3 = require("@/assets/images/1200aerationheating-Photoroom.png");
const plc4 = require("@/assets/images/1200aerationwihtout-Photoroom.png");

export default function AerationControlView({
  mode,
  onBack,
  deviceId,
}: {
  mode: "WITHOUT_HEATING" | "WITH_HEATING";
  onBack: () => void;
  deviceId: any;
}) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [showMore, setShowMore] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  const { data, error, isConnected } = useMachineData({
    url:
    deviceId == 2
        ? `https://new-plc-software-5xyc.vercel.app/api/alldata/alldata`
        : `https://new-plc-software-5xyc.vercel.app/api/ws/current-data`,
  });

  // Mock data - replace with actual data hooks when available
  const mockData = {
    AI_TH_Act: data?.AI_TH_Act || data?.AFTER_HEATER_TEMP_Th,
    HEATING_MODE_Continuous_Mode: 1,
    AI_AMBIANT_TEMP: data?.AI_AMBIANT_TEMP || data?.AMBIENT_AIR_TEMP_T2,
    Value_to_Display_EVAP_ACT_SPEED: data?.Value_to_Display_EVAP_ACT_SPEED ||data?.BLOWER_RPM,
    HEATING_MODE_SET_TH_FOR_HEATING_MODE: 5.0,
  };

  useEffect(() => {
    console.log("=== AERATION CONTROL VIEW MOUNTED ===");
    console.log("Mode:", mode);
    console.log("Device ID:", deviceId);

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const getImageSource = () => {
    try {
      if (mode === "WITHOUT_HEATING") {
        return deviceId == 1 ? plc4 : plc2;
      } else {
        return deviceId == 1 ? plc3 : plc1;
      }
    } catch (error) {
      console.error("Error loading image:", error);
      return null;
    }
  };

  const getDeviceDetails = () => {
    if (deviceId == 1 && mode === "WITHOUT_HEATING") {
      return {
        model: "GTPL-109",
        description: "1200L Aeration Without Heating",
      };
    } else if (deviceId == 1 && mode === "WITH_HEATING") {
      return { model: "GTPL-110", description: "1200L Aeration With Heating" };
    } else if (deviceId == 2 && mode === "WITHOUT_HEATING") {
      return {
        model: "GTPL-209",
        description: "1000L Aeration Without Heating",
      };
    } else {
      return { model: "GTPL-210", description: "1000L Aeration With Heating" };
    }
  };

  const formatValue = (value: any) => {
    if (value === null || value === undefined) return "0";
    return String(value);
  };

  const handleStart = () => {
    setIsRunning(true);
    console.log(`Starting aeration ${mode} for device ${deviceId}`);
  };

  const handleStop = () => {
    setIsRunning(false);
    console.log(`Stopping aeration for device ${deviceId}`);
  };

  const { model, description } = getDeviceDetails();
  const imageSource = getImageSource();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Text style={styles.header}>
        AERATION {mode === "WITH_HEATING" ? "WITH HEATING" : "WITHOUT HEATING"}
      </Text>

      <View style={styles.imageContainer}>
        {imageSource && (
          <Image
            source={imageSource}
            style={styles.image}
            resizeMode="contain"
          />
        )}

        {/* Animated Info Card */}
        <Animated.View style={[styles.infoCard, { opacity: fadeAnim }]}>
          <Text style={styles.infoTitle}>Device Information</Text>
          <Text style={styles.infoText}>Model: {model}</Text>
          <Text style={styles.infoText}>Description: {description}</Text>
          <Text style={styles.infoText}>
            Mode: {mode === "WITH_HEATING" ? "With Heating" : "Without Heating"}
          </Text>
          <Text style={styles.infoText}>Device ID: {deviceId}</Text>

          {/* Status Indicator */}
          <View style={styles.statusContainer}>
            <Text style={styles.statusLabel}>Status:</Text>
            <View
              style={[
                styles.statusIndicator,
                { backgroundColor: isConnected ? "#10B981" : "#EF4444" },
              ]}
            >
              <Text style={styles.statusText}>
                {isConnected ? "RUNNING" : "STOPPED"}
              </Text>
            </View>
          </View>

          {/* Important fields always shown */}
          <View style={styles.row}>
            <Text style={styles.tempLabel}>TH</Text>
            <TextInput
              style={styles.tempInput}
              value={formatValue(mockData?.AI_TH_Act) ?? "0"}
              editable={false}
            />
            <Text style={styles.unit}>°C</Text>
          </View>

          <Text style={styles.sectionTitle}>Running Time</Text>
          <View style={styles.runningTime}>
            <TextInput style={styles.durationBox} value="0" editable={false} />
            <Text>HOURS</Text>
            <TextInput
              style={styles.durationBox}
              value={String(
                mode == "WITH_HEATING"
                   && data?.Running_HOURS1
              ).padStart(2, "0")}
              editable={false}
            />
            <Text>MINUTES</Text>
            <TextInput
              style={styles.durationBox}
              value={String(
                mode == "WITH_HEATING"
                 && data?.Running_MINUTES1
              ).padStart(2, "0")}
              editable={false}
            />
          </View>

          {/* Show more fields when toggled */}
          {showMore && (
            <>
              {/* Set Duration */}
              <View style={styles.modeRow}>
                <View style={styles.durationSet}>
                  <Text>Set Duration</Text>
                  <TextInput
                    style={styles.durationValue}
                    value={data?.SET_DURATION}
                    editable={false}
                  />
                  <Text>h</Text>
                </View>
              </View>

              {/* T2 */}
              <View style={styles.tempRow}>
                <Text style={styles.tempLabel}>T2</Text>
                <TextInput
                  style={styles.tempInput}
                  value={formatValue(
                    mode == "WITHOUT_HEATING"
                       && data?.AI_AMBIANT_TEMP || data?.AMBIENT_AIR_TEMP_T2
                  )}
                  editable={false}
                />
                <Text style={styles.unit}>°C</Text>
              </View>

              {/* Blower */}
              <View style={styles.blowerBox}>
                <Text style={styles.label}>BLOWER</Text>
                <TextInput
                  style={styles.percentBox}
                  value={`${formatValue(
                    mode == "WITHOUT_HEATING"
                     && data?.Value_to_Display_EVAP_ACT_SPEED ||data?.BLOWER_RPM
                  )}%`}
                  editable={false}
                />
              </View>

              {((mode === "WITH_HEATING" && deviceId != 2) ||
                (deviceId == 2 && mode === "WITHOUT_HEATING")) && (
                <View style={styles.row}>
                  <Text style={styles.tempLabel}>Delta</Text>
                  <TextInput
                    style={styles.tempInput}
                    value={formatValue(
                    data?.DELTA_SET
                    )}
                    editable={false}
                  />
                  <Text style={styles.unit}>°C</Text>
                </View>
              )}

              {deviceId == 1 && (
                <TouchableOpacity
                  style={[styles.actionButton, { backgroundColor: "#F59E0B" }]}
                >
                  <Text style={[styles.actionButtonText, { color: "#000" }]}>
                    Continuous Mode
                  </Text>
                </TouchableOpacity>
              )}
            </>
          )}

          {/* Show More/Less Toggle Button */}
          <TouchableOpacity
            style={styles.showMoreButton}
            onPress={() => setShowMore(!showMore)}
          >
            <Text style={styles.showMoreText}>
              {showMore ? "Show Less ▲" : "Show More ▼"}
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </View>

      {/* Start / Stop Buttons */}
      <View style={styles.controlRow}>
        <TouchableOpacity
          style={[
            styles.actionButton,
            { backgroundColor: isConnected ? "#6B7280" : "#10B981" },
          ]}
          onPress={handleStart}
          disabled={isConnected}
        >
          <Text style={styles.actionButtonText}>AERATION START</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.actionButton,
            { backgroundColor: !isConnected ? "#6B7280" : "#EF4444" },
          ]}
          onPress={handleStop}
          disabled={!isConnected}
        >
          <Text style={styles.actionButtonText}>AERATION STOP</Text>
        </TouchableOpacity>
      </View>

      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Text style={styles.backText}>← BACK</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#1F2937",
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 8,
  },
  infoCard: {
    marginTop: 10,
    padding: 15,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    width: "90%",
    alignSelf: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  infoTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 8,
    textAlign: "center",
    color: "#1F2937",
  },
  infoText: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 5,
    color: "#4B5563",
  },
  statusContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    gap: 8,
  },
  statusLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
  },
  statusIndicator: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
  },
  label: {
    fontWeight: "bold",
    marginBottom: 8,
    color: "#1F2937",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    justifyContent: "center",
  },
  controlRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    gap: 10,
  },
  tempLabel: {
    fontSize: 16,
    color: "#1F2937",
    fontWeight: "500",
  },
  tempInput: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    padding: 8,
    width: 60,
    textAlign: "center",
    marginHorizontal: 8,
    borderRadius: 4,
    backgroundColor: "#F9FAFB",
    color: "#1F2937",
  },
  unit: {
    fontSize: 16,
    color: "#1F2937",
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 5,
    padding: 12,
    alignItems: "center",
    borderRadius: 8,
  },
  actionButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    textAlign: "center",
    color: "#1F2937",
  },
  runningTime: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    gap: 8,
    justifyContent: "center",
  },
  durationBox: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    width: 50,
    padding: 6,
    textAlign: "center",
    marginHorizontal: 4,
    borderRadius: 4,
    backgroundColor: "#F9FAFB",
    color: "#1F2937",
  },
  modeRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  durationSet: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  durationValue: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    padding: 6,
    width: 40,
    textAlign: "center",
    borderRadius: 4,
    backgroundColor: "#F9FAFB",
    color: "#1F2937",
  },
  tempRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    gap: 8,
    justifyContent: "center",
  },
  blowerBox: {
    flexDirection: "column",
    alignItems: "center",
    gap: 8,
    marginBottom: 10,
  },
  percentBox: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    padding: 8,
    width: 60,
    textAlign: "center",
    borderRadius: 4,
    backgroundColor: "#F9FAFB",
    color: "#1F2937",
  },
  backButton: {
    alignSelf: "flex-start",
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#6B7280",
    borderRadius: 8,
    marginTop: 10,
  },
  backText: {
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  showMoreButton: {
    marginTop: 10,
    alignSelf: "center",
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: "#E5E7EB",
    borderRadius: 6,
  },
  showMoreText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1F2937",
  },
});
