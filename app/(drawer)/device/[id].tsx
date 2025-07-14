"use client";
import { useMachineData } from '@/hooks/useMachineData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Animated,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AerationControlView from "./AerationControlView";
import AerationView from "./AerationView";
import AnalogView from "./AnalogView";
import AutoView from "./AutoView";
import CurrentFaultsView from "./CurrentFaultsView";
import DateTimeView from "./DateTimeView";
import DefaultsView from "./DefaultsView";
import FaultCodeView from "./FaultCodeView";
import InputView from "./InputView";
import LoggingSettingsView from "./LoggingSettingsView";
import OperatingHoursView from "./OperatingHoursView";
import OutputView from "./OutputView";
import Test1ControlView from "./Test1ControlView";
import Test2ControlView from "./Test2ControlView";
import TestSelectionView from "./TestSelectionView";

const settingsOptions = [
  "DEFAULTS",
  "DATE & TIME",
  "DATA LOG",
  "OPERATING HOURS",
];

export default function DeviceDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [currentView, setCurrentView] = useState("menu");
  const [selectedSetting, setSelectedSetting] = useState<string | null>(null);
  const [animations] = useState(
    settingsOptions.map(() => new Animated.Value(1))
  );

  console.log({id});
  

  // Screen blocking state
  const [blockedScreens, setBlockedScreens] = useState<string[] | null>(null);

  const { data, error, isConnected } = useMachineData({
    url:
      String(id) === "2"
        ? `https://new-plc-software-5xyc.vercel.app/api/alldata/alldata`
        : `https://new-plc-software-5xyc.vercel.app/api/ws/current-data`,
  });
  

  const [defaultsData, setDefaultsData] = useState({
    T1: data?.T1_SET_POINT,
    THT1: data?.Th_T1,
    deltaA: data?.DELTA_SET,
    hp: data?.HP_SET_POINT,
    autoAeration: data?.AUTO_AERATION_TIME
  });

  const [plcDateTime, setPlcDateTime] = useState({
    year: data?.W_YY,
    month: data?.W_MM,
    day: data?.W_DD,
    hour: data?.W_HR,
    minute: data?.W_MIN,
    second: data?.W_SEC,
  });

  const [logInterval, setLogInterval] = useState(data?.Data_Logg_Timer);
  const [operatingTime, setOperatingTime] = useState({ hours: data?.RUNNING_HOURS, minutes: data?.RUNNING_MINUTES });

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

  // Load monitor access settings
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

  // Helper function to check if a screen is blocked
  const isScreenBlocked = (screenName: string): boolean => {
    if (!blockedScreens) return false;
    return blockedScreens.includes(screenName);
  };

  // Helper function to check if navigation should be blocked
  const shouldBlockNavigation = (viewName: string): boolean => {
    const screenMapping: { [key: string]: string } = {
      "auto": "AutoView",
      "input": "InputView",
      "analog": "AnalogView", 
      "output": "OutputView",
      "aeration_menu": "AerationView",
      "aeration_without": "AerationControlView",
      "aeration_with": "AerationControlView",
      "fault": "CurrentFaultsView",
      "fault_code": "FaultCodeView",
      "test": "TestSelectionView",
      "test1": "Test1ControlView",
      "test2": "Test2ControlView",
    };

    const screenName = screenMapping[viewName];
    return screenName ? isScreenBlocked(screenName) : false;
  };

  // Helper function to check if settings view should be blocked
  const shouldBlockSetting = (settingName: string): boolean => {
    const settingMapping: { [key: string]: string } = {
      "DEFAULTS": "DefaultsView",
      "DATE & TIME": "DateTimeView",
      "DATA LOG": "LoggingSettingsView",
      "OPERATING HOURS": "OperatingHoursView",
    };

    const screenName = settingMapping[settingName];
    return screenName ? isScreenBlocked(screenName) : false;
  };

  // Don't return early - this causes hook order issues

  const fetchOperatingHours = async () => {
    try {
      const response = await Promise.resolve({ hours: 10, minutes: 25 });
      setOperatingTime(response);
    } catch {
      setOperatingTime({ hours: 0, minutes: 0 });
    }
  };

  const resetOperatingHours = async () => {
    try {
      await Promise.resolve();
      setOperatingTime({ hours: 0, minutes: 0 });
    } catch (e) {
      console.error("Reset failed", e);
    }
  };

  useEffect(() => {
    console.log("=== DEVICE DETAILS SCREEN MOUNTED ===");
    console.log("Device ID:", id);
    console.log("Current View:", currentView);
    console.log("Blocked Screens:", blockedScreens);
  }, [id, currentView, blockedScreens]);

  useEffect(() => {
    if (selectedSetting === "OPERATING HOURS" && !shouldBlockSetting("OPERATING HOURS")) {
      fetchOperatingHours();
    }
  }, [selectedSetting]);

  useEffect(() => {
    if (selectedSetting === "DEFAULTS" && !shouldBlockSetting("DEFAULTS")) {
      fetchDefaultsData();
    } else if (selectedSetting === "DATE & TIME" && !shouldBlockSetting("DATE & TIME")) {
      fetchDateTime();
    } else if (selectedSetting === "DATA LOG" && !shouldBlockSetting("DATA LOG")) {
      fetchLogInterval();
    }
  }, [selectedSetting]);

  const fetchDefaultsData = async () => {
    try {
      const response = await Promise.resolve({
        T1: 1,
        THT1: 0,
        deltaA: 0,
        hp: 0,
        autoAeration: 1,
      });
      setDefaultsData(response);
    } catch (error) {
      console.error("Error fetching defaults:", error);
    }
  };

  const fetchDateTime = async () => {
    try {
      const response = await Promise.resolve({
        year: 2025,
        month: 4,
        day: 25,
        hour: 14,
        minute: 30,
        second: 45,
      });
      setPlcDateTime(response);
    } catch (err) {
      console.error("Failed to fetch date & time", err);
      setPlcDateTime({
        year: 0,
        month: 0,
        day: 0,
        hour: 0,
        minute: 0,
        second: 0,
      });
    }
  };

  const fetchLogInterval = async () => {
    try {
      const response = await Promise.resolve({ logInterval: 5 });
      setLogInterval(response.logInterval);
    } catch (err) {
      setLogInterval(0);
    }
  };

  const handleSettingSelect = (item: string, index: number) => {
    // Check if this setting screen is blocked
    if (shouldBlockSetting(item)) {
      console.log(`Access blocked for setting: ${item}`);
      return;
    }

    setSelectedSetting(item);
    Animated.sequence([
      Animated.timing(animations[index], {
        toValue: 1.1,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(animations[index], {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleMenuItemPress = (viewId: string) => {
    // Check if this view is blocked
    if (shouldBlockNavigation(viewId)) {
      console.log(`Access blocked for view: ${viewId}`);
      return;
    }

    setCurrentView(viewId);
  };

  const renderSettingsView = () => {
    if (selectedSetting === "DEFAULTS" && !shouldBlockSetting("DEFAULTS"))
      return (
        <DefaultsView
          defaultsData={defaultsData}
          onBack={() => setSelectedSetting(null)}
        />
      );
    if (selectedSetting === "DATE & TIME" && !shouldBlockSetting("DATE & TIME"))
      return (
        <DateTimeView
          plcDateTime={plcDateTime}
          onBack={() => setSelectedSetting(null)}
        />
      );
    if (selectedSetting === "DATA LOG" && !shouldBlockSetting("DATA LOG"))
      return (
        <LoggingSettingsView
          logInterval={logInterval}
          onBack={() => setSelectedSetting(null)}
        />
      );
    if (selectedSetting === "OPERATING HOURS" && !shouldBlockSetting("OPERATING HOURS"))
      return (
        <OperatingHoursView
          operatingTime={operatingTime}
          onReset={resetOperatingHours}
          onBack={() => setSelectedSetting(null)}
        />
      );

    return (
      <View style={styles.contentContainer}>
        <Text style={styles.settingsTitle}>SETTINGS</Text>
        <View style={styles.settingsGrid}>
          {settingsOptions.map((item, index) => {
            const isBlocked = shouldBlockSetting(item);
            return (
              <Animated.View
                key={index}
                style={[
                  { transform: [{ scale: animations[index] }] },
                  styles.settingsButton,
                  selectedSetting === item && styles.settingsButtonActive,
                  isBlocked && styles.settingsButtonBlocked,
                ]}
              >
                <TouchableOpacity
                  style={{ 
                    width: "100%", 
                    alignItems: "center",
                    opacity: isBlocked ? 0.5 : 1
                  }}
                  onPress={() => handleSettingSelect(item, index)}
                  disabled={isBlocked}
                >
                  <Text style={[
                    styles.settingsButtonText,
                    isBlocked && styles.settingsButtonTextBlocked
                  ]}>
                    {item}
                    {isBlocked && " 🔒"}
                  </Text>
                </TouchableOpacity>
              </Animated.View>
            );
          })}
        </View>
      </View>
    );
  };

  // Show loading state while AsyncStorage loads
  if (blockedScreens === null) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.headerBackButton}
            onPress={() => router.back()}
          >
            <Text style={styles.headerBackText}>← BACK</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Loading...</Text>
        </View>
        <View style={[styles.contentContainer, { justifyContent: 'center', alignItems: 'center', flex: 1 }]}>
          <Text style={{ fontSize: 16, color: '#6B7280' }}>Loading access permissions...</Text>
        </View>
      </View>
    );
  }

  const renderContent = () => {
    switch (currentView) {
      case "settings":
        return renderSettingsView();
      case "aeration_menu":
        if (shouldBlockNavigation("aeration_menu")) {
          setCurrentView("menu");
          return null;
        }
        return (
          <AerationView
            onWithoutHeating={() => {
              if (!shouldBlockNavigation("aeration_without")) {
                setCurrentView("aeration_without");
              }
            }}
            onWithHeating={() => {
              if (!shouldBlockNavigation("aeration_with")) {
                setCurrentView("aeration_with");
              }
            }}
            onBack={() => setCurrentView("menu")}
          />
        );
      case "aeration_without":
        if (shouldBlockNavigation("aeration_without")) {
          setCurrentView("aeration_menu");
          return null;
        }
        return (
          <AerationControlView
            mode="WITHOUT_HEATING"
            onBack={() => setCurrentView("aeration_menu")}
            deviceId={id}
          />
        );
      case "aeration_with":
        if (shouldBlockNavigation("aeration_with")) {
          setCurrentView("aeration_menu");
          return null;
        }
        return (
          <AerationControlView
            mode="WITH_HEATING"
            onBack={() => setCurrentView("aeration_menu")}
            deviceId={id}
          />
        );
      case "input":
        if (shouldBlockNavigation("input")) {
          setCurrentView("menu");
          return null;
        }
        return (
          <InputView
            onBack={() => setCurrentView("menu")}
            onAnalog={() => {
              if (!shouldBlockNavigation("analog")) {
                setCurrentView("analog");
              }
            }}
            onOutput={() => {
              if (!shouldBlockNavigation("output")) {
                setCurrentView("output");
              }
            }}
          />
        );
      case "analog":
        if (shouldBlockNavigation("analog")) {
          setCurrentView("input");
          return null;
        }
        return <AnalogView onBack={() => setCurrentView("input")} data={data} />;
      case "output":
        if (shouldBlockNavigation("output")) {
          setCurrentView("input");
          return null;
        }
        return <OutputView onBack={() => setCurrentView("input")} />;
      case "auto":
        if (shouldBlockNavigation("auto")) {
          setCurrentView("menu");
          return null;
        }
        return <AutoView onBack={() => setCurrentView("menu")} id={id} />;
      case "fault":
        if (shouldBlockNavigation("fault")) {
          setCurrentView("menu");
          return null;
        }
        return (
          <CurrentFaultsView
            onBack={() => setCurrentView("menu")}
            onFaultCode={() => {
              if (!shouldBlockNavigation("fault_code")) {
                setCurrentView("fault_code");
              }
            }}
          />
        );
      case "fault_code":
        if (shouldBlockNavigation("fault_code")) {
          setCurrentView("fault");
          return null;
        }
        return <FaultCodeView onBack={() => setCurrentView("fault")} data={data} id={id}/>;
      case "test":
        if (shouldBlockNavigation("test")) {
          setCurrentView("menu");
          return null;
        }
        return (
          <TestSelectionView
            onBack={() => setCurrentView("menu")}
            onSelectTest1={() => {
              if (!shouldBlockNavigation("test1")) {
                setCurrentView("test1");
              }
            }}
            onSelectTest2={() => {
              if (!shouldBlockNavigation("test2")) {
                setCurrentView("test2");
              }
            }}
          />
        );
      case "test1":
        if (shouldBlockNavigation("test1")) {
          setCurrentView("test");
          return null;
        }
        return (
          <Test1ControlView
          data={data}
            onBack={() => setCurrentView("test")}
            onNext={() => {
              if (!shouldBlockNavigation("test2")) {
                setCurrentView("test2");
              }
            }}
          />
        );
      case "test2":
        if (shouldBlockNavigation("test2")) {
          setCurrentView("test");
          return null;
        }
        return <Test2ControlView onBack={() => setCurrentView("test")} data={data}/>;

      default:
        return (
          <View style={styles.menuGrid}>
            {[
              { id: "auto", icon: "⚡", label: "AUTO" },
              { id: "aeration_menu", icon: "🌪️", label: "AERATION" },
              { id: "fault", icon: "⚠️", label: "FAULT" },
              { id: "settings", icon: "⚙️", label: "SETTINGS" },
              { id: "input", icon: "📥", label: "INPUT" },
              { id: "output", icon: "📤", label: "OUTPUT" },
              { id: "test", icon: "🧪", label: "TEST" },
            ].map((item) => {
              const isBlocked = shouldBlockNavigation(item.id);
              return (
                <TouchableOpacity
                  key={item.id}
                  style={[
                    styles.menuItem,
                    isBlocked && styles.menuItemBlocked
                  ]}
                  onPress={() => handleMenuItemPress(item.id)}
                  disabled={isBlocked}
                >
                  <Text style={[
                    styles.menuIcon,
                    isBlocked && styles.menuIconBlocked
                  ]}>
                    {item.icon}
                  </Text>
                  <Text style={[
                    styles.menuItemText,
                    isBlocked && styles.menuItemTextBlocked
                  ]}>
                    {item.label}
                    {isBlocked && " 🔒"}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        );
    }
  };

  const headerTitle = (() => {
    switch (currentView) {
      case "menu":
        return `Device SR.NO.${id}`;
      case "settings":
        return selectedSetting || "SETTINGS";
      case "aeration_menu":
        return "AERATION";
      case "aeration_without":
        return "AERATION WITHOUT HEATING";
      case "aeration_with":
        return "AERATION WITH HEATING";
      case "input":
        return "INPUT";
      case "analog":
        return "ANALOG";
      case "output":
        return "OUTPUT";
      case "auto":
        return "AUTO";
      case "fault":
        return "FAULT";
      case "test":
        return "TEST";
      default:
        return currentView.toUpperCase();
    }
  })();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerBackButton}
          onPress={() => {
            console.log("Back button pressed, current view:", currentView);
            if (currentView === "menu") {
              router.back();
            } else {
              setSelectedSetting(null);
              setCurrentView("menu");
            }
          }}
        >
          <Text style={styles.headerBackText}>← BACK</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{headerTitle}</Text>
      </View>
      {renderContent()}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  header: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1F2937",
    flex: 1,
    textAlign: "center",
    marginRight: 40,
  },
  headerBackButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
  },
  headerBackText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
  },
  contentContainer: {
    padding: 16,
  },
  menuGrid: {
    padding: 16,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 16,
  },
  menuItem: {
    width: "45%",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  menuItemBlocked: {
    backgroundColor: "#F3F4F6",
    borderColor: "#D1D5DB",
    opacity: 0.6,
  },
  menuIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  menuIconBlocked: {
    opacity: 0.5,
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
    textAlign: "center",
  },
  menuItemTextBlocked: {
    color: "#9CA3AF",
  },
  settingsTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1F2937",
    textAlign: "center",
    marginBottom: 20,
  },
  settingsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    gap: 20,
  },
  settingsButton: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
    width: "40%",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.2,
  },
  settingsButtonActive: {
    backgroundColor: "#3B82F6",
  },
  settingsButtonBlocked: {
    backgroundColor: "#F3F4F6",
    borderColor: "#D1D5DB",
    opacity: 0.6,
  },
  settingsButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1F2937",
    textAlign: "center",
  },
  settingsButtonTextBlocked: {
    color: "#9CA3AF",
  },
});