<h1>🏪 FastEstoque</h1>

<p>API REST Full-stack — gerencie o estoque da sua loja com controle de acesso seguro por autenticação JWT.</p>

![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow?style=flat-square)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-22+-339933?style=flat-square&logo=nodedotjs&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-17+-4169E1?style=flat-square&logo=postgresql&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=flat-square&logo=supabase&logoColor=white)

---

## 📖 Sobre o projeto

O **FastEstoque** nasceu da necessidade de pequenos negócios terem controle real sobre seu estoque com segurança. Mais do que um CRUD simples, o objetivo é entregar um sistema onde qualquer pessoa pode consultar os produtos disponíveis, mas apenas funcionários autenticados podem gerenciar o estoque.

Este projeto resolve isso separando claramente a área pública da área privada, utilizando autenticação via Supabase Auth com tokens JWT para proteger as operações sensíveis.

> Projeto desenvolvido como prática de arquitetura REST com autenticação, testes unitários e deploy ponta a ponta, focado em consolidar boas práticas de desenvolvimento backend.

---

## ✨ Funcionalidades

- [x] Listagem pública de produtos (sem autenticação)
- [x] Autenticação de funcionários via Supabase Auth com JWT
- [x] Cadastro de produtos com nome, preço e quantidade
- [x] Edição de produtos autenticada
- [x] Exclusão de produtos autenticada
- [x] Validações de negócio 
- [x] Testes unitários com Vitest (AuthService e ProdutoService)

---

## 🛠️ Tecnologias

**Back-end**

- [Node.js](https://nodejs.org/) — ambiente de execução JavaScript
- [TypeScript](https://www.typescriptlang.org/) — superset com tipagem estática
- [Express](https://expressjs.com/) — framework web para construção da API
- [Prisma ORM](https://www.prisma.io/) — mapeamento objeto-relacional (ORM)
- [SupaBase](https://supabase.com/) — Servico Back-end e DataBase

**Front-end**

----EM DESENVOLVIMENTO -----

- [Angular 17](https://angular.io/) — framework SPA para a interface
- [PrimeNG](https://primeng.org/) — biblioteca de componentes de UI de alta performance
- [PrimeIcons](https://primeng.org/icons) — conjunto oficial de ícones do ecossistema Prime

**Banco de Dados & Infraestrutura**

- [SupaBase](https://supabase.com/) — BackEnd como servico 
- [Git](https://git-scm.com/) / [GitHub](https://github.com/) — controle de versão e hospedagem do código

---

## 🏗️ Arquitetura

```
FastEstoque/
├── Back-end/
│   ├── src/
│   │   ├── __test__        # Testes unitarios
│   │   ├── @types          # Tipos globais 
│   │   ├── controllers/    # Controladores que gerenciam as requisições das URLs
│   │   ├── dtos/           # Validação dos dados vindos do front-end
│   │   ├── repositories/   # Camada de comunicação com o Neon Postgres via Prisma
│   │   ├── routes/         # Definição dos endpoints da API
│   │   ├── services/       # Direcionamento de responsabilidades
│   │   ├── app.ts          # Inicialização e configuração do Express
│   │   ├── middlewares     # Autenticacao de usuario
│   │   └── server.ts       # Conexão com o banco de dados e inicialização do servidor
    │
    ├── prisma/
    │   ├── migrations/     # Versionamento estrutural do banco de dados
    │   └── schema.prisma   # Definição das tabelas de URLs e logs
    │
    └── package.json


```

---

## 🚀 Como rodar localmente

### Pré-requisitos

- Node.js 22+
- Conta no Neon.tech (ou instância local do PostgreSQL)
- npm

### Configuração

```bash
# 1. Clone o repositório
git clone https://github.com/matheus-czeck/FastEstoque
cd MenosLink
Back-end
```

```Bash
cd Back-end

```

```# Instale as dependências
npm install

```

```# Configure as variáveis de ambiente
cp .env.example .env

# Edite o arquivo .env adicionando a sua URL de conexão do Neon PostgreSQL:
# DATABASE_URL="postgresql://usuario:senha@ep-nome-da-instancia.neon.tech/menoslink?sslmode=require"


```

```# Execute as migrations para estruturar o banco
npx prisma migrate dev

```

```# Inicie o servidor de desenvolvimento
npm run dev

--- EM DESENVOLVIMENTO -----

Front-end
```

```Bash
cd ../Front-end/FastEstoque

```

```# Instale as dependências
npm install

```
```

```# Inicie a aplicação Angular
npm start
```

Abra seu navegador em http://localhost:4200.

---

```
```🗄️ Modelo de dados
Snippet de código

model Produtos {
id            String    @id @default(uuid())
nome          String
preco         Decimal
quantity      Int
created_by    String
created_at  DateTime  @default(now())
updated_at  DateTime  @updatedAt
}

---
```

👨‍💻 Autor
Matheus Henrique Czeck
Estudante de Engenharia de Software · Dev Web Full Stack em formação

[![LinkedIn](https://img.shields.io/badge/LinkedIn-matheus--hcz-0A66C2?style=flat-square&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/matheus-hcz/)
[![GitHub](https://img.shields.io/badge/GitHub-matheus--czeck-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/matheus-czeck)
