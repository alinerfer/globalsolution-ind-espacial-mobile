import { StyleSheet, Text, View } from "react-native";

export default function Tarefas() {
  return (
    <View style={estilos.container}>
      <Text style={estilos.titulo}>Tarefas</Text>
      <Text style={estilos.descricao}>
        Em breve: atividades atribuídas pela Terra.
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
