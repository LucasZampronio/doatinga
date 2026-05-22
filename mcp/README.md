# DoaTinga MCP Server

Este é um servidor MCP (Model Context Protocol) para o projeto DoaTinga. Ele permite que outros agentes de IA leiam a documentação e o histórico do projeto como recursos.

## Arquivos Incluídos:
- `GUIDE_ESTRUTURA.md`: Guia de arquitetura e organização do projeto.
- `SESSION_HISTORY.md`: Histórico completo de alterações e decisões tomadas.

## Como usar:
Para adicionar este servidor ao seu cliente MCP (como Claude Desktop ou Gemini CLI), adicione o comando:
`node <caminho_ate_esta_pasta>/index.js`

## Instalação:
1. `cd mcp`
2. `npm init -y`
3. `npm install @modelcontextprotocol/sdk`
