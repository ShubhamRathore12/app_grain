import Colors from "@/constants/Colors";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function ContactScreen() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.subject ||
      !formData.message
    ) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    Alert.alert(
      "Success",
      "Your message has been sent! We'll get back to you soon.",
      [
        {
          text: "OK",
          onPress: () => {
            setFormData({ name: "", email: "", subject: "", message: "" });
          },
        },
      ]
    );
  };

  const handlePhonePress = () => {
    Linking.openURL("tel:+11234567890");
  };

  const handleEmailPress = () => {
    Linking.openURL("mailto:support@graintechnik.com");
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Text style={styles.pageTitle}>Contact Us</Text>
      <Text style={styles.pageSubtitle}>
        We'd love to hear from you. Our team is always here to help.
      </Text>

      {/* Contact Information */}
      <View style={styles.contactInfoContainer}>
        <View style={styles.contactInfoCard}>
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>📞</Text>
          </View>
          <View style={styles.contactInfoText}>
            <Text style={styles.contactInfoTitle}>Phone</Text>
            <TouchableOpacity onPress={handlePhonePress}>
              <Text style={styles.contactInfoValue}>+1 (123) 456-7890</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.contactInfoCard}>
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>✉️</Text>
          </View>
          <View style={styles.contactInfoText}>
            <Text style={styles.contactInfoTitle}>Email</Text>
            <TouchableOpacity onPress={handleEmailPress}>
              <Text style={styles.contactInfoValue}>
                support@graintechnik.com
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.contactInfoCard}>
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>📍</Text>
          </View>
          <View style={styles.contactInfoText}>
            <Text style={styles.contactInfoTitle}>Address</Text>
            <Text style={styles.contactInfoValue}>
              123 Industrial Avenue,{"\n"}
              Tech Park, Singapore 123456
            </Text>
          </View>
        </View>

        <View style={styles.contactInfoCard}>
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>🕒</Text>
          </View>
          <View style={styles.contactInfoText}>
            <Text style={styles.contactInfoTitle}>Working Hours</Text>
            <Text style={styles.contactInfoValue}>
              Monday - Friday: 9:00 AM - 6:00 PM{"\n"}
              Saturday: 10:00 AM - 2:00 PM{"\n"}
              Sunday: Closed
            </Text>
          </View>
        </View>
      </View>

      {/* Contact Form */}
      <View style={styles.formContainer}>
        <Text style={styles.sectionTitle}>Send Us a Message</Text>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            value={formData.name}
            onChangeText={(value) => handleInputChange("name", value)}
            placeholder="Enter your name"
            placeholderTextColor="#9CA3AF"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={formData.email}
            onChangeText={(value) => handleInputChange("email", value)}
            placeholder="Enter your email"
            placeholderTextColor="#9CA3AF"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Subject</Text>
          <TextInput
            style={styles.input}
            value={formData.subject}
            onChangeText={(value) => handleInputChange("subject", value)}
            placeholder="Enter subject"
            placeholderTextColor="#9CA3AF"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Message</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={formData.message}
            onChangeText={(value) => handleInputChange("message", value)}
            placeholder="Enter your message"
            placeholderTextColor="#9CA3AF"
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Send Message</Text>
        </TouchableOpacity>
      </View>

      {/* FAQ Section */}
      <View style={styles.faqContainer}>
        <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>

        <View style={styles.faqItem}>
          <Text style={styles.faqQuestion}>
            How do I register a new device?
          </Text>
          <Text style={styles.faqAnswer}>
            You can register a new device by going to the Registration section
            in the app and filling out the device registration form with the
            required details.
          </Text>
        </View>

        <View style={styles.faqItem}>
          <Text style={styles.faqQuestion}>
            What information is needed for device registration?
          </Text>
          <Text style={styles.faqAnswer}>
            You'll need the device serial number, model type, and purchase date.
            You may also need to provide proof of purchase documentation.
          </Text>
        </View>

        <View style={styles.faqItem}>
          <Text style={styles.faqQuestion}>
            How can I get technical support?
          </Text>
          <Text style={styles.faqAnswer}>
            Technical support is available through our support portal, by email,
            or by phone. Our technical team is available during business hours
            to assist with any issues.
          </Text>
        </View>
      </View>

      {/* Support Resources */}
      <View style={styles.resourcesContainer}>
        <Text style={styles.sectionTitle}>Additional Resources</Text>

        <TouchableOpacity style={styles.resourceItem}>
          <Text style={styles.resourceTitle}>User Manuals</Text>
          <Text style={styles.resourceIcon}>🔗</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.resourceItem}>
          <Text style={styles.resourceTitle}>Technical Documentation</Text>
          <Text style={styles.resourceIcon}>🔗</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.resourceItem}>
          <Text style={styles.resourceTitle}>Video Tutorials</Text>
          <Text style={styles.resourceIcon}>🔗</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  contentContainer: {
    padding: 16,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 8,
  },
  pageSubtitle: {
    fontSize: 16,
    color: "#6B7280",
    marginBottom: 24,
  },
  contactInfoContainer: {
    marginBottom: 24,
  },
  contactInfoCard: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#EFF6FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  icon: {
    fontSize: 20,
  },
  contactInfoText: {
    flex: 1,
  },
  contactInfoTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 4,
  },
  contactInfoValue: {
    fontSize: 14,
    color: "#4B5563",
    lineHeight: 20,
  },
  formContainer: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 16,
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#4B5563",
    marginBottom: 6,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    backgroundColor: "#F9FAFB",
    paddingHorizontal: 12,
    fontSize: 16,
    color: "#1F2937",
  },
  textArea: {
    height: 120,
    paddingTop: 12,
  },
  submitButton: {
    backgroundColor: Colors.brand.primary,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  faqContainer: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  faqItem: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  faqQuestion: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 8,
  },
  faqAnswer: {
    fontSize: 14,
    color: "#4B5563",
    lineHeight: 20,
  },
  resourcesContainer: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  resourceItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  resourceTitle: {
    fontSize: 16,
    color: "#1F2937",
  },
  resourceIcon: {
    fontSize: 16,
  },
});
