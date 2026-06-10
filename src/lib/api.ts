import { router } from "expo-router";

import { URL_API } from "@/lib/config";
import { limparSessao, pegarToken } from "@/lib/sessao";

export async function buscarApi(
  caminho: string,
  opcoes: RequestInit = {}
): Promise<Response> {
  const token = pegarToken();
  const resposta = await fetch(`${URL_API}${caminho}`, {
    ...opcoes,
    headers: {
      ...opcoes.headers,
      Authorization: `Bearer ${token}`,
    },
  });

  if (resposta.status === 401) {
    limparSessao();
    router.replace("/");
  }

  return resposta;
}
