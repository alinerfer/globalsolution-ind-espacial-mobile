import { router, Tabs } from "expo-router";
import { Pressable, Text } from "react-native";

import { limparSessao } from "@/lib/sessao";

function BotaoSair() {
  function sair() {
    limparSessao();
    router.replace("/");
  }
  return (
    <Pressable onPress={sair} style={{ paddingHorizontal: 16 }}>
      <Text style={{ color: "#a1a1aa", fontSize: 14 }}>Sair</Text>
    </Pressable>
  );
}

export default function LayoutTabs() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: "#09090b" },
        headerTintColor: "#f4f4f5",
        headerRight: () => <BotaoSair />,
        tabBarStyle: { backgroundColor: "#09090b", borderTopColor: "#27272a" },
        tabBarActiveTintColor: "#f97316",
        tabBarInactiveTintColor: "#a1a1aa",
      }}
    >
      <Tabs.Screen name="mensagens" options={{ title: "Mensagens" }} />
      <Tabs.Screen name="tarefas" options={{ title: "Tarefas" }} />
      <Tabs.Screen name="saude" options={{ title: "Saúde" }} />
    </Tabs>
  );
}
