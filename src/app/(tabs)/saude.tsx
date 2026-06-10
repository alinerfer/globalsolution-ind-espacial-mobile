import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { buscarApi } from "@/lib/api";

type Tripulante = {
  id: number;
  nome: string;
  papel: string;
  status: string;
  frequencia_cardiaca: number;
  pressao: string;
  temperatura: number;
  oxigenio: number;
};

const coresStatus: Record<string, { bg: string; texto: string }> = {
  estavel: { bg: "rgba(20,83,45,0.4)", texto: "#86efac" },
  atencao: { bg: "rgba(113,63,18,0.4)", texto: "#fde68a" },
  critico: { bg: "rgba(127,29,29,0.4)", texto: "#fca5a5" },
};

export default function Saude() {
  const [tripulantes, setTripulantes] = useState<Tripulante[]>([]);

  useEffect(() => {
    buscarApi("/api/saude")
      .then((r) => r.json())
      .then(setTripulantes);
  }, []);

  return (
    <ScrollView
      style={estilos.container}
      contentContainerStyle={estilos.conteudo}
    >
      {tripulantes.map((t) => {
        const cor = coresStatus[t.status];
        return (
          <View key={t.id} style={estilos.card}>
            <View style={estilos.linhaTopo}>
              <View style={{ flex: 1 }}>
                <Text style={estilos.nome}>{t.nome}</Text>
                <Text style={estilos.papel}>{t.papel}</Text>
              </View>
              {cor && (
                <View style={[estilos.badge, { backgroundColor: cor.bg }]}>
                  <Text style={[estilos.badgeTexto, { color: cor.texto }]}>
                    {t.status}
                  </Text>
                </View>
              )}
            </View>

            <View style={estilos.grade}>
              <View style={estilos.celula}>
                <Text style={estilos.rotulo}>Freq. cardíaca</Text>
                <Text style={estilos.valor}>{t.frequencia_cardiaca} bpm</Text>
              </View>
              <View style={estilos.celula}>
                <Text style={estilos.rotulo}>Pressão</Text>
                <Text style={estilos.valor}>{t.pressao} mmHg</Text>
              </View>
              <View style={estilos.celula}>
                <Text style={estilos.rotulo}>Temperatura</Text>
                <Text style={estilos.valor}>{t.temperatura} °C</Text>
              </View>
              <View style={estilos.celula}>
                <Text style={estilos.rotulo}>Oxigenação</Text>
                <Text style={estilos.valor}>{t.oxigenio}%</Text>
              </View>
            </View>
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
    gap: 12,
  },
  linhaTopo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  nome: {
    color: "#f4f4f5",
    fontSize: 16,
    fontWeight: "600",
  },
  papel: {
    color: "#a1a1aa",
    fontSize: 13,
    marginTop: 2,
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
  grade: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  celula: {
    width: "50%",
    paddingVertical: 4,
  },
  rotulo: {
    color: "#71717a",
    fontSize: 12,
  },
  valor: {
    color: "#f4f4f5",
    fontSize: 14,
    fontWeight: "600",
    marginTop: 2,
  },
});
