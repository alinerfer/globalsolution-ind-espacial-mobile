# Controle da Missão Marte — App

App da tripulação em Marte. Conecta com a API do web pra trocar mensagens com a Terra, ver tarefas e indicadores de saúde.

Projeto Global Solution FIAP — 2TWDOR — 2º semestre 2026.

## Stack

- Expo (React Native)
- Expo Router (navegação)
- TypeScript

## Como rodar

Antes: rode o web (`../web`) e descubra o IP da sua máquina na rede local. Coloca o IP em `src/lib/config.ts`.

Depois:

```
npm install
npm start
```

Lê o QR code no Expo Go (Android) ou Câmera (iOS). Celular precisa estar na mesma rede que a máquina.

## Estrutura

- `src/app/` — telas e navegação (Expo Router)
- `src/app/(tabs)/` — abas: mensagens, tarefas, saúde
- `src/lib/` — helpers (sessão em memória, fetch com Bearer, config)
