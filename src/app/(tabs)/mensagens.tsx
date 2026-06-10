import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { buscarApi } from "@/lib/api";

type Mensagem = {
  id: number;
  de: string;
  origem: string;
  corpo: string;
  enviada_em: number;
  status: string;
};

function formatarHorario(timestamp: number) {
  const data = new Date(timestamp);
  const horas = String(data.getHours()).padStart(2, "0");
  const minutos = String(data.getMinutes()).padStart(2, "0");
  return `${horas}:${minutos}`;
}

const coresStatus: Record<string, string> = {
  pendente: "#facc15",
  entregue: "#60a5fa",
  lida: "#22c55e",
};

function PontoStatus({ status }: { status: string }) {
  const opacidade = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (status !== "pendente") {
      opacidade.setValue(1);
      return;
    }
    const animacao = Animated.loop(
      Animated.sequence([
        Animated.timing(opacidade, {
          toValue: 0.3,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(opacidade, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ])
    );
    animacao.start();
    return () => animacao.stop();
  }, [status, opacidade]);

  return (
    <Animated.View
      style={{
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: coresStatus[status] || "#71717a",
        opacity: opacidade,
      }}
    />
  );
}

export default function Mensagens() {
  const [mensagens, setMensagens] = useState<Mensagem[]>([]);
  const [novaMensagem, setNovaMensagem] = useState("");

  async function buscar() {
    const resp = await buscarApi("/api/mensagens");
    const dados = await resp.json();
    setMensagens(dados);
  }

  useEffect(() => {
    buscar();
    const id = setInterval(buscar, 3000);
    return () => clearInterval(id);
  }, []);

  async function enviar() {
    if (!novaMensagem.trim()) return;

    await buscarApi("/api/mensagens", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ corpo: novaMensagem, origem: "marte" }),
    });

    setNovaMensagem("");
    buscar();
  }

  return (
    <SafeAreaView style={estilos.container} edges={["bottom"]}>
      <ScrollView
        style={estilos.lista}
        contentContainerStyle={estilos.listaConteudo}
      >
        {mensagens.map((msg) => {
          const minha = msg.origem === "marte";
          return (
            <View
              key={msg.id}
              style={[
                estilos.linhaBalao,
                minha ? estilos.alinhaDireita : estilos.alinhaEsquerda,
              ]}
            >
              <View
                style={[
                  estilos.balao,
                  minha ? estilos.balaoMarte : estilos.balaoTerra,
                ]}
              >
                <Text style={estilos.autor}>{msg.de}</Text>
                <Text style={estilos.corpo}>{msg.corpo}</Text>
                <View style={estilos.linhaMeta}>
                  <Text style={estilos.meta}>
                    {formatarHorario(msg.enviada_em)} ·
                  </Text>
                  <PontoStatus status={msg.status} />
                  <Text style={estilos.meta}>{msg.status}</Text>
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>

      <View style={estilos.rodape}>
        <TextInput
          style={estilos.input}
          value={novaMensagem}
          onChangeText={setNovaMensagem}
          placeholder="Mensagem para a Terra..."
          placeholderTextColor="#52525b"
        />
        <Pressable style={estilos.botao} onPress={enviar}>
          <Text style={estilos.textoBotao}>Enviar</Text>
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
  lista: {
    flex: 1,
  },
  listaConteudo: {
    padding: 16,
    gap: 8,
  },
  linhaBalao: {
    flexDirection: "row",
  },
  alinhaDireita: {
    justifyContent: "flex-end",
  },
  alinhaEsquerda: {
    justifyContent: "flex-start",
  },
  balao: {
    maxWidth: "80%",
    padding: 10,
    borderRadius: 12,
  },
  balaoMarte: {
    backgroundColor: "#ea580c",
  },
  balaoTerra: {
    backgroundColor: "#27272a",
  },
  autor: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "600",
    marginBottom: 2,
  },
  corpo: {
    color: "#fff",
    fontSize: 14,
    marginBottom: 4,
  },
  linhaMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  meta: {
    color: "#fff",
    fontSize: 10,
    opacity: 0.7,
  },
  rodape: {
    flexDirection: "row",
    padding: 12,
    gap: 8,
    borderTopWidth: 1,
    borderTopColor: "#27272a",
  },
  input: {
    flex: 1,
    backgroundColor: "#18181b",
    borderColor: "#27272a",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: "#f4f4f5",
  },
  botao: {
    backgroundColor: "#f97316",
    paddingHorizontal: 16,
    justifyContent: "center",
    borderRadius: 8,
  },
  textoBotao: {
    color: "white",
    fontWeight: "600",
  },
});
