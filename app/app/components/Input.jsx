import {
  View,
  StyleSheet,
  Text,
  TextInput,
  KeyboardTypeOptions,
} from "react-native";
import { Controller } from "react-hook-form";
import { colors } from "@/app/constants/colors";

export function Input({
  name,
  control,
  placeholder,
  rules,
  error,
  keyboardType,
  icon,
}) {
  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder={placeholder}
            onBlur={onBlur}
            value={value}
            onChangeText={onChange}
            keyboardType={keyboardType}
          />
        )}
      />
      {icon && <View style={styles.iconContainer}>{icon}</View>}
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    flexDirection: "row", // Alinha ícone e input horizontalmente
    alignItems: "center", // Centraliza verticalmente
    borderWidth: 1, // Adicione uma borda para visualização
    borderColor: "#ccc", // Cor da borda
    borderRadius: 4, // Borda arredondada
    paddingHorizontal: 10, // Espaçamento interno
    backgroundColor: colors.white,
  },
  input: {
    flex: 1, // Ocupa o espaço restante
    height: 50,
    backgroundColor: colors.white,
    marginRight: 10, // Espaço entre o input e o ícone
  },
  errorText: {
    color: "red",
    marginTop: 4,
  },
  iconContainer: {
    // Estilo do container do ícone
  },
});
