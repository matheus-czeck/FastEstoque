<h1>🏪 FastEstoque</h1>

<p>Sistema web full stack de gerenciamento de estoque com área pública para visualização de produtos e painel privado para funcionários autenticados.</p>

![Status](https://img.shields.io/badge/status-finalizado-green?style=flat-square)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-22+-339933?style=flat-square&logo=nodedotjs&logoColor=white)
![Angular](https://img.shields.io/badge/Angular-17+-DD0031?style=flat-square&logo=angular&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-17+-4169E1?style=flat-square&logo=postgresql&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=flat-square&logo=supabase&logoColor=white)

🌐 **[fastestoque.matheushcz.dev](https://fastestoque.matheushcz.dev)**

---

## 📖 Sobre o projeto

O **FastEstoque** é um sistema de gerenciamento de estoque que separa claramente a área pública da área privada. Qualquer visitante pode consultar os produtos disponíveis, mas apenas funcionários autenticados podem criar, editar ou remover itens do estoque.

A autenticação é gerenciada pelo Supabase Auth com tokens JWT, e o controle de acesso por roles permite que apenas administradores cadastrem novos funcionários.

> Desenvolvido com foco em boas práticas: arquitetura em camadas, testes unitários com TDD, CI/CD com GitHub Actions e deploy ponta a ponta.

---

## ✨ Funcionalidades

- [x] Vitrine pública com listagem e paginação de produtos
- [x] Autenticação de funcionários via Supabase Auth com JWT
- [x] Painel privado com CRUD completo de produtos
- [x] Cadastro de novos funcionários restrito a administradores (role admin)
- [x] Validações de negócio (nome mínimo 3 caracteres, preço maior que zero, quantidade máxima 1000)
- [x] Feedback visual com toasts de sucesso e erro
- [x] Testes unitários com Vitest — backend e frontend
- [x] CI/CD com GitHub Actions rodando testes a cada push
- [x] Deploy contínuo — backend no Railway, frontend no Netlify

---

## 🛠️ Tecnologias

**Back-end**
- [Node.js](https://nodejs.org/) — ambiente de execução JavaScript
- [TypeScript](https://www.typescriptlang.org/) — tipagem estática
- [Express](https://expressjs.com/) — framework web para construção da API
- [Prisma ORM](https://www.prisma.io/) — mapeamento objeto-relacional
- [Supabase Auth](https://supabase.com/) — autenticação e gerenciamento de usuários
- [Vitest](https://vitest.dev/) — testes unitários

**Front-end**
- [Angular 17](https://angular.io/) — framework SPA
- [PrimeNG](https://primeng.org/) — biblioteca de componentes UI
- [PrimeIcons](https://primeng.org/icons) — ícones

**Banco de Dados & Infraestrutura**
- [PostgreSQL](https://www.postgresql.org/) via Supabase — banco de dados relacional
- [Railway](https://railway.app/) — deploy do backend
- [Netlify](https://netlify.com/) — deploy do frontend
- [GitHub Actions](https://github.com/features/actions) — CI/CD

---

## 🏗️ Arquitetura

```
FastEstoque/
├── Back-end/
│   ├── src/
│   │   ├── @types/           # Extensão de tipos globais (Express Request)
│   │   ├── controllers/      # Camada de entrada — recebe e responde requisições
│   │   ├── services/         # Camada de negócio — regras e validações
│   │   │   └── __tests__/        # Testes unitários dos services
│   │   ├── repositories/     # Conexão com banco de dados e Supabase
│   │   ├── middlewares/      # Autenticação (auth) e controle de acesso (admin)
│   │   ├── routes/           # Definição dos endpoints
│   │   ├── dtos/             # Tipagem dos dados de entrada
│   │   ├── app.ts            # Configuração do Express e CORS
│   │   └── server.ts         # Inicialização do servidor
│   ├── prisma/
│   │   ├── migrations/       # Versionamento do banco de dados
│   │   └── schema.prisma     # Definição dos modelos
│   └── package.json
│
└── Front-end/
    └── fast-estoque/
        └── src/
            ├── app/
            │   ├── components/   # Componentes reutilizáveis (Navbar, ProductCard)
            │   ├── pages/        # Telas (show-case, login, panel)
            │   ├── services/     # Comunicação com a API
            │   │   └── __test__/ # Testes unitários dos services
            │   ├── guards/       # Proteção de rotas privadas
            │   ├── models/       # Interfaces TypeScript
            │   └── dtos/         # Tipagem dos dados de entrada
            └── environments/     # Configuração por ambiente (dev/prod)
```

-----

## 🗄️ Modelo de dados

```prisma
model Produtos {
  id         String   @id @default(uuid())
  name       String
  price      Decimal
  quantity   Int
  created_by String
  created_at DateTime @default(now())
  updated_at DateTime @updatedAt
}
```

---

## 🚀 Como rodar localmente

### Pré-requisitos

- Node.js 22+
- Conta no [Supabase](https://supabase.com/)
- npm

### Back-end

```bash
git clone https://github.com/matheus-czeck/FastEstoque
cd FastEstoque/Back-end
npm install
```

Crie o arquivo `.env` com as variáveis:

```env
DATABASE_URL="sua_connection_string_supabase"
SUPABASE_URL="https://seu-projeto.supabase.co"
SUPABASE_ANON_KEY="sua_anon_key"
SUPABASE_SERVICE_ROLE_KEY="sua_service_role_key"
ALLOWED_ORIGINS="http://localhost:4200"
```

```bash
# Rodar migrations
$env:DATABASE_URL="sua_direct_url_porta_5432"; npx prisma migrate dev

# Iniciar servidor
npm run dev
```

### Front-end

```bash
cd ../Front-end/fast-estoque
npm install
ng serve
```

Acesse `http://localhost:4200`.

---

## 🧪 Testes

```bash
# Back-end
cd Back-end
npm test

# Front-end
cd Front-end/fast-estoque
npm test
```

---

## 👨‍💻 Autor

**Matheus Henrique Czeck** — Estudante de Engenharia de Software · Full Stack Developer

[![LinkedIn](https://img.shields.io/badge/LinkedIn-matheus--hcz-0A66C2?style=flat-square&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/matheus-hcz/)
[![GitHub](https://img.shields.io/badge/GitHub-matheus--czeck-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/matheus-czeck)
