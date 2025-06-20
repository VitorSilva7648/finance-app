import {
  View,
  StyleSheet,
  Pressable,
  Text,
  SafeAreaView,
  Platform,
  StatusBar,
} from "react-native";

import { Feather } from "@expo/vector-icons";
import { colors } from  "@/app/constants/colors";
import { useRouter } from "expo-router";

export function Header({ step, title }) {
  const router = useRouter();

  const handleBackPress = async () => {
    try {
      router.back(); // Tenta voltar para a tela anterior
    } catch (error) {
      //console.log("Não é possível voltar, redirecionando para a tela inicial.");
      router.push("/"); // Se falhar, vai para /home
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.row}>
          <Pressable onPress={handleBackPress}>
            <Feather name="arrow-left" size={24} color="#000" />
          </Pressable>

          <Text style={styles.text}>
            {step} {/*<Feather name="loader" size={16} color="#000" />*/}
          </Text>
        </View>

        <Text style={styles.title}>{title}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderBottomRightRadius: 14,
    borderBottomLeftRadius: 14,
    marginBottom: 14,
    // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight! + 34 : 34,
  },
  content: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 34,
    borderBottomRightRadius: 14,
    borderBottomLeftRadius: 14,
  },
  row: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  text: {
    fontSize: 18,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: colors.black,
  },
});
