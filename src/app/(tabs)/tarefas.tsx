import { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { buscarApi } from "@/lib/api";

type Tarefa = {
  id: number;
  titulo: string;
  descricao: string;
  prioridade: string;
  responsavel: string;
  status: string;
};

const coresPrioridade: Record<string, { bg: string; texto: string }> = {
  alta: { bg: "rgba(127,29,29,0.4)", texto: "#fca5a5" },
  media: { bg: "rgba(113,63,18,0.4)", texto: "#fde68a" },
  baixa: { bg: "#27272a", texto: "#d4d4d8" },
};

const coresStatus: Record<string, { bg: string; texto: string }> = {
  pendente: { bg: "#27272a", texto: "#d4d4d8" },
  "em andamento": { bg: "rgba(30,58,138,0.4)", texto: "#93c5fd" },
  concluida: { bg: "rgba(20,83,45,0.4)", texto: "#86efac" },
};

export default function Tarefas() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);

  async function buscar() {
    const resp = await buscarApi("/api/tarefas");
    const dados = await resp.json();
    setTarefas(dados);
  }

  useEffect(() => {
    buscar();
  }, []);

  async function mudarStatus(id: number, novoStatus: string) {
    await buscarApi(`/api/tarefas/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: novoStatus }),
    });
    buscar();
  }

  function botaoStatus(tarefa: Tarefa) {
    if (tarefa.status === "pendente") {
      return (
        <Pressable
          style={estilos.botao}
          onPress={() => mudarStatus(tarefa.id, "em andamento")}
        >
          <Text style={estilos.textoBotao}>Iniciar</Text>
        </Pressable>
      );
    }
    if (tarefa.status === "em andamento") {
      return (
        <Pressable
          style={estilos.botao}
          onPress={() => mudarStatus(tarefa.id, "concluida")}
        >
          <Text style={estilos.textoBotao}>Concluir</Text>
        </Pressable>
      );
    }
    return null;
  }

  return (
    <ScrollView
      style={estilos.container}
      contentContainerStyle={estilos.conteudo}
    >
      {tarefas.map((tarefa) => {
        const corP = coresPrioridade[tarefa.prioridade];
        const corS = coresStatus[tarefa.status];
        return (
          <View key={tarefa.id} style={estilos.card}>
            <View style={estilos.linhaTopo}>
              <Text style={estilos.titulo}>{tarefa.titulo}</Text>
              {corP && (
                <View
                  style={[estilos.badge, { backgroundColor: corP.bg }]}
                >
                  <Text style={[estilos.badgeTexto, { color: corP.texto }]}>
                    {tarefa.prioridade}
                  </Text>
                </View>
              )}
            </View>

            <Text style={estilos.descricao}>{tarefa.descricao}</Text>

            <View style={estilos.linhaBaixo}>
              <Text style={estilos.responsavel}>
                Responsável: {tarefa.responsavel}
              </Text>
              {corS && (
                <View
                  style={[estilos.badge, { backgroundColor: corS.bg }]}
                >
                  <Text style={[estilos.badgeTexto, { color: corS.texto }]}>
                    {tarefa.status}
                  </Text>
                </View>
              )}
            </View>

            {botaoStatus(tarefa)}
          </View>
        );
      })}
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#09090b",
  },
  conteudo: {
    padding: 16,
    gap: 12,
  },
  card: {
    borderColor: "#27272a",
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    gap: 8,
  },
  linhaTopo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  titulo: {
    color: "#f4f4f5",
    fontSize: 16,
    fontWeight: "600",
    flex: 1,
    marginRight: 8,
  },
  descricao: {
    color: "#a1a1aa",
    fontSize: 13,
  },
  linhaBaixo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  responsavel: {
    color: "#71717a",
    fontSize: 12,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  badgeTexto: {
    fontSize: 11,
    fontWeight: "500",
  },
  botao: {
    backgroundColor: "#f97316",
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 4,
  },
  textoBotao: {
    color: "white",
    fontWeight: "600",
    fontSize: 13,
  },
});
