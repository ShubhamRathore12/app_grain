import { Picker } from '@react-native-picker/picker';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { Button, DataTable } from 'react-native-paper';
import * as XLSX from 'xlsx';

// All available table names
const ALLOWED_TABLES = [
  "GTPL_108_gT_40E_P_S7_200_Germany",
  "GTPL_109_gT_40E_P_S7_200_Germany",
  "GTPL_110_gT_40E_P_S7_200_Germany",
  "GTPL_111_gT_80E_P_S7_200_Germany",
  "GTPL_112_gT_80E_P_S7_200_Germany",
  "GTPL_113_gT_80E_P_S7_200_Germany",
  "kabomachinedatasmart200",
  "GTPL_114_GT_140E_S7_1200",
  "GTPL_115_GT_180E_S7_1200",
  "GTPL_119_GT_180E_S7_1200",
  "GTPL_120_GT_180E_S7_1200",
  "GTPL_116_GT_240E_S7_1200",
  "GTPL_117_GT_320E_S7_1200",
  "GTPL_121_GT1000T",
  "gtpl_122_s7_1200_01",
] as const;

type TableName = typeof ALLOWED_TABLES[number];

export default function TableWithDownload() {
  const [data, setData] = useState<Record<string, any>[]>([]);
  const [selectedTable, setSelectedTable] = useState<TableName>(ALLOWED_TABLES[0]);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [datePickerOpen, setDatePickerOpen] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      let url = `https://new-plc-software-5xyc.vercel.app/api/alldata/machine-data?table=${selectedTable}`;
      
      if (startDate && endDate) {
        url += `&fromDate=${startDate.toISOString()}&toDate=${endDate.toISOString()}`;
      }

      const response = await fetch(url);
      const json = await response.json();
      
      setData(Array.isArray(json) ? json : json.data || []);
    } catch (err) {
      console.error("Fetch error:", err);
      Alert.alert("Error", "Failed to fetch data");
      setData([]);
    }
    setLoading(false);
  };

  const downloadExcel = async () => {
    if (!data.length) return;
    
    try {
      // Create worksheet
      const ws = XLSX.utils.json_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Data");
      
      // Generate file
      const wbout = XLSX.write(wb, { type: 'base64', bookType: 'xlsx' });
      const uri = FileSystem.cacheDirectory + `${selectedTable}_data.xlsx`;
      
      // Write to file
      await FileSystem.writeAsStringAsync(uri, wbout, {
        encoding: FileSystem.EncodingType.Base64,
      });
      
      // Share the file
      await Sharing.shareAsync(uri, {
        mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        dialogTitle: 'Share Excel File',
        UTI: 'com.microsoft.excel.xlsx'
      });
    } catch (error) {
      console.error('Error downloading Excel:', error);
      Alert.alert('Error', 'Failed to export Excel file');
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedTable, startDate, endDate]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading data...</Text>
      </View>
    );
  }

  const keys = data.length > 0 ? Object.keys(data[0]) : [];

  return (
    <ScrollView style={styles.container}>
      {/* Filters */}
      <View style={styles.filterContainer}>
        <Picker
          selectedValue={selectedTable}
          onValueChange={(itemValue:any) => setSelectedTable(itemValue)}
          style={styles.picker}
        >
          {ALLOWED_TABLES.map(table => (
            <Picker.Item key={table} label={table} value={table} />
          ))}
        </Picker>

        <Button 
          onPress={() => setDatePickerOpen(true)}
          mode="contained"
          style={styles.dateButton}
        >
          Select Date Range
        </Button>

        <DatePicker
          modal
          open={datePickerOpen}
          date={new Date()}
          mode="date"
          onConfirm={(date:any) => {
            setDatePickerOpen(false);
            if (!startDate) {
              setStartDate(date);
            } else if (!endDate) {
              setEndDate(date);
            } else {
              setStartDate(date);
              setEndDate(null);
            }
          }}
          onCancel={() => {
            setDatePickerOpen(false);
          }}
        />

        <Button 
          onPress={downloadExcel}
          mode="contained"
          style={styles.downloadButton}
          disabled={!data.length}
        >
          Download Excel
        </Button>
      </View>

      {/* Date Selection Display */}
      {startDate && (
        <Text style={styles.dateText}>
          Selected: {startDate.toDateString()} 
          {endDate ? ` to ${endDate.toDateString()}` : ''}
        </Text>
      )}

      {/* Table */}
      {data.length > 0 ? (
        <ScrollView horizontal>
          <DataTable>
            <DataTable.Header>
              {keys.map((key) => (
                <DataTable.Title key={key} style={styles.headerCell}>
                  {key}
                </DataTable.Title>
              ))}
            </DataTable.Header>

            {data.map((row, index) => (
              <DataTable.Row key={index}>
                {keys.map((key) => (
                  <DataTable.Cell key={key}>
                    {typeof row[key] === 'boolean' 
                      ? row[key] ? 'True' : 'False' 
                      : String(row[key])}
                  </DataTable.Cell>
                ))}
              </DataTable.Row>
            ))}
          </DataTable>
        </ScrollView>
      ) : (
        <View style={styles.centered}>
          <Text>No data available</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  filterContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  picker: {
    width: '100%',
    marginBottom: 8,
  },
  dateButton: {
    marginBottom: 8,
  },
  downloadButton: {
    marginBottom: 8,
  },
  dateText: {
    marginBottom: 8,
    textAlign: 'center',
  },
  headerCell: {
    minWidth: 120,
    justifyContent: 'center',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});