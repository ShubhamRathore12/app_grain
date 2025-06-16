import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";

export default function DeviceLayout() {
  const [blockedScreens, setBlockedScreens] = useState<string[] | null>(null);

  useEffect(() => {
    const loadMonitorAccess = async () => {
      try {
        const stored = await AsyncStorage.getItem("monitorAccess");
        const parsed = stored ? JSON.parse(stored) : [];
        if (Array.isArray(parsed)) {
          setBlockedScreens(parsed.map((s) => s.trim()));
        } else {
          setBlockedScreens([]);
        }
      } catch (e) {
        console.error("Failed to load monitorAccess:", e);
        setBlockedScreens([]);
      }
    };

    loadMonitorAccess();
  }, []);

  if (blockedScreens === null) return null; // ⏳ Wait for AsyncStorage

  // List of all possible device-related screens
  const allScreens = [
    "AutoView",
    "InputView",
    "AnalogView",
    "OutputView",
    "AerationView",
    "AerationControlView",
    "CurrentFaultsView",
    "FaultCodeView",
    "TestSelectionView",
    "Test1ControlView",
    "Test2ControlView",
    "DefaultsView",
    "DateTimeView",
    "LoggingSettingsView",
    "OperatingHoursView",
  ];

  // Filter out blocked screens
  const allowedScreens = allScreens.filter(
    (screen) => !blockedScreens.includes(screen)
  );

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
      }}
    >
      {/* Always allow root screen */}
      <Stack.Screen name="[id]" />

      {/* Only allow screens NOT in monitorAccess */}
      {allowedScreens.map((screen) => (
        <Stack.Screen key={screen} name={screen} />
      ))}
    </Stack>
  );
}
