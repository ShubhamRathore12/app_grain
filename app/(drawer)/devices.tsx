import DeviceCard from "@/components/DeviceCard";
import type { Device } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Import images properly for Expo
const plc1 = require("@/assets/images/1200.jpg");
const plc2 = require("@/assets/images/200.jpg");

const sampleDevices: Device[] = [
  {
    id: "1",
    name: 'GTPL-122-gT-1000T-S7-1200',
    location: 'Noida---kanpur',
    imageUrl: plc1,
    plc: 'S7-1200',
    chillerModel: 'gT-1000T',
    model: 'S7-1200',
    status: 'Online',
    machineStatus: 'Loading...',
    internetStatus: 'Loading...',
    coolingStatus: 'Loading...',
  },
  {
    id: "2",
    name: 'GTPL-118-gT-80E-P-S7-200',
    location: 'Noida',
    imageUrl: plc2,
    plc: 'S7-200',
    chillerModel: 'gT-80E-P',
    model: 'S7-200',
    status: 'Online',
    machineStatus: 'Loading...',
    internetStatus: 'Loading...',
    coolingStatus: 'Loading...',
  },
  {
    id: "3",
    name: 'GTPL-108-gT-40E-P-S7-200',
    location: 'Germany',
    imageUrl: plc1,
    plc: 'S7-200',
    chillerModel: 'gT-40E-P',
    model: 'S7-200',
    status: 'Online',
    machineStatus: 'Loading...',
    internetStatus: 'Loading...',
    coolingStatus: 'Loading...',
  },
  {
    id: "4",
    name: 'GTPL-109-gT-40E-P-S7-200',
    location: 'Germany',
    imageUrl: plc1,
    plc: 'S7-200',
    chillerModel: 'gT-40E-P',
    model: 'S7-200',
    status: 'Online',
    machineStatus: 'Loading...',
    internetStatus: 'Loading...',
    coolingStatus: 'Loading...',
  },
  {
    id: "5",
    name: 'GTPL-110-gT-40E-P-S7-200',
    location: 'Germany',
    imageUrl: plc1,
    plc: 'S7-200',
    chillerModel: 'gT-40E-P',
    model: 'S7-200',
    status: 'Online',
    machineStatus: 'Loading...',
    internetStatus: 'Loading...',
    coolingStatus: 'Loading...',
  },
  {
    id: "6",
    name: 'GTPL-111-gT-80E-P-S7-200',
    location: 'Germany',
    imageUrl: plc1,
    plc: 'S7-200',
    chillerModel: 'gT-80E-P',
    model: 'S7-200',
    status: 'Online',
    machineStatus: 'Loading...',
    internetStatus: 'Loading...',
    coolingStatus: 'Loading...',
  },
  {
    id: "7",
    name: 'GTPL-112-gT-80E-P-S7-200',
    location: 'Germany',
    imageUrl: plc1,
    plc: 'S7-200',
    chillerModel: 'gT-80E-P',
    model: 'S7-200',
    status: 'Online',
    machineStatus: 'Loading...',
    internetStatus: 'Loading...',
    coolingStatus: 'Loading...',
  },
  {
    id: "8",
    name: 'GTPL-113-gT-80E-P-S7-200',
    location: 'Germany',
    imageUrl: plc1,
    plc: 'S7-200',
    chillerModel: 'gT-80E-P',
    model: 'S7-200',
    status: 'Online',
    machineStatus: 'Loading...',
    internetStatus: 'Loading...',
    coolingStatus: 'Loading...',
  },
  {
    id: "9",
    name: 'GTPL-114-gT-140E-S7-1200',
    location: 'Germany',
    imageUrl: plc1,
    plc: 'S7-1200',
    chillerModel: 'gT-140E',
    model: 'S7-1200',
    status: 'Online',
    machineStatus: 'Loading...',
    internetStatus: 'Loading...',
    coolingStatus: 'Loading...',
  },
  {
    id: "10",
    name: 'GTPL-115-gT-180E-S7-1200',
    location: 'Germany',
    imageUrl: plc1,
    plc: 'S7-1200',
    chillerModel: 'gT-180E',
    model: 'S7-1200',
    status: 'Online',
    machineStatus: 'Loading...',
    internetStatus: 'Loading...',
    coolingStatus: 'Loading...',
  },
  {
    id: "11",
    name: 'GTPL-116-gT-240E-S7-1200',
    location: 'Germany',
    imageUrl: plc1,
    plc: 'S7-1200',
    chillerModel: 'gT-240E',
    model: 'S7-1200',
    status: 'Online',
    machineStatus: 'Loading...',
    internetStatus: 'Loading...',
    coolingStatus: 'Loading...',
  },
  {
    id: "12",
    name: 'GTPL-117-gT-320E-S7-1200',
    location: 'Germany',
    imageUrl: plc1,
    plc: 'S7-1200',
    chillerModel: 'gT-320E',
    model: 'S7-1200',
    status: 'Online',
    machineStatus: 'Loading...',
    internetStatus: 'Loading...',
    coolingStatus: 'Loading...',
  },
  {
    id: "13",
    name: 'GTPL-119-gT-180E-S7-1200',
    location: 'Germany',
    imageUrl: plc1,
    plc: 'S7-1200',
    chillerModel: 'gT-180E',
    model: 'S7-1200',
    status: 'Online',
    machineStatus: 'Loading...',
    internetStatus: 'Loading...',
    coolingStatus: 'Loading...',
  },
  {
    id: "14",
    name: 'GTPL-120-gT-180E-S7-1200',
    location: 'Germany',
    imageUrl: plc1,
    plc: 'S7-1200',
    chillerModel: 'gT-180E',
    model: 'S7-1200',
    status: 'Online',
    machineStatus: 'Loading...',
    internetStatus: 'Loading...',
    coolingStatus: 'Loading...',
  },
  {
    id: "15",
    name: 'GTPL-121-gT-1000T-S7-1200',
    location: 'Noida---kanpur',
    imageUrl: plc1,
    plc: 'S7-1200',
    chillerModel: 'gT-1000T',
    model: 'S7-1200',
    status: 'Online',
    machineStatus: 'Loading...',
    internetStatus: 'Loading...',
    coolingStatus: 'Loading...',
  },
];

// API Configuration
const API_BASE_URL = 'https://your-api-endpoint.com'; // Replace with your actual API endpoint

export default function DevicesScreen() {
  const router = useRouter();
  const [devices, setDevices] = useState<Device[]>(sampleDevices);
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [selectedCompany, setSelectedCompany] = useState("All Companies");
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
  const [isCompanyDropdownOpen, setIsCompanyDropdownOpen] = useState(false);
  const [storedData, setStoredData] = useState<any>(null);
  const [locations, setLocations] = useState<string[]>([]);
  const [companies] = useState<string[]>(["All Companies", "Grain Technik"]);

  // Extract unique locations from sample devices
  useEffect(() => {
    const uniqueLocations = ["All Locations", ...new Set(sampleDevices.map(device => device.location))];
    setLocations(uniqueLocations);
  }, []);

  // Load stored data
  useEffect(() => {
    const loadStoredData = async () => {
      try {
        const storedValue = await AsyncStorage.getItem("userSession");
        if (storedValue) {
          setStoredData(JSON.parse(storedValue));
        }
      } catch (error) {
        console.error("Error loading stored data:", error);
      }
    };
    loadStoredData();
  }, []);

  // Fetch device statuses from API
  useEffect(() => {
    fetchDeviceStatuses();
  }, []);

  const fetchDeviceStatuses = async () => {
    try {
      // You can fetch all devices at once or one by one
      const updatedDevices = await Promise.all(
        devices.map(async (device) => {
          try {
            const statusData = await fetchDeviceStatus(device.id);
            return {
              ...device,
              machineStatus: statusData.machineStatus || 'Unknown',
              internetStatus: statusData.internetStatus || 'Unknown',
              coolingStatus: statusData.coolingStatus || 'Unknown',
            };
          } catch (error) {
            console.error(`Error fetching status for device ${device.id}:`, error);
            return {
              ...device,
              machineStatus: 'Error',
              internetStatus: 'Error',
              coolingStatus: 'Error',
            };
          }
        })
      );
      setDevices(updatedDevices);
    } catch (error) {
      console.error("Error fetching device statuses:", error);
      Alert.alert("Error", "Failed to fetch device statuses");
    }
  };

  const fetchDeviceStatus = async (deviceId: string) => {
    try {
      // Replace with your actual API endpoint
      const response = await fetch(`${API_BASE_URL}/devices/${deviceId}/status`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Add authentication headers if needed
          // 'Authorization': `Bearer ${authToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return {
        machineStatus: data.machineStatus, // Expected: 'Running', 'Stopped', 'Maintenance', etc.
        internetStatus: data.internetStatus, // Expected: 'Connected', 'Disconnected', etc.
        coolingStatus: data.coolingStatus, // Expected: 'Active', 'Inactive', 'Error', etc.
      };
    } catch (error) {
      console.error(`API call failed for device ${deviceId}:`, error);
      throw error;
    }
  };

  // Refresh device statuses
  const refreshDeviceStatuses = () => {
    fetchDeviceStatuses();
  };

  // Filter devices based on selected location and company
  const getFilteredDevices = () => {
    let filtered = devices;

    if (selectedLocation !== "All Locations") {
      filtered = filtered.filter(device => device.location === selectedLocation);
    }

    if (selectedCompany !== "All Companies") {
      // You can add company filtering logic here if devices have company property
      // For now, since all devices are from Grain Technik, we'll show all
      filtered = filtered;
    }

    return filtered;
  };

  const handleDevicePress = (device: Device) => {
    console.log("Device pressed:", device);
    // Navigate to device details
    router.push(`/(drawer)/device/${device.id}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Devices Overview</Text>

      {/* Refresh Button */}
      <TouchableOpacity 
        style={styles.refreshButton} 
        onPress={refreshDeviceStatuses}
      >
        <Text style={styles.refreshButtonText}>Refresh Status</Text>
      </TouchableOpacity>

      {/* Filters */}
      <View style={styles.filtersContainer}>
        {/* Location Dropdown */}
        <View style={styles.dropdownContainer}>
          <Text style={styles.filterLabel}>Select Location</Text>
          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => setIsLocationDropdownOpen(!isLocationDropdownOpen)}
          >
            <Text style={styles.dropdownText}>{selectedLocation}</Text>
            <Text style={styles.dropdownIcon}>▼</Text>
          </TouchableOpacity>
          {isLocationDropdownOpen && (
            <View style={styles.dropdownMenu}>
              {locations
                .filter((location) => location !== storedData?.user?.location)
                .map((location) => (
                  <TouchableOpacity
                    key={location}
                    style={styles.dropdownItem}
                    onPress={() => {
                      setSelectedLocation(location);
                      setIsLocationDropdownOpen(false);
                    }}
                  >
                    <Text style={styles.dropdownItemText}>{location}</Text>
                  </TouchableOpacity>
                ))}
            </View>
          )}
        </View>

        {/* Company Dropdown */}
        <View style={styles.dropdownContainer}>
          <Text style={styles.filterLabel}>Select Company</Text>
          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => setIsCompanyDropdownOpen(!isCompanyDropdownOpen)}
          >
            <Text style={styles.dropdownText}>{selectedCompany}</Text>
            <Text style={styles.dropdownIcon}>▼</Text>
          </TouchableOpacity>
          {isCompanyDropdownOpen && (
            <View style={styles.dropdownMenu}>
              {companies
                .filter((company) => company !== storedData?.user?.company)
                .map((company) => (
                  <TouchableOpacity
                    key={company}
                    style={styles.dropdownItem}
                    onPress={() => {
                      setSelectedCompany(company);
                      setIsCompanyDropdownOpen(false);
                    }}
                  >
                    <Text style={styles.dropdownItemText}>{company}</Text>
                  </TouchableOpacity>
                ))}
            </View>
          )}
        </View>
      </View>

      {/* Device List */}
      <FlatList
        data={getFilteredDevices()}
        renderItem={({ item }) => (
          <DeviceCard device={item} onPress={handleDevicePress} />
        )}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.deviceList}
        columnWrapperStyle={styles.row}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    padding: 16,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 16,
  },
  refreshButton: {
    backgroundColor: "#3B82F6",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    alignSelf: "flex-end",
    marginBottom: 16,
  },
  refreshButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "500",
  },
  filtersContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  dropdownContainer: {
    width: "48%",
    zIndex: 10,
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#4B5563",
    marginBottom: 8,
  },
  dropdown: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    backgroundColor: "white",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  dropdownText: {
    fontSize: 14,
    color: "#1F2937",
  },
  dropdownIcon: {
    fontSize: 12,
    color: "#6B7280",
  },
  dropdownMenu: {
    position: "absolute",
    top: 76,
    left: 0,
    right: 0,
    backgroundColor: "white",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    zIndex: 100,
  },
  dropdownItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  dropdownItemText: {
    fontSize: 14,
    color: "#1F2937",
  },
  deviceList: {
    paddingBottom: 20,
  },
  row: {
    flex: 1,
    justifyContent: "space-around",
  },
});