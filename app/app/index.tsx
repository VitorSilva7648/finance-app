import { useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
//import { supabase } from "@/services/supabase";
import { colors } from "@/app/constants/colors";

export default function Index() {
  const router = useRouter();
  
  return (
    <View style={styles.container}>
     {/**  <Image source={require("@/assets/images/logo.png")} style={styles.logo} />*/}

      <Text style={styles.title}>Finance</Text>
      {/* <Text style={styles.text}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.
      </Text> */}

      <TouchableOpacity
        style={styles.buttonLogin}
        onPress={() => router.push("/home")}
      >
        <Text style={styles.buttonText}>Iniciar</Text>
      </TouchableOpacity>

      {/**   <TouchableOpacity style={styles.buttonRecover}>
        <Text style={styles.buttonTextRecover}>Esqueceu a senha?</Text>
      </TouchableOpacity> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 16,
    paddingRight: 16,
  },
  logo: {
    width: 111,
    height: 128,
    marginRight: 10,
    marginBottom: 18,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#007bff",
  },
  text: {
    fontSize: 16,
    color: colors.black,
    width: 240,
    textAlign: "center",
    marginTop: 8,
    marginBottom: 8,
  },
  buttonLogin: {
    backgroundColor: "#007bff",
    width: "100%",
    paddingVertical: 12,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 34,
  },
  buttonRecover: {
    width: "100%",
    height: 40,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
  },

  buttonText: {
    color: colors.black,
    fontSize: 16,
    fontWeight: "bold",
  },

  buttonTextRecover: {
    color: colors.black,
    fontSize: 12,
    fontWeight: "bold",
  },
});