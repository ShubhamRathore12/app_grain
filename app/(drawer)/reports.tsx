import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    FlatList,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";

export default function TableWithDownload() {
  const [data, setData] = useState<Record<string, any>[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      try {
        const response = await fetch(
          "https://new-plc-software-5xyc.vercel.app/api/alldata/machine-data"
        );
        const json = await response.json();

        if (!isMounted) return;

        if (Array.isArray(json)) {
          setData(json);
        } else if (json && Array.isArray(json.data)) {
          setData(json.data);
        } else {
          setData([]);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
        if (isMounted) {
          Alert.alert("Error", "Failed to fetch data");
          setData([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text>Loading data...</Text>
      </View>
    );
  }

  if (!data.length) {
    return (
      <View style={styles.centered}>
        <Text>No data available</Text>
      </View>
    );
  }

  const keys = Object.keys(data[0]);

  return (
    <ScrollView style={styles.container}>
      {/* Table */}
      <ScrollView horizontal>
        <View>
          {/* Table Header */}
          <View style={styles.headerRow}>
            {keys.map((key) => (
              <Text key={key} style={[styles.cell, styles.headerCell]}>
                {key}
              </Text>
            ))}
          </View>

          {/* Table Body */}
          <FlatList
            data={data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.row}>
                {keys.map((key) => (
                  <Text key={key} style={styles.cell}>
                    {typeof item[key] === "boolean"
                      ? item[key]
                        ? "True"
                        : "False"
                      : String(item[key])}
                  </Text>
                ))}
              </View>
            )}
          />
        </View>
      </ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  headerRow: {
    flexDirection: "row",
    backgroundColor: "#f1f1f1",
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  cell: {
    padding: 10,
    minWidth: 100,
    textAlign: "center",
    borderRightWidth: 1,
    borderColor: "#ccc",
  },
  headerCell: {
    fontWeight: "bold",
    backgroundColor: "#e0e0e0",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
