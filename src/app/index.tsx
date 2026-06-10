import { router } from "expo-router";
import { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { URL_API } from "@/lib/config";
import { salvarSessao } from "@/lib/sessao";

export default function Inicio() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  async function entrar() {
    setErro("");

    try {
      const resposta = await fetch(`${URL_API}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });

      const dados = await resposta.json();
      if (!resposta.ok) {
        setErro(dados.erro || "Erro ao entrar");
        return;
      }

      salvarSessao(dados.token, dados.nome);
      router.replace("/mensagens");
    } catch {
      setErro("Falha ao conectar com a Terra");
    }
  }

  return (
    <SafeAreaView style={estilos.container}>
      <View style={estilos.conteudo}>
        <Text style={estilos.titulo}>Controle da Missão Marte</Text>
        <Text style={estilos.descricao}>Acesso da tripulação</Text>

        {erro ? <Text style={estilos.erro}>{erro}</Text> : null}

        <View style={estilos.campo}>
          <Text style={estilos.rotulo}>Email</Text>
          <TextInput
            style={estilos.input}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            placeholderTextColor="#52525b"
          />
        </View>

        <View style={estilos.campo}>
          <Text style={estilos.rotulo}>Senha</Text>
          <TextInput
            style={estilos.input}
            value={senha}
            onChangeText={setSenha}
            secureTextEntry
            placeholderTextColor="#52525b"
          />
        </View>

        <Pressable style={estilos.botao} onPress={entrar}>
          <Text style={estilos.textoBotao}>Entrar</Text>
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
    fontSize: 14,
    color: "#a1a1aa",
    textAlign: "center",
    marginBottom: 24,
  },
  erro: {
    color: "#fca5a5",
    backgroundColor: "rgba(127,29,29,0.3)",
    borderColor: "#7f1d1d",
    borderWidth: 1,
    padding: 8,
    borderRadius: 6,
    fontSize: 14,
  },
  campo: {
    gap: 4,
  },
  rotulo: {
    color: "#f4f4f5",
    fontSize: 14,
  },
  input: {
    backgroundColor: "#18181b",
    borderColor: "#27272a",
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    color: "#f4f4f5",
  },
  botao: {
    backgroundColor: "#f97316",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  textoBotao: {
    color: "white",
    fontWeight: "600",
  },
});
