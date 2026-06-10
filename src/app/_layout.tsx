import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function LayoutRaiz() {
  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "#09090b" },
          headerTintColor: "#f4f4f5",
          contentStyle: { backgroundColor: "#09090b" },
        }}
      />
    </>
  );
}
