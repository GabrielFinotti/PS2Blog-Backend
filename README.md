<div align="center">

# 🎮 PS2Blog Backend API

[![Version](https://img.shields.io/badge/version-2.0.0-blue.svg?style=flat-square)](https://github.com/GabrielHFinotti/PS2Blog-Backend)
[![License](https://img.shields.io/badge/license-ISC-green.svg?style=flat-square)](LICENSE)
[![Node.js](https://img.shields.io/badge/node.js-18.x-brightgreen.svg?style=flat-square)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/typescript-5.4.5-blue.svg?style=flat-square)](https://www.typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/mongodb-latest-green.svg?style=flat-square)](https://www.mongodb.com/)
[![Express](https://img.shields.io/badge/express-4.19.2-lightgrey.svg?style=flat-square)](https://expressjs.com/)

*API RESTful moderna para gerenciamento de catálogo de jogos PlayStation 2*

[🚀 Início Rápido](#-início-rápido) • [📖 Documentação](#-documentação-da-api) • [🛠️ Tecnologias](#️-stack-tecnológica) • [🤝 Contribuição](#-contribuição)

</div>

---

## 📋 Sobre o Projeto

PS2Blog Backend é uma **API RESTful robusta** desenvolvida em TypeScript que serve como backend para uma plataforma de catálogo e comunidade dedicada aos jogos clássicos do PlayStation 2.

### ✨ Principais Funcionalidades

- 🔐 **Autenticação JWT** com middleware de segurança
- 👥 **Gerenciamento de usuários** com perfis personalizáveis
- 🎮 **Catálogo completo** com mais de 2000+ jogos PS2
- 💬 **Sistema social** com comentários e likes
- 🔍 **Busca avançada** por nome, categoria e ano
- ⚡ **Cache inteligente** para performance otimizada
- 🤖 **Automação** com jobs cron para atualizações
- 🌐 **Integração** com API MobyGames

## 🛠️ Stack Tecnológica

### Core

```bash
Node.js + TypeScript + Express + MongoDB
```

### Principais Dependências

| Tecnologia | Versão | Propósito |
|-----------|--------|-----------|
| **Express** | 4.19.2 | Framework web |
| **MongoDB** | 8.4.1 | Banco de dados NoSQL |
| **Mongoose** | 8.4.1 | ODM para MongoDB |
| **JWT** | 9.0.2 | Autenticação segura |
| **bcrypt** | 5.1.1 | Criptografia de senhas |
| **node-cron** | 3.0.3 | Agendamento de tarefas |
| **axios** | 1.7.2 | Cliente HTTP |

### Ferramentas de Desenvolvimento

- **tsx** - Executor TypeScript com hot-reload
- **tsup** - Bundler otimizado
- **vitest** - Framework de testes moderno

## 🚀 Início Rápido

### Pré-requisitos

- **Node.js** 18+
- **MongoDB** (local ou Atlas)
- **API Key MobyGames** ([Obter aqui](https://www.mobygames.com/info/api/))

### ⚡ Instalação Rápida

```bash
# Clone o repositório
git clone https://github.com/GabrielHFinotti/PS2Blog-Backend.git
cd PS2Blog-Backend

# Instale as dependências
npm install

# Configure o ambiente
cp .env.example src/env/.env
# Edite src/env/.env com suas configurações

# Crie pastas necessárias
mkdir -p src/cache/gameList

# Execute em desenvolvimento
npm run dev
```

### 🔧 Configuração do Ambiente

Crie o arquivo `src/env/.env`:

```env
# Aplicação
PORT=5000
CLIENT_URL=http://localhost:3000

# Banco de Dados
DB_NAME=ps2blog
DB_URL=mongodb://localhost:27017

# Segurança
SECRET_KEY=sua_chave_jwt_super_secreta

# APIs Externas
MOBY_API_KEY=sua_chave_api_mobygames
```

### 📦 Scripts Disponíveis

```bash
npm run dev     # Desenvolvimento com hot-reload
npm run build   # Build para produção
npm start       # Executa versão de produção
npm test        # Executa testes
```

## 📖 Documentação da API

### 🔐 Autenticação

Todas as rotas protegidas requerem o header:

```
Authorization: Bearer <jwt_token>
```

#### Endpoints de Autenticação

| Método | Endpoint | Descrição | Autenticação |
|--------|----------|-----------|--------------|
| `POST` | `/auth/register` | Registro de usuário | ❌ |
| `POST` | `/auth/login` | Login | ❌ |

<details>
<summary><strong>POST /auth/register</strong></summary>

**Request Body:**

```json
{
  "username": "string (6-16 chars)",
  "email": "string (valid email)",
  "password": "string (min 6 chars)"
}
```

**Response (201):**

```json
{
  "message": "User registered successfully",
  "userId": "507f1f77bcf86cd799439011"
}
```

</details>

<details>
<summary><strong>POST /auth/login</strong></summary>

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "userpassword"
}
```

**Response (200):**

```json
{
  "message": "Save loaded successfully, good play!",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

</details>

### 👤 Gerenciamento de Usuários

| Método | Endpoint | Descrição | Autenticação |
|--------|----------|-----------|--------------|
| `GET` | `/user/data` | Dados do usuário | ✅ |
| `PUT` | `/user/data/update` | Atualizar perfil | ✅ |
| `DELETE` | `/user/data/delete` | Deletar conta | ✅ |

<details>
<summary><strong>GET /user/data</strong></summary>

**Response (200):**

```json
{
  "_id": "507f1f77bcf86cd799439011",
  "username": "gamer123",
  "email": "gamer@example.com",
  "bio": "Passionate PS2 gamer since 2000!",
  "image": "https://example.com/avatar.jpg",
  "likedGames": {
    "totalLikes": 42,
    "games": [
      { "gameId": "507f1f77bcf86cd799439012" }
    ]
  },
  "createdAt": "2024-01-15T10:30:00.000Z"
}
```

</details>

### 🎮 Catálogo de Jogos

| Método | Endpoint | Descrição | Query Params |
|--------|----------|-----------|--------------|
| `GET` | `/games` | Lista jogos | `name`, `category`, `release`, `limit`, `page` |
| `GET` | `/games/rating` | Por rating | `limit`, `page` |
| `GET` | `/games/likes` | Por likes | `limit`, `page` |
| `GET` | `/games/categoriesAndYears` | Filtros disponíveis | - |
| `GET` | `/games/data/:gameId` | Dados do jogo | - |

<details>
<summary><strong>GET /games (Busca com Filtros)</strong></summary>

**Query Parameters:**

- `name` (string): Nome do jogo
- `category` (string): Categoria do jogo
- `release` (string): Ano de lançamento
- `limit` (number): Limite por página (padrão: 20)
- `page` (number): Página atual (padrão: 1)

**Exemplo:**

```
GET /games?name=Final&category=RPG&release=2004&limit=10&page=1
```

**Response (200):**

```json
{
  "games": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "name": "Final Fantasy XII",
      "release": "2004",
      "category": "RPG",
      "rating": 8.5,
      "image": "https://example.com/ffxii.jpg",
      "plataforms": [{"name": "PlayStation 2"}],
      "likes": {
        "totalLikes": 156,
        "users": []
      },
      "comments": []
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalGames": 47,
    "hasNext": true,
    "hasPrev": false
  }
}
```

</details>

### 💫 Interações Sociais

| Método | Endpoint | Descrição | Autenticação |
|--------|----------|-----------|--------------|
| `PUT` | `/games/sendLike/:gameId` | Curtir jogo | ✅ |
| `PUT` | `/games/sendComment/:gameId` | Comentar | ✅ |
| `DELETE` | `/games/deleteLike/:gameId` | Remover like | ✅ |
| `DELETE` | `/games/deleteComment/:gameId` | Remover comentário | ✅ |

<details>
<summary><strong>PUT /games/sendComment/:gameId</strong></summary>

**Request Body:**

```json
{
  "comment": "Este jogo é incrível! Uma obra-prima do PS2."
}
```

**Response (200):**

```json
{
  "message": "Comment added successfully",
  "commentId": "507f1f77bcf86cd799439013"
}
```

</details>

## 🏗️ Arquitetura do Projeto

```
src/
├── 📁 controllers/          # Lógica de negócio
│   ├── 📁 gameList/        # Controllers de jogos
│   └── 📁 user/            # Controllers de usuários
├── 📁 models/              # Schemas Mongoose
├── 📁 routers/             # Definição de rotas
├── 📁 middleware/          # Middlewares (auth, cors, etc)
├── 📁 interfaces/          # Tipos TypeScript
├── 📁 jobs/                # Automação e jobs
│   ├── 📁 apis/           # Integrações externas
│   └── 📁 cron/           # Tarefas agendadas
├── 📁 utils/               # Funções utilitárias
├── 📁 cache/               # Sistema de cache
└── 📄 server.ts           # Entry point
```

## 🤖 Automação e Jobs

### 📅 Tarefas Agendadas

| Job | Frequência | Descrição |
|-----|------------|-----------|
| **Game List Update** | Trimestral | Atualiza catálogo via MobyGames API |
| **Cache Generation** | Mensal | Gera cache otimizado para consultas |

```typescript
// Configuração dos Cron Jobs
gameListUpdate: "0 0 1 */3 *"    // 1º dia de cada trimestre
createGameListCache: "0 0 5 * *"  // 5º dia de cada mês
```
