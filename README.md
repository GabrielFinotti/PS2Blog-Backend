# 🎮 PS2Blog-Backend

![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)
![License](https://img.shields.io/badge/license-ISC-green.svg)
![Node](https://img.shields.io/badge/node-v14%2B-brightgreen.svg)

API RESTful para gerenciamento de um catálogo de jogos de PlayStation 2, com funcionalidades de autenticação, listagem, filtragem, comentários e sistema de curtidas.

## 📋 Sobre o Projeto

PS2Blog-Backend é uma API RESTful desenvolvida para servir como backend para uma aplicação de blog/catálogo dedicada a jogos de PlayStation 2. A API se integra com o serviço MobyGames para obter informações detalhadas sobre jogos e oferece um conjunto abrangente de funcionalidades para gerenciamento de usuários, comentários e interações.

O sistema possui mecanismos automatizados para atualização periódica do catálogo de jogos e implementa estratégias de cache para melhorar a performance e reduzir a carga no banco de dados.

## 🚀 Principais Recursos

- **Sistema de Autenticação**

  - Registro de novos usuários com validação de dados
  - Login com geração de tokens JWT
  - Opção de persistência de sessão (lembrar usuário)
  - Middleware de proteção de rotas

- **Gerenciamento de Usuários**

  - Perfis de usuário personalizáveis
  - Gerenciamento de informações pessoais
  - Histórico de curtidas em jogos

- **Catálogo de Jogos**

  - Listagem completa com paginação
  - Busca e filtragem por nome, categoria e ano
  - Detalhes completos de cada jogo

- **Interação com Jogos**

  - Sistema de curtidas
  - Sistema de comentários
  - Contagem de popularidade

- **Otimização de Performance**

  - Sistema de cache para consultas frequentes
  - Atualização periódica de dados em segundo plano

- **Integração Externa**
  - API MobyGames para obtenção de dados de jogos
  - Suporte opcional para Firebase Storage

## 🛠️ Tecnologias Utilizadas

### Backend e Infraestrutura

- **[Node.js](https://nodejs.org/)** - Ambiente de execução JavaScript
- **[TypeScript](https://www.typescriptlang.org/)** - Superset tipado de JavaScript
- **[Express](https://expressjs.com/)** - Framework web para Node.js
- **[MongoDB](https://www.mongodb.com/)** - Banco de dados NoSQL
- **[Mongoose](https://mongoosejs.com/)** - ODM (Object Data Modeling) para MongoDB

### Autenticação e Segurança

- **[JWT (JSON Web Tokens)](https://jwt.io/)** - Método seguro para autenticação
- **[bcrypt](https://www.npmjs.com/package/bcrypt)** - Criptografia de senhas

### Integração e Serviços

- **[Firebase Admin](https://firebase.google.com/docs/admin/setup)** - Serviços do Firebase (opcional)
- **[Axios](https://axios-http.com/)** - Cliente HTTP para requisições externas
- **[async-retry](https://www.npmjs.com/package/async-retry)** - Biblioteca para retry de operações

### Utilitários e Ferramentas

- **[node-cron](https://www.npmjs.com/package/node-cron)** - Agendamento de tarefas
- **[fs-extra](https://www.npmjs.com/package/fs-extra)** - Extensão para manipulação de arquivos
- **[dotenv](https://www.npmjs.com/package/dotenv)** - Gerenciamento de variáveis de ambiente
- **[cors](https://www.npmjs.com/package/cors)** - Middleware para habilitar CORS

### Desenvolvimento e Testes

- **[tsx](https://www.npmjs.com/package/tsx)** - Executor de TypeScript com suporte a ESM
- **[tsup](https://www.npmjs.com/package/tsup)** - Bundler TypeScript
- **[vitest](https://vitest.dev/)** - Framework de testes

## 📦 Estrutura do Projeto

```
src/
├── cache/           # Armazenamento de cache
│   └── gameList/    # Cache da lista de jogos
├── controllers/     # Controladores da aplicação
│   ├── gameList/    # Controladores relacionados a jogos
│   └── user/        # Controladores relacionados a usuários
├── db/              # Configurações de banco de dados
├── env/             # Configurações de ambiente
├── interfaces/      # Definições de tipos TypeScript
├── jobs/            # Tarefas agendadas
│   ├── apis/        # Integrações com APIs externas
│   └── cron/        # Tarefas agendadas com cron
├── middleware/      # Middlewares da aplicação
├── models/          # Modelos de dados (Mongoose)
├── routers/         # Rotas da aplicação
│   ├── gameList/    # Rotas para gerenciamento de jogos
│   └── user/        # Rotas para gerenciamento de usuários
├── secret/          # Arquivos secretos (não versionados)
├── utils/           # Funções utilitárias
│   ├── auth/        # Utilitários de autenticação
│   ├── cache/       # Utilitários de cache
│   ├── gameList/    # Utilitários para jogos
│   ├── temp/        # Utilitários temporários
│   └── user/        # Utilitários para usuários
└── server.ts        # Ponto de entrada da aplicação
```

## 🚀 Como Executar

### Pré-requisitos

- **Node.js** (v14+)
- **MongoDB** (local ou remoto)
- **Chave de API do MobyGames** - [Obter aqui](https://www.mobygames.com/info/api/)
- **(Opcional)** Conta Firebase para armazenamento de arquivos

### Configuração do Ambiente

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/seu-usuario/PS2Blog-Backend.git
   cd PS2Blog-Backend
   ```

2. **Instale as dependências:**

   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente:**
   Crie um arquivo `.env` na pasta `src/env/` seguindo o modelo:

   ```
   CLIENT_URL=http://localhost:3000  # URL do front-end para CORS
   DB_NAME=ps2blog                   # Nome do banco de dados
   DB_URL=mongodb://localhost:27017  # URL de conexão com MongoDB
   PORT=5000                         # Porta da aplicação
   SECRET_KEY=sua_chave_secreta_jwt  # Chave para assinar tokens JWT
   MOBY_API_KEY=sua_chave_api        # Chave de API do MobyGames
   ```

4. **(Opcional) Configure o Firebase:**
   Se desejar utilizar o Firebase para armazenamento, crie o arquivo de configuração em:

   ```
   src/secret/firebase.json
   ```

   Siga as instruções do Firebase para obter este arquivo de configuração.

5. **Crie as pastas necessárias:**
   ```bash
   mkdir -p src/cache/gameList
   ```

### Execução

#### Ambiente de Desenvolvimento

```bash
npm run dev
```

Este comando inicia o servidor com hot-reload para desenvolvimento.

#### Produção

```bash
# Compilar o projeto
npm run build

# Iniciar o servidor
npm start
```

#### Testes

```bash
npm test
```

## 📄 API Endpoints

### Autenticação

| Método | Endpoint         | Descrição              | Autenticação |
| ------ | ---------------- | ---------------------- | ------------ |
| `POST` | `/auth/register` | Registrar novo usuário | Não          |
| `POST` | `/auth/login`    | Login de usuário       | Não          |

#### Exemplo de Requisição (Registro)

```json
{
  "username": "user123",
  "email": "user@example.com",
  "password": "senha12345"
}
```

#### Exemplo de Resposta (Login)

```json
{
  "message": "Save loaded successfully, good play!",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Usuário

| Método   | Endpoint            | Descrição                  | Autenticação |
| -------- | ------------------- | -------------------------- | ------------ |
| `GET`    | `/user/data`        | Obter dados do usuário     | Sim          |
| `PUT`    | `/user/data/update` | Atualizar dados do usuário | Sim          |
| `DELETE` | `/user/data/delete` | Excluir usuário            | Sim          |

#### Exemplo de Requisição (Atualização)

```json
{
  "username": "novo_nome",
  "bio": "Nova biografia do usuário",
  "currentPass": "senha_atual",
  "password": "nova_senha"
}
```

### Jogos

| Método   | Endpoint                       | Descrição                           | Autenticação |
| -------- | ------------------------------ | ----------------------------------- | ------------ |
| `GET`    | `/games`                       | Listar jogos com filtros            | Sim          |
| `GET`    | `/games/rating`                | Listar jogos por classificação      | Sim          |
| `GET`    | `/games/likes`                 | Listar jogos por curtidas           | Sim          |
| `GET`    | `/games/categoriesAndYears`    | Obter categorias e anos disponíveis | Sim          |
| `GET`    | `/games/data/:gameId`          | Obter dados de um jogo específico   | Sim          |
| `PUT`    | `/games/sendLike/:gameId`      | Curtir um jogo                      | Sim          |
| `PUT`    | `/games/sendComment/:gameId`   | Comentar em um jogo                 | Sim          |
| `DELETE` | `/games/deleteLike/:gameId`    | Remover curtida                     | Sim          |
| `DELETE` | `/games/deleteComment/:gameId` | Remover comentário                  | Sim          |

#### Exemplo de Requisição (Filtragem de Jogos)

```
GET /games?name=Final&category=RPG&release=2004&limit=10&page=1
```

#### Exemplo de Requisição (Comentário)

```json
{
  "comment": "Este é um ótimo jogo! Recomendo a todos."
}
```

## 🔄 Processos Automáticos

A aplicação possui dois processos automáticos principais:

1. **Atualização do Catálogo de Jogos**

   - Execução: A cada 3 meses, no primeiro dia do mês, às 00:00 (América/Recife)
   - Função: Busca novos jogos na API do MobyGames e atualiza o banco de dados

2. **Geração de Cache**
   - Execução: A cada mês, no quinto dia, às 00:00 (América/Recife)
   - Função: Cria um cache da lista de jogos, categorias e anos para melhorar a performance

## 🏗️ Scripts do Projeto

| Comando         | Descrição                                                |
| --------------- | -------------------------------------------------------- |
| `npm run dev`   | Executa o projeto em modo desenvolvimento com hot-reload |
| `npm test`      | Executa os testes utilizando o Vitest                    |
| `npm run build` | Compila o projeto TypeScript para JavaScript             |
| `npm start`     | Inicia o projeto compilado para ambiente de produção     |

## 🐛 Solução de Problemas

### Erros Comuns

1. **Erro de Conexão com MongoDB**

   - Verifique se o MongoDB está em execução
   - Confirme se a URL de conexão está correta no arquivo `.env`

2. **Erro na API do MobyGames**

   - Verifique se a chave da API é válida
   - A API tem limite de requisições, verifique se não excedeu o limite

3. **Problemas com o Firebase**
   - Verifique se o arquivo `firebase.json` está configurado corretamente
   - Confirme se as permissões estão corretas no console do Firebase

## 📝 Licença

Este projeto está licenciado sob a licença ISC - veja o arquivo LICENSE para detalhes.

## 👨‍💻 Autor

**Gabriel H. Finotti**

- GitHub: [@seu-usuario](https://github.com/seu-usuario)

## 🤝 Contribuindo

Contribuições, issues e solicitações de features são bem-vindas!

1. Faça um fork do projeto
2. Crie sua branch de feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

---

<p align="center">
  Feito com ❤️ para a comunidade de fãs de PlayStation 2!
</p>
