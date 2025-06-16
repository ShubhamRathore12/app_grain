"use client";

import { appLogo } from "@/assets/images/logo";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Colors from "@/constants/Colors";
import { useAuth } from "@/context/AuthContext";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Redirect, useRouter } from "expo-router";
import { Formik } from "formik";
import { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as Yup from "yup";

const loginSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

interface LoginFormValues {
  username: string;
  password: string;
}

interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
    username?: string;
    monitorAccess?: string;
  };
  message?: string;
}

export default function LoginScreen() {
  const router = useRouter();
  const { signIn, user, isAuthenticated, isInitialized } = useAuth();
  const [loginError, setLoginError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Redirect if already authenticated
  if (isInitialized && isAuthenticated && user) {
    return <Redirect href="/dashboard" />;
  }

  const handleLogin = async (values: LoginFormValues) => {
    try {
      setLoginError("");
      setIsLoading(true);

      console.log("🔄 Starting login process...");

      const response = await fetch(
        "https://grain-backend.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      const responseText = await response.text();
      console.log("📥 Login response received");

      if (!responseText) {
        throw new Error("Empty response from server");
      }

      const data: LoginResponse = JSON.parse(responseText);

      if (!response.ok) {
        const errorMessage = data.message || `HTTP ${response.status}`;
        setLoginError(errorMessage);
        return;
      }

      if (!data?.token || !data?.user) {
        setLoginError("Invalid response from server");
        return;
      }

      console.log("✅ Login successful, signing in...");
      const monitorAccess =
      typeof data.user.monitorAccess === "string"
        ? data.user.monitorAccess.split(",")?.map((s) => s.trim())
        : [];
    
    
    const userData = {
      id: data.user.id,
      email: data.user.email,
      name: data.user.name,
      username: data.user.username,
      monitorAccess,
      isLoggedIn: true,
    };
    

      const signInSuccess = await signIn(data.token, userData);

      if (signInSuccess) {
        await AsyncStorage.setItem('monitorAccess', JSON.stringify(monitorAccess));
        console.log("✅ Sign in successful, navigating to dashboard");
        router.replace("/dashboard");
      } else {
        setLoginError("Authentication failed. Please try again.");
      }
    } catch (error: any) {
      console.error("❌ Login error:", error);

      let errorMessage = "An unexpected error occurred. Please try again.";

      if (error?.name === "AbortError") {
        errorMessage =
          "Request timeout. Please check your internet connection.";
      } else if (
        error instanceof TypeError &&
        error.message.includes("fetch")
      ) {
        errorMessage = "Network error. Please check your internet connection.";
      }

      setLoginError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Show loading while auth initializes
  if (!isInitialized) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <Text style={styles.subtitle}>Initializing...</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.content}>
          <View style={styles.logoContainer}>
            <Image source={{ uri: appLogo.uri }} style={styles.logo} />
            <Text style={styles.logoText}>Grain Technik</Text>
          </View>

          <View style={styles.formContainer}>
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>Sign in to continue</Text>

            {loginError ? (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{loginError}</Text>
              </View>
            ) : null}

            <Formik
              initialValues={{ username: "", password: "" }}
              validationSchema={loginSchema}
              onSubmit={handleLogin}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
                isSubmitting,
              }) => (
                <View style={styles.form}>
                  <Input
                    label="Username"
                    placeholder="Enter your username"
                    autoCapitalize="none"
                    onChangeText={handleChange("username")}
                    onBlur={handleBlur("username")}
                    value={values.username}
                    error={
                      touched.username && errors.username
                        ? errors.username
                        : undefined
                    }
                  />

                  <Input
                    label="Password"
                    placeholder="Enter your password"
                    secureTextEntry
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    value={values.password}
                    error={
                      touched.password && errors.password
                        ? errors.password
                        : undefined
                    }
                  />

                  <TouchableOpacity style={styles.forgotPassword}>
                    <Text style={styles.forgotPasswordText}>
                      Forgot Password?
                    </Text>
                  </TouchableOpacity>

                  <Button
                    title="Login"
                    onPress={() => handleSubmit()}
                    isLoading={isSubmitting || isLoading}
                    style={styles.loginButton}
                  />
                </View>
              )}
            </Formik>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 60,
    marginBottom: 40,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 16,
  },
  logoText: {
    fontSize: 24,
    fontWeight: "700",
    color: Colors.brand.primary,
  },
  formContainer: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#6B7280",
    marginBottom: 32,
  },
  form: {
    width: "100%",
  },
  errorContainer: {
    backgroundColor: "#FEE2E2",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  errorText: {
    color: "#B91C1C",
    fontSize: 14,
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginBottom: 24,
    marginTop: 8,
  },
  forgotPasswordText: {
    color: Colors.brand.primary,
    fontWeight: "500",
  },
  loginButton: {
    width: "100%",
    marginBottom: 16,
  },
});
