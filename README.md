# 🧠 GMAT Prep - Teste de Lógica e Argumentação

Aplicação interativa para preparação de testes no estilo GMAT, cobrindo três tipos de questões: **Problem Solving**, **Data Sufficiency** e **Critical Reasoning**.

![React](https://img.shields.io/badge/React-18-61dafb?logo=react)
![Vite](https://img.shields.io/badge/Vite-6-646cff?logo=vite)
![License](https://img.shields.io/badge/License-MIT-green)

## Features

- 📚 **Módulo de aprendizado** — Explicações detalhadas e estratégias para cada tipo de questão
- 🎯 **Prática por tipo** — Banco de questões separado por categoria com gabarito e explicações
- 🏆 **Simulado cronometrado** — 15 questões mistas com timer de 2h e relatório de desempenho
- 📊 **Relatório de resultados** — Performance por tipo de questão ao final do simulado

## Stack

- React 18
- Vite 6
- CSS-in-JS (inline styles)
- GitHub Pages (deploy)

## Rodando localmente

```bash
# Instalar dependências
npm install

# Rodar em dev
npm run dev

# Build para produção
npm run build
```

## Deploy no GitHub Pages

```bash
# Certifique-se de que o repo está no GitHub, depois:
npm run deploy
```

> **Nota:** O `base` no `vite.config.js` está configurado como `/gmat-prep/`. Ajuste para o nome do seu repositório se for diferente.

## Estrutura

```
src/
├── App.jsx       # Componente principal com toda a lógica
├── main.jsx      # Entry point
└── index.css     # Estilos globais
```
