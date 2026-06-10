let tokenAtual: string | null = null;
let nomeAtual: string | null = null;

export function salvarSessao(token: string, nome: string) {
  tokenAtual = token;
  nomeAtual = nome;
}

export function pegarToken() {
  return tokenAtual;
}

export function pegarNome() {
  return nomeAtual;
}

export function limparSessao() {
  tokenAtual = null;
  nomeAtual = null;
}
