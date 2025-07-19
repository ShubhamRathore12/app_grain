import DeviceCard from "@/components/DeviceCard";
import type { Device } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

// Import images properly for Expo
const plc1 = require("@/assets/images/1200.jpg");
const plc2 = require("@/assets/images/200.jpg");

// Define interfaces for type safety
interface DeviceStatus {
  machineName: string;
  machineStatus?: boolean;
  internetStatus?: boolean;
  hasNewData?: boolean;
}

interface MachineStatusResponse {
  machines: DeviceStatus[];
}

const allDevices: Device[] = [
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
    imageUrl: plc2,
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
    imageUrl: plc2,
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
    imageUrl: plc2,
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
    id: "7",
    name: 'GTPL-112-gT-80E-P-S7-200',
    location: 'Germany',
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
    id: "8",
    name: 'GTPL-113-gT-80E-P-S7-200',
    location: 'Germany',
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

// Device name to status key mapping
const deviceNameToStatusKey: Record<string, string> = {
  "GTPL-122-gT-1000T-S7-1200": "GTPL_122_S7_1200",
  "GTPL-118-gT-80E-P-S7-200": "KABO_200",
  "GTPL-108-gT-40E-P-S7-200": "GTPL_108",
  "GTPL-109-gT-40E-P-S7-200": "GTPL_109",
  "GTPL-110-gT-40E-P-S7-200": "GTPL_110",
  "GTPL-111-gT-80E-P-S7-200": "GTPL_111",
  "GTPL-112-gT-80E-P-S7-200": "GTPL_112",
  "GTPL-113-gT-80E-P-S7-200": "GTPL_113",
  "GTPL-114-gT-140E-S7-1200": "GTPL_114",
  "GTPL-115-gT-180E-S7-1200": "GTPL_115",
  "GTPL-116-gT-240E-S7-1200": "GTPL_116",
  "GTPL-117-gT-320E-S7-1200": "GTPL_117",
  "GTPL-119-gT-180E-S7-1200": "GTPL_119",
  "GTPL-120-gT-180E-S7-1200": "GTPL_120",
  "GTPL-121-gT-1000T-S7-1200": "GTPL_121",
};

export default function DevicesScreen() {
  const router = useRouter();
  const [devices, setDevices] = useState<Device[]>(allDevices);
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [selectedCompany, setSelectedCompany] = useState("All Companies");
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
  const [isCompanyDropdownOpen, setIsCompanyDropdownOpen] = useState(false);
  const [storedData, setStoredData] = useState<any>(null);
  const [locations, setLocations] = useState<string[]>([]);
  const [companies] = useState<string[]>(["All Companies", "Grain Technik"]);
  const [refreshing, setRefreshing] = useState(false);
  const [machineStatuses, setMachineStatuses] = useState<DeviceStatus[]>([]);
  const [accessArray, setAccessArray] = useState<string[]>([]);

  // Extract unique locations from devices
  useEffect(() => {
    const uniqueLocations = ["All Locations", ...new Set(allDevices.map(device => device.location))];
    setLocations(uniqueLocations);
  }, []);

  // Load stored data and access restrictions
  useEffect(() => {
    const loadStoredData = async () => {
      try {
        const storedValue = await AsyncStorage.getItem("userSession");
        if (storedValue) {
          const userData = JSON.parse(storedValue);
          setStoredData(userData);
          
          // Get access restrictions from monitorAccess
          const monitorAccess = await AsyncStorage.getItem("monitorAccess");
          if (monitorAccess) {
            const parsed = JSON.parse(monitorAccess);
            const accessList = Array.isArray(parsed) 
              ? parsed.map((name: string) => name.trim().toLowerCase())
              : [];
            setAccessArray(accessList);
          }
        }
      } catch (error) {
        console.error("Error loading stored data:", error);
      }
    };
    loadStoredData();
  }, []);

  // Fetch machine statuses from API
  useEffect(() => {
    fetchMachineStatuses();
    const interval = setInterval(fetchMachineStatuses, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchMachineStatuses = async () => {
    try {
      // Replace with your actual machine status API endpoint
      const response = await fetch('https://your-api-endpoint.com/machine-status');
      const data: MachineStatusResponse = await response.json();
      
      if (data && data.machines) {
        setMachineStatuses(data.machines);
        updateDevicesWithStatus(data.machines);
      }
    } catch (error) {
      console.error("Error fetching machine statuses:", error);
      // Use mock data for development
      const mockStatuses: DeviceStatus[] = Object.values(deviceNameToStatusKey).map(key => ({
        machineName: key,
        machineStatus: Math.random() > 0.5,
        internetStatus: Math.random() > 0.3,
        hasNewData: Math.random() > 0.4,
      }));
      setMachineStatuses(mockStatuses);
      updateDevicesWithStatus(mockStatuses);
    }
  };

  const updateDevicesWithStatus = (statuses: DeviceStatus[]) => {
    const updatedDevices = allDevices.map(device => {
      const statusKey = deviceNameToStatusKey[device.name];
      const deviceStatus = statuses.find(s => s.machineName === statusKey);
      
      return {
        ...device,
        machineStatus: deviceStatus?.machineStatus ? 'Running' : 'Stopped',
        internetStatus: deviceStatus?.internetStatus ? 'Connected' : 'Disconnected',
        coolingStatus: deviceStatus?.hasNewData ? 'Active' : 'Inactive',
      };
    });
    
    setDevices(updatedDevices);
  };

  // Filter devices based on selected location, company, and access restrictions
  const getFilteredDevices = () => {
    let filtered = devices;

    // Filter by location
    if (selectedLocation !== "All Locations") {
      filtered = filtered.filter(device => device.location === selectedLocation);
    }

    // Filter by company (if needed in the future)
    if (selectedCompany !== "All Companies") {
      // Add company filtering logic here if devices have company property
    }

    // Filter out restricted devices based on monitorAccess
    filtered = filtered.filter(device => {
      const isRestricted = accessArray.includes(device.name.toLowerCase());
      return !isRestricted;
    });

    return filtered;
  };

  const handleDevicePress = (device: Device) => {
    console.log("Device pressed:", device);
    router.push(`/(drawer)/device/${device.id}`);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchMachineStatuses();
    setRefreshing(false);
  };

  const filteredDevices = getFilteredDevices();

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Devices Overview</Text>
      <Text style={styles.pageSubtitle}>Monitor and manage your industrial devices</Text>

      {/* Filters */}
      <View style={styles.filtersContainer}>
        {/* Location Dropdown */}
        <View style={styles.dropdownContainer}>
          <Text style={styles.filterLabel}>📍 Select Location</Text>
          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => setIsLocationDropdownOpen(!isLocationDropdownOpen)}
          >
            <Text style={styles.dropdownText}>{selectedLocation}</Text>
            <Text style={[styles.dropdownIcon, isLocationDropdownOpen && styles.dropdownIconRotated]}>▼</Text>
          </TouchableOpacity>
          {isLocationDropdownOpen && (
            <View style={styles.dropdownMenu}>
              {locations.map((location) => (
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
          <Text style={styles.filterLabel}>🏢 Select Company</Text>
          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => setIsCompanyDropdownOpen(!isCompanyDropdownOpen)}
          >
            <Text style={styles.dropdownText}>{selectedCompany}</Text>
            <Text style={[styles.dropdownIcon, isCompanyDropdownOpen && styles.dropdownIconRotated]}>▼</Text>
          </TouchableOpacity>
          {isCompanyDropdownOpen && (
            <View style={styles.dropdownMenu}>
              {companies.map((company) => (
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
        data={filteredDevices}
        renderItem={({ item }) => (
          <DeviceCard device={item} onPress={handleDevicePress} />
        )}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.deviceList}
        columnWrapperStyle={styles.row}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#3B82F6"]}
            tintColor="#3B82F6"
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No devices found</Text>
            <Text style={styles.emptySubtext}>
              Try adjusting your filters or check your access permissions
            </Text>
          </View>
        }
      />

      {/* Status Summary */}
      <View style={styles.statusSummary}>
        <Text style={styles.statusSummaryTitle}>Status Summary</Text>
        <View style={styles.statusSummaryRow}>
          <View style={styles.statusSummaryItem}>
            <View style={[styles.statusDot, { backgroundColor: '#10B981' }]} />
            <Text style={styles.statusSummaryText}>
              {filteredDevices.filter(d => d.machineStatus === 'Running').length} Running
            </Text>
          </View>
          <View style={styles.statusSummaryItem}>
            <View style={[styles.statusDot, { backgroundColor: '#EF4444' }]} />
            <Text style={styles.statusSummaryText}>
              {filteredDevices.filter(d => d.machineStatus === 'Stopped').length} Stopped
            </Text>
          </View>
          <View style={styles.statusSummaryItem}>
            <View style={[styles.statusDot, { backgroundColor: '#3B82F6' }]} />
            <Text style={styles.statusSummaryText}>
              {filteredDevices.filter(d => d.internetStatus === 'Connected').length} Connected
            </Text>
          </View>
        </View>
      </View>
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
    fontSize: 28,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 4,
  },
  pageSubtitle: {
    fontSize: 16,
    color: "#6B7280",
    marginBottom: 24,
  },
  filtersContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
    gap: 12,
  },
  dropdownContainer: {
    flex: 1,
    zIndex: 10,
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 8,
  },
  dropdown: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    backgroundColor: "white",
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dropdownText: {
    fontSize: 14,
    color: "#1F2937",
    fontWeight: "500",
  },
  dropdownIcon: {
    fontSize: 12,
    color: "#6B7280",
    transform: [{ rotate: '0deg' }],
  },
  dropdownIconRotated: {
    transform: [{ rotate: '180deg' }],
  },
  dropdownMenu: {
    position: "absolute",
    top: 76,
    left: 0,
    right: 0,
    backgroundColor: "white",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    zIndex: 100,
    maxHeight: 200,
  },
  dropdownItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  dropdownItemText: {
    fontSize: 14,
    color: "#1F2937",
    fontWeight: "500",
  },
  deviceList: {
    paddingBottom: 20,
  },
  row: {
    flex: 1,
    justifyContent: "space-around",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#6B7280",
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: "#9CA3AF",
    textAlign: "center",
    paddingHorizontal: 40,
  },
  statusSummary: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statusSummaryTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 12,
  },
  statusSummaryRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  statusSummaryItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusSummaryText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#6B7280",
  },
});