# Spike

Um e-commerce completamente funcional.

## Introdução

![spine](https://github.com/user-attachments/assets/96e6942e-a246-4853-b1ee-a8ce9fe02959)


 <img src="https://img.shields.io/static/v1?label=STATUS&message=DEVELOPING&color=000&style=for-the-badge"/> <img src="https://img.shields.io/static/v1?label=NODE&message=V20.18.1&color=000&style=for-the-badge"/> <img src="https://img.shields.io/static/v1?label=LICENSE&message=MIT&color=000&style=for-the-badge"/>

## Tecnologias

- Linguagem: [TypeScript](https://www.typescriptlang.org/)
- Biblioteca: [ReactJS](https://react.dev/)
- Framework: [Next.js](https://nextjs.org/)
- Componentes: [Shadcn-ui](https://ui.shadcn.com/)
- Conexão com API: [Axios](https://axios-http.com/docs/intro)
- Gerenciamento de estados http: [React Query](https://tanstack.com/query/latest/docs/framework/react/overview)
- Gerenciamento de estados: [Zustand](https://zustand-demo.pmnd.rs/)
- Gerenciamento de formulários: [React Hook Form](https://www.react-hook-form.com/)
- Validação: [Zod](https://zod.dev/)
- Pagamentos: [Stripe](https://stripe.com/)
- Testes: [Playwirght](https://playwright.dev/)

## Funcionalidades

- [x] Cadastro do usuário com nome, email e senha.
- [x] Autenticação JWT com email e senha.
- [x] Listagem de produtos
- [x] Carrinho de compras
- [x] Responsividade
- [x] Pagamentos via Stripe
- [x] Testes e2e com Playwright

## Instalação

Clone o repositório:

```bash
git clone https://github.com/izaiasmorais/spike
cd spike
```

Instale as dependências:

```bash
pnpm install
```

Configure o arquivo .env com suas credenciais:

```env
NEXT_PUBLIC_DEV_API_URL="http..."
NEXT_PUBLIC_APP_URL="http..."
NEXT_PUBLIC_STRIPE_PUBLIC_KEY="pk_test..."
STRIPE_SECRET_KEY="sk_test..."
```

## Executando o Projeto

Inicie o servidor:

```bash
pnpm dev
```

## Executando testes

Executar todos os testes no termial:

```bash
pnpm test
```

Executar todos os testes através da UI do Playwright:

```bash
pnpm play
```
