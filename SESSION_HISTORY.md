# Histórico da Sessão - Projeto DoaTinga

**Data:** 22 de Maio de 2026
**Objetivo:** Unificação, Refatoração, UI (Design Figma), e Deploy OCI.

## 1. Ações Realizadas

### 🏗️ Unificação e Dockerização
- Projeto transformado em Monorepo.
- Dockerizado com 3 serviços: Banco (Postgres), API (Node) e Web (React/Vite).
- **Portas ajustadas para evitar conflito com poa-transparente:**
  - **API:** 3005
  - **Web:** 5174
  - **DB (Host):** 5433

### 🎨 Frontend e Design
- Implementada tela de **Catálogo** com filtros funcionais (Bairro, Tipo, Turno).
- Implementada tela de **Detalhes do Item** com requisitos e horários.
- Implementado **Mapa Interativo** com pins laranjas e sidebar lateral.
- Implementado modal de **Recuperação de Senha** e fluxo de **Login/Cadastro**.
- Removidos todos os emojis e substituídos por **ícones SVG**.

### 🚀 Deploy e Pipeline
- Criado arquivo `.github/workflows/deploy.yml` para deploy automático na Oracle VM via SSH.

## 2. Como Rodar o Projeto

### Localmente
```bash
docker-compose up --build -d
```
- **Web:** `http://localhost:5174`
- **API:** `http://localhost:3005`

---
*Documento gerado automaticamente pelo Gemini CLI.*
