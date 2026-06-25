# Belisco's Bistrô Café — Site Institucional

Site institucional do Belisco's Bistrô Café, posicionado como casa de eventos em São Lourenço da Mata — PE. Desenvolvido com React + TypeScript + Vite + Tailwind CSS.

## Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- TanStack Router

## Como rodar localmente

```bash
npm install
npm run dev
```

Acesse `http://localhost:8080`

## Como fazer o build

```bash
npm run build
```

## Estrutura

```
src/
├── assets/          # Imagens do site
├── components/      # Componentes reutilizáveis
├── routes/
│   └── index.tsx    # Página principal (todas as seções)
└── styles.css       # Estilos globais e variáveis CSS
```

## Variáveis para atualizar

Antes de publicar, atualize as constantes no topo de `src/routes/index.tsx`:

```ts
const WHATSAPP = "https://wa.me/55XXXXXXXXXX";   // número do WhatsApp
const PHONE    = "tel:+55XXXXXXXXXXX";            // telefone
```

## Acesso

O site está disponível em: [beliscos-cafe.vercel.app](https://beliscos-cafe.vercel.app)

## Deploy

O projeto está hospedado na Vercel conectado ao repositório GitHub `santana-x5/beliscoscafeteria`. Qualquer push na branch `main` dispara um novo deploy automaticamente.
