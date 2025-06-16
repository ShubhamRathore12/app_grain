import Colors from "@/constants/Colors";
import { useAuth } from "@/context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { usePathname, useRouter } from "expo-router";
import {
  ClipboardList,
  LayoutDashboard,
  LogOut,
  Monitor,
  Users,
} from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Add proper typing for the component props
interface DrawerContentProps extends DrawerContentComponentProps {
  // You can add any additional custom props here if needed
}

export default function DrawerContent(props: DrawerContentProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, signOut } = useAuth();

  // You can access the navigation props if needed
  const { state, navigation, descriptors } = props;

  const menuItems = [
    {
      title: "Overview",
      icon: <LayoutDashboard size={22} color={Colors.brand.drawerIcon} />,
      path: "/dashboard",
    },
    {
      title: "Devices",
      icon: <Monitor size={22} color={Colors.brand.drawerIcon} />,
      path: "/devices",
    },
    {
      title: "Contact Us",
      icon: <Users size={22} color={Colors.brand.drawerIcon} />,
      path: "/contact",
    },
    {
      title: "Registration",
      icon: <ClipboardList size={22} color={Colors.brand.drawerIcon} />,
      path: "/registration",
    },
    {
      title: "Reports",
      icon: <ClipboardList size={22} color={Colors.brand.drawerIcon} />,
      path: "/reports",
    },
  ];

  const [storedData, setStoredData] = useState<any>(null);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const storedValue = await AsyncStorage.getItem("value");
        if (storedValue) {
          const parsedData = JSON.parse(storedValue);
          setStoredData(parsedData);
        }
      } catch (error) {
        console.error("Error loading user data:", error);
      }
    };
    loadUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("value");
      await signOut();
      router.replace("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const navigateTo = (path: string) => {
    router.push(path);
  };

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>Grain Technik</Text>
        </View>
        <View style={styles.userContainer}>
          <View style={styles.userAvatar}>
            <Text style={styles.userInitial}>
              {storedData?.user?.firstName?.charAt(0) || "U"}
            </Text>
          </View>
          <Text style={styles.userName}>
            {storedData?.user?.firstName || "User"}
          </Text>
        </View>
      </View>

      <ScrollView style={styles.menuContainer}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.menuItem,
              isActive(item.path) && styles.activeMenuItem,
            ]}
            onPress={() => navigateTo(item.path)}
          >
            {item.icon}
            <Text
              style={[
                styles.menuItemText,
                isActive(item.path) && styles.activeMenuItemText,
              ]}
            >
              {item.title}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <LogOut size={22} color={Colors.brand.drawerIcon} />
        <Text style={styles.logoutText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.brand.drawer,
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  logoText: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.brand.drawerText,
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  userAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#374151",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  userInitial: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  userName: {
    color: Colors.brand.drawerText,
    fontSize: 16,
    fontWeight: "500",
  },
  menuContainer: {
    flex: 1,
    paddingTop: 10,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginBottom: 5,
  },
  activeMenuItem: {
    backgroundColor: "rgba(59, 130, 246, 0.1)",
    borderLeftWidth: 3,
    borderLeftColor: Colors.brand.primary,
  },
  menuItemText: {
    fontSize: 16,
    marginLeft: 15,
    color: Colors.brand.drawerText,
  },
  activeMenuItemText: {
    fontWeight: "600",
    color: "white",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.1)",
  },
  logoutText: {
    fontSize: 16,
    marginLeft: 15,
    color: Colors.brand.drawerText,
  },
});
