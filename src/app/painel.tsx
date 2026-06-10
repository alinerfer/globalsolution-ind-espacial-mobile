import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { limparSessao, pegarNome } from "@/lib/sessao";

export default function Painel() {
  const nome = pegarNome();

  function sair() {
    limparSessao();
    router.replace("/");
  }

  return (
    <SafeAreaView style={estilos.container}>
      <View style={estilos.conteudo}>
        <Text style={estilos.saudacao}>Olá, {nome || "tripulante"}</Text>
        <Text style={estilos.descricao}>
          Painel da tripulação em Marte.
        </Text>

        <Pressable style={estilos.botaoSair} onPress={sair}>
          <Text style={estilos.textoBotaoSair}>Sair</Text>
        </Pressable>
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
    padding: 24,
    gap: 12,
  },
  saudacao: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#f4f4f5",
  },
  descricao: {
    fontSize: 14,
    color: "#a1a1aa",
    marginBottom: 24,
  },
  botaoSair: {
    borderColor: "#3f3f46",
    borderWidth: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    alignSelf: "flex-start",
  },
  textoBotaoSair: {
    color: "#f4f4f5",
  },
});
