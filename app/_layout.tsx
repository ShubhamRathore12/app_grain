import { AuthProvider } from "@/context/AuthContext";

import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { LogBox, Platform } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from 'react-native-toast-message';

// Critical: Import this at the very top for production builds
import "react-native-gesture-handler";

LogBox.ignoreLogs([
  "ViewPropTypes will be removed",
  "ColorPropType will be removed",
  "Sending `onAnimatedValueUpdate`",
]);

export default function RootLayout() {
  useEffect(() => {
    console.log("=== ROOT LAYOUT MOUNTED ===");
    console.log(
      "Environment:",
      Platform.OS === "android" ? "Development" : "Production"
    );
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>

        <AuthProvider>
        <Toast />
          <StatusBar style="auto" />
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="login" />
            <Stack.Screen
              name="(drawer)"
              options={{
                headerShown: false,
                gestureEnabled: false,
                animation: "none",
              }}
            />
          </Stack>
        </AuthProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
