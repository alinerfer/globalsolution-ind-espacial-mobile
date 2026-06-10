import { StyleSheet, Text, View } from "react-native";

export default function Saude() {
  return (
    <View style={estilos.container}>
      <Text style={estilos.titulo}>Saúde</Text>
      <Text style={estilos.descricao}>
        Em breve: seus indicadores vitais.
      </Text>
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#09090b",
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#f4f4f5",
  },
  descricao: {
    fontSize: 14,
    color: "#a1a1aa",
    marginTop: 8,
  },
});
