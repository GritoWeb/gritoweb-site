# Deploy — Cloudflare Workers

Este projeto usa **Next.js + Payload CMS** rodando em **Cloudflare Workers** com banco **D1** e storage **R2**.

---

## Pré-requisitos

1. **Node.js** e **pnpm** instalados
2. **Wrangler** autenticado na conta correta:
   ```bash
   wrangler login
   # Confirme com:
   wrangler whoami
   # Deve mostrar: suporte@gritoweb.com.br
   ```
3. Variáveis de ambiente configuradas no `.env` (veja `.env.example` se existir)

---

## Fluxo de deploy completo

### Passo 1 — Aplicar migrations ao D1 (banco remoto)

Sempre que houver mudanças no schema do Payload (novas collections, globals, campos), você precisa:

**1a. Gerar a migration:**
```bash
pnpm payload migrate:create
```
Isso cria um novo arquivo em `src/migrations/` e atualiza o `src/migrations/index.ts` automaticamente.

**1b. Aplicar a migration no D1 remoto:**
```bash
NODE_ENV=production PAYLOAD_SECRET=ignore pnpm payload migrate
```
> Aguarda ~1 minuto para rodar remotamente no D1.

### Passo 2 — Build + Deploy do Worker

```bash
pnpm run deploy:app
```

Se o comando `opennextjs-cloudflare deploy` travar com erro `ETIMEDOUT` (problema de conectividade com a API de preview da Cloudflare), use diretamente:

```bash
wrangler deploy
```

> O `wrangler deploy` detecta automaticamente o projeto OpenNext e chama o deploy corretamente.

---

## Comando rápido (quando não há mudança de schema)

```bash
wrangler deploy
```

---

## Quando usar cada abordagem

| Situação | O que fazer |
|---|---|
| Só mudou código (componentes, páginas, estilos) | `wrangler deploy` |
| Adicionou/alterou collection, global ou campo no Payload | `pnpm payload migrate:create` → `NODE_ENV=production PAYLOAD_SECRET=ignore pnpm payload migrate` → `wrangler deploy` |
| Primeira vez configurando o banco | Rodar todas as migrations: `NODE_ENV=production PAYLOAD_SECRET=ignore pnpm payload migrate` |

---

## Problemas conhecidos e soluções

### `ETIMEDOUT` ao rodar `pnpm run deploy` ou `pnpm run deploy:app`

O `opennextjs-cloudflare deploy` tenta criar uma sessão proxy remota para obter variáveis de ambiente e às vezes a conexão trava com timeout.

**Solução:** use `wrangler deploy` diretamente após o build estar pronto em `.open-next/`.

### `@ts-expect-error` unused — erro no build

Se o TypeScript resolver um tipo que antes precisava de supressão, o build quebra com:
```
Type error: Unused '@ts-expect-error' directive.
```
**Solução:** remover o comentário `@ts-expect-error` do arquivo indicado.

### `no such table` — 500 no site após deploy

O banco D1 não tem as tabelas necessárias. Acontece quando collections ou globals foram adicionados mas a migration não foi gerada/aplicada.

**Diagnóstico:**
```bash
wrangler tail --format json --status error
```
Se aparecer `D1_ERROR: no such table: <nome>`, é migration faltando.

**Solução:**
```bash
pnpm payload migrate:create
NODE_ENV=production PAYLOAD_SECRET=ignore pnpm payload migrate
```

### `generateStaticParams` quebrando o build

Funções `generateStaticParams` que consultam o banco D1 durante `next build` falham porque não há conexão remota disponível nesse contexto.

**Solução:** adicionar `export const dynamic = 'force-dynamic'` na page e remover o `generateStaticParams` (no Cloudflare Workers as páginas são servidas dinamicamente mesmo).

---

## Estrutura de recursos na Cloudflare

| Recurso | Nome | Binding |
|---|---|---|
| Worker | `grito-web` | — |
| Banco D1 | `cloudflare-payload-db` | `D1` |
| Storage R2 | `cloudflare-payload-r2` | `R2` |

**URL de produção:** https://grito-web.suporte-fd8.workers.dev

---

## Ver logs em tempo real

```bash
wrangler tail --format pretty
```

Para filtrar só erros:
```bash
wrangler tail --format json --status error
```
