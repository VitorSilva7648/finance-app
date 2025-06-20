import { Tabs } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "blue" }}>
      <Tabs.Screen
        name="index"
        options={{
          href: null, // Remove a rota da TabBar
        }}
      />
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false, // Desabilitar o header para esta tela
          // title: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialIcons size={28} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="stocks"
        options={{
          headerShown: false, // Desabilitar o header para esta tela
          // title: 'Animais',
          tabBarIcon: ({ color }) => (
            <MaterialIcons size={28} name="manage-search" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
