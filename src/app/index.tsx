import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Inicio() {
  return (
    <SafeAreaView style={estilos.container}>
      <View style={estilos.conteudo}>
        <Text style={estilos.titulo}>Controle da Missão Marte</Text>
        <Text style={estilos.descricao}>
          Plataforma de comunicação com a equipe de controle em Terra.
        </Text>

        <Link href="/login" asChild>
          <Pressable style={estilos.botaoPrimario}>
            <Text style={estilos.textoBotaoPrimario}>Entrar</Text>
          </Pressable>
        </Link>

        <Link href="/cadastro" asChild>
          <Pressable style={estilos.botaoSecundario}>
            <Text style={estilos.textoBotaoSecundario}>Cadastre-se</Text>
          </Pressable>
        </Link>
      </View>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#09090b",
  },
  conteudo: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    gap: 12,
  },
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#f4f4f5",
    textAlign: "center",
  },
  descricao: {
    fontSize: 16,
    color: "#a1a1aa",
    textAlign: "center",
    marginBottom: 24,
  },
  botaoPrimario: {
    backgroundColor: "#f97316",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  textoBotaoPrimario: {
    color: "white",
    fontWeight: "600",
  },
  botaoSecundario: {
    borderColor: "#3f3f46",
    borderWidth: 1,
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  textoBotaoSecundario: {
    color: "#f4f4f5",
  },
});
