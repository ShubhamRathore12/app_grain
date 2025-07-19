import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface TagData {
  tag: string;
  value: boolean | string;
  createdAt: string;
}

interface Stats {
  total: number;
  activeTags: number;
  faultTags: number;
  currentPage: number;
  totalPages: number;
}

interface Pagination {
  total: number;
  totalPages: number;
  limit: number;
  page: number;
}

const PAGE_SIZE = 20;

const S7_200_TAGS = [
  "AFTER_HEAT_TEMP_MORE_THAN_50"  ,
"AFTER_HEAT_TEMP_SENSOR_TH_OPEN"  ,
"AFTER_HEAT_TEMP_SENSOR_TH_SHORT_CIRCUIT",  
"AIR_OUTLET_TEMP_SENSOR_T0_OPEN"  ,
"AIR_OUTLET_TEMP_SENSOR_T0_SHORT_CIRCUIT"  ,
"AMBIENT_TEMP_LESS_THAN_4"  ,
"AMBIENT_TEMP_LOW_THAN_SET_TEMP",  
"AMBIENT_TEMP_OVER_40"  ,
"AMBIENT_TEMP_OVER_43"  ,
"AMBIENT_TEMP_SENSOR_T2_OPEN"  ,
"AMBIENT_TEMP_SENSOR_T2_SHORT_CIRCUIT"  ,
"ANTI_FREEZE_PROTECTION"  ,
"BLOWER_CIRCUIT_BREAKER_FAULT"  ,
"BLOWER_DRIVE_FAULT"  ,
"C0ND_FAN_TOP"  ,
"COLD_AIR_TEMP_SENSOR_T1_OPEN"  ,
"COLD_AIR_TEMP_SENSOR_T1_SHORT_CIRCUIT"  ,
"COMPRESSOR_CIRCUIT_BREA_FAULT"  ,
"COND_FAN_CIRCUIT_BREAKE_FAULT"  ,
"CONDENSER_FAN_DOOR_OPEN"  ,
"HEATER_CIRCUIT_BREAKER_FAULT"  ,
"HEATER_RCCCB_TRIP_FAULT"  ,
"HEATER_TOP_FAULT"  ,
"HIGH_PRESSURE_FAULT"  ,
"HIGH_PRESSURE_FAULT_LOCKED"  ,
"HP_TRANSDUCEER_FAILURE"  ,
"LOW_PRESSURE_FAULT"  ,
"LOW_PRESSURE_FAULT_LOCKED"  ,
"LP_TRANSDUCER_FAILURE"  ,
"SET_POINT_NOT_ACHIEVED_IN_AERATION_MODE"  ,
"THREE_PHASE_MONITORING_FAULT"  
];

const S7_1200_TAGS = [
  "Compressor_circuit_breaker_fault",
"Oil_pressure_low",
"Blower_drive_fault",
"Blower_circuit_breaker_fault",
"Ambient_air_sensor_1open",
"COND_FAN_OVERLOAD",
"Three_phase_monitor_fault",
"High_pressure_fault",
"Ambient_temp_lower_than_set_temp",
"Ambient_temp_over_50C",
"COMP_MODULE_FEEDBACK_ERROR_Si_I1",
"Low_pressure_1_fault",
"COMP_FBK_ERROR",
"Low_pressure_2_fault",
"Ambient_temp_over_47C",
"Condenser_fan_2_TOP_fault",
"Condenser_fan_3_TOP_fault",
"Condenser_fan_4_TOP_fault",
"Condenser_fan_2_circuit_breaker_fault",
"Condenser_fan_3_circuit_breaker_fault",
"Condenser_fan_4_circuit_breaker_fault",
"Condenser_fan_5_TOP_fault",
"Condenser_fan_6_TOP_fault",
"Condenser_fan_5_circuit_breaker_fault",
"Condenser_fan_6_circuit_breaker_fault",
"Condenser_fan_1_circuit_breaker_fault",
"Condenser_fan_1_TOP_fault",
"Ambient_air_sensor_1_short_circuit",
"Ambient_air_sensor_2_open",
"Ambient_air_sensor_2_short_circuit",
"Cold_air_sensor_1_open",
"Cold_air_sensor_1_short_circuit",
"Cold_air_sensor_2_open",
"Cold_air_sensor_2_short_circuit",
"Air_outlet_sensor_1_open",
"Air_outlet_sensor_1_short_circuit",
"Air_outlet_sensor_2_open",
"Air_outlet_sensor_2_short_circuit"
]

const GPL_115_TAGS = [
   "Compressor_circuit_breaker_fault"  ,
"Condenser_fan_door_open"  ,
"Blower_drive_fault"  ,
"Blower_circuit_breaker_fault"  ,
"Three_phase_monitor_fault"  ,
"Low_Pressure_Fault"  ,
"Ambient_temp_lower_than_set_temp"  ,
"Ambient_temp_Over_43C"  ,
"Compressor_motor_overheat",  
"Low_pressure_fault_Locked" , 
"High_pressure_fault_Locked" , 
"Ambient_temp_Over_40C"  ,
"Ambient_temp_Less_than_4C",  
"Cond_Fan_circuit_breaker_fault",  
"Cond_Fan_drive_fault"  ,
"Cond_Fan_TOP"  ,
"Ambient_Temp_Sensor_T2_1_Open"  ,
"Ambient_Temp_Sensor_T2_1_Short_Circuit"  ,
"Ambient_Temp_Sensor_T2_2_Open"  ,
"Ambient_Temp_Sensor_T2_2_Short_Circuit"  ,
"Air_Outlet_Temp_Sensor_T0_1_Open"  ,
"Air_Outlet_Temp_Sensor_T0_1_Short_Circuit"  ,
"Air_Outlet_Temp_Sensor_T0_2_Open"  ,
"Air_Outlet_Temp_Sensor_T0_2_Short_Circuit"  ,
"Cold_Air_Temp_Sensor_T1_1_Open"  ,
"Cold_Air_Temp_Sensor_T1_1_Short_Circuit"  ,
"Cold_Air_Temp_Sensor_T1_2_Open"  ,
"Cold_Air_Temp_Sensor_T1_2_Short_Circuit"  ,
"Air_After_Heater_Temp_Sensor_TH_1_Open"  ,
"Air_After_Heater_Temp_Sensor_TH_1_Short_Circuit"  ,
"Air_After_Heater_Temp_Sensor_TH_2_Open"  ,
"Air_After_Heater_Temp_Sensor_TH_2_Short_Circuit"  ,
"High_Pressure_Fault"  ,
"Heater_TOP_fault"  ,
"Heater_drive_Fault" , 
"Heater_circuit_breaker_fault"  ,
"Heater_RCCB_fault"  ,
"Anti_Freeze_Protection",  
"TH_Temp_more_than_50C"  ,
"Delta_not_achieved_in_aeration_mode",  
"Warning_LP_transducer_failure"  ,
"Warning_HP_transducer_failure"  ,
];

const GPL_117_TAGS = [
  "Compressor_circuit_breaker_fault",
"Condenser_fan1_door_open",
"Blower_drive_fault",
"Blower_circuit_breaker_fault",
"Three_phase_monitor_fault",
"Low_Pressure_Fault",
"Ambient_temp_lower_than_set_temp",
"Ambient_temp_Over_43C",
"Compressor_motor_overheat",
"Cond_Fan2_circuit_breaker_fault",
"Low_pressure_fault_Locked",
"High_pressure_fault_Locked",
"Ambient_temp_Over_40C",
"Ambient_temp_Less_than_4C",
"Cond_Fan_1_TOP",
"Cond_Fan1_circuit_breaker_fault",
"Cond_Fan_drive_fault",
"Cond_Fan_2_TOP",
"Ambient_Temp_Sensor_T2_1_Open",
"Ambient_Temp_Sensor_T2_1_Short_Circuit",
"Ambient_Temp_Sensor_T2_2_Open",
"Ambient_Temp_Sensor_T2_2_Short_Circuit",
"Air_Outlet_Temp_Sensor_T0_1_Open",
"Air_Outlet_Temp_Sensor_T0_1_Short_Circuit",
"Air_Outlet_Temp_Sensor_T0_2_Open",
"Air_Outlet_Temp_Sensor_T0_2_Short_Circuit",
"Cold_Air_Temp_Semsor_T1_1_Open",
"Cold_Air_Temp_Sensor_T1_1_Short_Circuit",
"Cold_Air_Temp_Sensor_T1_2_Open",
"Cold_Air_Temp_Sensor_T1_2_Short_Circuit",
"Air_After_Heater_Temp_Sensor_TH_1_Open",
"Air_After_Heater_Temp_Sensor_TH_1_Short_Circuit",
"Air_After_Heater_Temp_Sensor_TH_2_Open",
"Air_After_Heater_Temp_Sensor_TH_2_Short_Circuit",
"High_Pressure_Fault",
"Comp_Oil_Low",
"Heater_TOP_fault",
"Heater_drive_Fault",
"Heater_circuit_breaker_fault",
"Heater_RCCB_fault",
"Anti_Freeze_Protection",
"Condenser_fan2_door_open",
"TH_Temp_more_than_50C",
"Delta_not_achieved_in_aeration_mode",
"Warning_LP_transducer_failure",
"Warning_HP_transducer_failure",
"Cond_fan_drive_circuit_breaker_fault"
];

const S7_200_MACHINES = [
  "GTPL-118-gT-80E-P-S7-200",
  "GTPL-108-gT-40E-P-S7-200",
  "GTPL-109-gT-40E-P-S7-200",
  "GTPL-110-gT-40E-P-S7-200",
  "GTPL-111-gT-80E-P-S7-200",
  "GTPL-112-gT-80E-P-S7-200",
  "GTPL-113-gT-80E-P-S7-200",
];

function extractActiveTags(data: any, machineName: string): TagData[] {
  if (!data || typeof data !== "object") {
    console.warn("Invalid data provided to extractActiveTags:", data);
    return [];
  }

  let tags: string[] = [];

  // Select appropriate tag list based on machine name
  if (machineName === "GTPL-115-gT-80E-P-S7-200") {
    tags = GPL_115_TAGS;
  } else   if (machineName === "GTPL-117-gT-320E-S7-1200") {
    tags = GPL_117_TAGS;
  }
   else if (S7_200_MACHINES.includes(machineName)) {
    tags = S7_200_TAGS;
  } else {
    tags = S7_1200_TAGS;
  }

  // S7_200 logic applies for both S7_200_MACHINES and this special case
  const isS7_200 =
    machineName === "GTPL-118-gT-80E-P-S7-200" ||
    S7_200_MACHINES.includes(machineName);

  const activeTags: TagData[] = [];

  tags.forEach((tag) => {
    const value = data[tag];

    // Skip if value is undefined, null, or empty
    if (value === undefined || value === null || value === "") {
      return;
    }

    let isActive = false;

    if (isS7_200) {
      // For S7-200 and GPL-115: check for boolean or "tr"
      isActive =
        value === "tr" || value === true || value === "true" || value === 1 || value === "True";
    } else {
      // For S7-1200: check for boolean or "1"/"true"
      isActive =
        value === true || value === "true" || value === 1 || value === "1" || value ==="True";
    }

    if (isActive) {
      // Extract timestamp from available fields or use now
      const timestamp =
        data.created_at ||
        data.createdAt ||
        data.created_on ||
        data.timestamp ||
        data.updated_at ||
        new Date().toISOString();

      activeTags.push({
        tag,
        value,
        createdAt: timestamp,
      });
    }
  });

  return activeTags;
}

function formatTagName(tag: string): string {
  return tag
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (l) => l.toUpperCase());
}

function getTagCategory(tag: string): string {
  const lower = tag.toLowerCase();
  if (lower.includes("fault") || lower.includes("error") || lower.includes("alarm")) {
    return "fault";
  }
  return "fault";
}

const ActiveTagRow = ({ tagData }: { tagData: TagData }) => {
  const category = getTagCategory(tagData.tag);
  const getCategoryStyle = () => {
    switch (category) {
      case "fault":
        return styles.faultTag;
      default:
        return styles.defaultTag;
    }
  };

  return (
    <View style={styles.tableRow}>
      <Text style={styles.tableCell}>{tagData.tag}</Text>
      <Text style={styles.tableCell}>{formatTagName(tagData.tag)}</Text>
      <View style={styles.tableCell}>
        <View style={styles.activeBadge}>
          <Text style={styles.activeBadgeText}>Active ({String(tagData.value)})</Text>
        </View>
      </View>
      <View style={styles.tableCell}>
        <View style={[styles.categoryBadge, getCategoryStyle()]}>
          <Text style={styles.categoryBadgeText}>
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </Text>
        </View>
      </View>
      <Text style={styles.tableCell}>{tagData.createdAt}</Text>
    </View>
  );
};

const ActiveTagsTable = ({ activeTags }: { activeTags: TagData[] }) => {
  return (
    <ScrollView horizontal>
      <View>
        {/* Table Header */}
        <View style={styles.tableHeader}>
          <Text style={styles.headerCell}>Tag Name</Text>
          <Text style={styles.headerCell}>Description</Text>
          <Text style={styles.headerCell}>Status</Text>
          <Text style={styles.headerCell}>Category</Text>
          <Text style={styles.headerCell}>Timestamp</Text>
        </View>
        
        {/* Table Rows */}
        {activeTags.length === 0 ? (
          <View style={styles.noDataRow}>
            <Text style={styles.noDataText}>No active tags found</Text>
          </View>
        ) : (
          activeTags.map((tagData, idx) => (
            <ActiveTagRow
              key={`${tagData.tag}-${tagData.createdAt}-${idx}`}
              tagData={tagData}
            />
          ))
        )}
      </View>
    </ScrollView>
  );
};

const StatisticsCards = ({ stats }: { stats: Stats }) => {
  const getCardStyle = (color: string) => {
    switch (color) {
      case "blue":
        return styles.blueCard;
      case "green":
        return styles.greenCard;
      case "red":
        return styles.redCard;
      case "purple":
        return styles.purpleCard;
      case "yellow":
        return styles.yellowCard;
      default:
        return styles.defaultCard;
    }
  };

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={styles.statsContainer}>
        {[
          { label: "Total Records", value: stats.total, color: "blue" },
          { label: "Active Tags", value: stats.activeTags, color: "green" },
          { label: "Fault Tags", value: stats.faultTags, color: "red" },
          { label: "Current Page", value: stats.currentPage, color: "purple" },
          { label: "Total Pages", value: stats.totalPages, color: "yellow" },
        ].map((stat, idx) => (
          <View key={idx} style={[styles.statCard, getCardStyle(stat.color)]}>
            <Text style={styles.statLabel}>{stat.label}</Text>
            <Text style={styles.statValue}>{stat.value.toLocaleString()}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const PaginationControls = ({
  currentPage,
  totalPages,
  loading,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  loading: boolean;
  onPageChange: (page: number) => void;
}) => {
  const delta = 2;
  const visiblePages = [];

  for (
    let i = Math.max(2, currentPage - delta);
    i <= Math.min(totalPages - 1, currentPage + delta);
    i++
  ) {
    visiblePages.push(i);
  }

  const pageButtons: (number | string)[] = [1];

  if (currentPage - delta > 2) {
    pageButtons.push("...");
  }

  pageButtons.push(...visiblePages);

  if (currentPage + delta < totalPages - 1) {
    pageButtons.push("...");
  }

  if (totalPages > 1) {
    pageButtons.push(totalPages);
  }

  return (
    <View style={styles.paginationContainer}>
      <Text style={styles.paginationText}>
        Showing page {currentPage} of {totalPages} ({totalPages * PAGE_SIZE} total records)
      </Text>
      <View style={styles.paginationButtons}>
        <TouchableOpacity
          onPress={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1 || loading}
          style={[styles.pageButton, (currentPage === 1 || loading) && styles.disabledButton]}
        >
          <Text style={styles.pageButtonText}>Previous</Text>
        </TouchableOpacity>
        
        {pageButtons.map((page, idx) => (
          <TouchableOpacity
            key={idx}
            disabled={page === "..." || loading || page === currentPage}
            onPress={() => typeof page === "number" && onPageChange(page)}
            style={[
              styles.pageButton,
              page === currentPage && styles.activePageButton,
              page === "..." && styles.ellipsisButton,
            ]}
          >
            <Text style={[
              styles.pageButtonText,
              page === currentPage && styles.activePageButtonText,
              page === "..." && styles.ellipsisText,
            ]}>
              {page}
            </Text>
          </TouchableOpacity>
        ))}
        
        <TouchableOpacity
          onPress={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages || loading}
          style={[styles.pageButton, (currentPage === totalPages || loading) && styles.disabledButton]}
        >
          <Text style={styles.pageButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const LoadingIndicator = () => {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#3B82F6" />
      <Text style={styles.loadingText}>Loading...</Text>
    </View>
  );
};

const DebugDataDisplay = ({
  data,
  machineName,
}: {
  data: any[];
  machineName: string;
}) => {
  const [showDebug, setShowDebug] = useState(false);

  if (!showDebug) {
    return (
      <TouchableOpacity
        onPress={() => setShowDebug(true)}
        style={styles.debugButton}
      >
        <Text style={styles.debugButtonText}>Show Debug Data</Text>
      </TouchableOpacity>
    );
  }

  const tags = S7_200_MACHINES.includes(machineName)
    ? S7_200_TAGS
    : S7_1200_TAGS;
  const sampleRecord = data[0] || {};

  return (
    <View style={styles.debugContainer}>
      <View style={styles.debugHeader}>
        <Text style={styles.debugTitle}>Debug Information</Text>
        <TouchableOpacity
          onPress={() => setShowDebug(false)}
          style={styles.debugCloseButton}
        >
          <Text style={styles.debugCloseButtonText}>Hide</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.debugContent}>
        <View style={styles.debugSection}>
          <Text style={styles.debugSectionTitle}>Machine: {machineName}</Text>
          <Text style={styles.debugSectionText}>
            Records found: {data.length}
          </Text>
        </View>

        <View style={styles.debugSection}>
          <Text style={styles.debugSectionTitle}>Expected Tags (first 10):</Text>
          <View style={styles.debugTagList}>
            <Text style={styles.debugTagText}>
              {tags.slice(0, 10).join(", ")}
            </Text>
          </View>
        </View>

        <View style={styles.debugSection}>
          <Text style={styles.debugSectionTitle}>Sample Record Keys:</Text>
          <ScrollView style={styles.debugScrollView}>
            <Text style={styles.debugTagText}>
              {Object.keys(sampleRecord).join(", ")}
            </Text>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default function FaultLogsPaginated({ machineName }: { machineName: string }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTags, setActiveTags] = useState<TagData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [rawData, setRawData] = useState<any[]>([]);
  const [paginationInfo, setPaginationInfo] = useState<Pagination>({
    total: 0,
    totalPages: 0,
    limit: PAGE_SIZE,
    page: 1,
  });
  const [stats, setStats] = useState<Stats>({
    total: 0,
    activeTags: 0,
    faultTags: 0,
    currentPage: 1,
    totalPages: 0,
  });

  const fetchLogs = async (pageNum: number, search = "") => {
    setLoading(true);
    setError(null);

    try {
      // Replace with your actual API call
      const response = await fetch(`your-api-endpoint?machineName=${machineName}&page=${pageNum}`);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to fetch logs');
      }

      let dataArray = [];
      let total = 0;
      let totalPages = 1;
      let currentPage = pageNum;

      if (Array.isArray(result?.data)) {
        dataArray = result.data;
        total = result.total || result.data.length;
        totalPages = result.totalPages || 1;
        currentPage = result.page || pageNum;
      } else {
        console.warn("Unexpected response format:", result);
        dataArray = [];
        total = 0;
        totalPages = 1;
        currentPage = 1;
      }

      setRawData(dataArray);
      const active: TagData[] = [];
      let faultCount = 0;

      for (const record of dataArray) {
        if (record && typeof record === "object") {
          const tags = extractActiveTags(record, machineName);
          active.push(...tags);
          faultCount += tags.filter(t => getTagCategory(t.tag) === "fault").length;
        }
      }

      setActiveTags(active);
      setStats({
        total,
        activeTags: active.length,
        faultTags: faultCount,
        currentPage,
        totalPages,
      });
      setPaginationInfo({
        total,
        totalPages,
        limit: result.limit || PAGE_SIZE,
        page: currentPage,
      });
    } catch (err: any) {
      console.error("Fetch error:", err);
      setError(`Failed to fetch logs: ${err.message}`);
      setActiveTags([]);
      setRawData([]);
      setStats({
        total: 0,
        activeTags: 0,
        faultTags: 0,
        currentPage: pageNum,
        totalPages: 1,
      });
      setPaginationInfo({
        total: 0,
        totalPages: 1,
        limit: PAGE_SIZE,
        page: pageNum,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs(currentPage, searchTerm);
  }, [currentPage, machineName, searchTerm]);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>
          Active {machineName} Tags Monitor
        </Text>

        <StatisticsCards stats={stats} />

        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        <DebugDataDisplay data={rawData} machineName={machineName} />
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Active Tags ({activeTags.length} found on this page)
          </Text>
          <Text style={styles.sectionSubtitle}>
            Filtered by: <Text style={styles.filterText}>{searchTerm || "None"}</Text>
          </Text>
        </View>

        {loading ? (
          <LoadingIndicator />
        ) : (
          <>
            <View style={styles.tableContainer}>
              <ActiveTagsTable
                activeTags={activeTags.filter(
                  (tag) => getTagCategory(tag.tag) !== "control"
                )}
              />
            </View>
            {paginationInfo.totalPages > 1 && (
              <PaginationControls
                currentPage={currentPage}
                totalPages={paginationInfo.totalPages}
                loading={loading}
                onPageChange={(page) => setCurrentPage(page)}
              />
            )}
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 16,
  },
  headerContainer: {
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 16,
  },
  contentContainer: {
    flex: 1,
  },
  sectionHeader: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  filterText: {
    fontWeight: 'bold',
  },
  statsContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  statCard: {
    padding: 16,
    borderRadius: 8,
    marginRight: 8,
    minWidth: 150,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  blueCard: {
    backgroundColor: '#3b82f6',
  },
  greenCard: {
    backgroundColor: '#10b981',
  },
  redCard: {
    backgroundColor: '#ef4444',
  },
  purpleCard: {
    backgroundColor: '#8b5cf6',
  },
  yellowCard: {
    backgroundColor: '#f59e0b',
  },
  defaultCard: {
    backgroundColor: '#6b7280',
  },
  statLabel: {
    fontSize: 14,
    color: 'white',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  errorContainer: {
    backgroundColor: '#fee2e2',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#fca5a5',
  },
  errorText: {
    color: '#dc2626',
    fontSize: 14,
  },
  tableContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    backgroundColor: 'white',
    marginBottom: 16,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f3f4f6',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerCell: {
    flex: 1,
    minWidth: 150,
    fontWeight: '600',
    color: '#374151',
    fontSize: 14,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  tableCell: {
    flex: 1,
    minWidth: 150,
    fontSize: 14,
    color: '#4b5563',
  },
  noDataRow: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noDataText: {
    color: '#6b7280',
    fontSize: 16,
  },
  activeBadge: {
    backgroundColor: '#d1fae5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  activeBadgeText: {
    color: '#065f46',
    fontSize: 12,
    fontWeight: '500',
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  faultTag: {
    backgroundColor: '#fee2e2',
  },
  defaultTag: {
    backgroundColor: '#e5e7eb',
  },
  categoryBadgeText: {
    fontSize: 12,
    fontWeight: '500',
  },
  paginationContainer: {
    marginTop: 16,
  },
  paginationText: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
  },
  paginationButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  pageButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
    marginBottom: 8,
    borderRadius: 6,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  pageButtonText: {
    color: '#4b5563',
    fontSize: 14,
  },
  activePageButton: {
    backgroundColor: '#3b82f6',
    borderColor: '#3b82f6',
  },
  activePageButtonText: {
    color: 'white',
  },
  ellipsisButton: {
    borderColor: 'transparent',
  },
  ellipsisText: {
    color: '#9ca3af',
  },
  disabledButton: {
    backgroundColor: '#f3f4f6',
    borderColor: '#e5e7eb',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  loadingText: {
    marginTop: 16,
    color: '#6b7280',
    fontSize: 16,
  },
  debugContainer: {
    backgroundColor: '#fef9c3',
    borderWidth: 1,
    borderColor: '#fde047',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  debugHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  debugTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#92400e',
  },
  debugCloseButton: {
    backgroundColor: '#f59e0b',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  debugCloseButtonText: {
    color: 'white',
    fontSize: 14,
  },
  debugContent: {},
  debugSection: {
    marginBottom: 12,
  },
  debugSectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#92400e',
    marginBottom: 4,
  },
  debugSectionText: {
    fontSize: 14,
    color: '#92400e',
  },
  debugTagList: {
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#fde047',
  },
  debugTagText: {
    fontSize: 12,
    color: '#92400e',
  },
  debugScrollView: {
    maxHeight: 100,
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#fde047',
  },
  debugButton: {
    backgroundColor: '#f59e0b',
    padding: 10,
    borderRadius: 6,
    marginBottom: 16,
    alignSelf: 'flex-start',
  },
  debugButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
});