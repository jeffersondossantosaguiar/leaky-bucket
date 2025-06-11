# 🧩 Woovi Token Bucket Challenge

## 📌 A FAZER

### 🔧 Backend

- [x] Iniciar projeto Node.js com Koa.js + TypeScript
- [x] Configurar ESLint, Prettier e tsconfig
- [x] Estruturar diretórios
- [x] Implementar autenticação via Bearer Token
- [x] Criar middleware para autenticação e extração do usuário
- [x] Implementar multi-tenant (tokens por usuário)
- [x] Configurar Koa com GraphQl
- [x] Criar mutation `simulatePixTransaction`
- [x] Implementar estratégia Token Bucket:
  - [x] Consumir 1 token por requisição
  - [x] Se falhar, perder 1 token
  - [x] A cada 1h, adicionar 1 token até no máximo 10
- [x] Criar testes Unitários:
  - [x] Consumo de tokens
  - [x] Simulação de falhas
  - [x] Regeneração automática
- [ ] Criar coleção Postman para a API
- [ ] Criar README com instruções de execução e uso

### 💣 Hardcore - BACEN

- [ ] Estudar documentação oficial do BACEN DICT
- [ ] Implementar regras de limitação de requisição:
  - [ ] Janela de tempo
  - [ ] IP/tenant
  - [ ] Tipos de endpoint
  - [ ] Bloqueio temporário

### 💻 Frontend (React + Relay)

- [x] Criar projeto React com TypeScript
- [ ] Configurar Relay com GraphQL
- [ ] Criar formulário com dois campos:
  - [ ] Chave Pix
  - [ ] Valor
- [ ] Criar mutation para iniciar transação Pix
- [ ] Exibir resultado da transação (sucesso/erro)
- [ ] Incluir autenticação com Bearer Token nas requisições
- [ ] Exibir número de tokens restantes (opcional)
- [ ] Adicionar feedback visual e validações
