import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";

export default function RootLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }}>
        {/* Página inicial */}
        <Stack.Screen name="index" />

        {/* Login ou autenticação (se usar no futuro) */}
        <Stack.Screen
          name="auth"
          options={{
            headerShown: true,
            headerTitle: "Bem-vindo(a)",
            headerTitleStyle: styles.authHeaderTitle,
          }}
        />

        {/* Abas principais (home, etc) */}
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </>
  );
}

const styles = StyleSheet.create({
  authHeaderTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
