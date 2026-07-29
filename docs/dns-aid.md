# DNS-AID — registros de DNS para descoberta por agentes

Esta é a única parte da checagem de "agent readiness" que **não** pode ser
resolvida no código: DNS-AID
([draft-mozleywilliams-dnsop-dnsaid](https://datatracker.ietf.org/doc/draft-mozleywilliams-dnsop-dnsaid/))
exige registros na zona de `carlosmiguel.dev.br`. Faça no painel do provedor de
DNS (Cloudflare, Registro.br, etc.).

## Registros

Registros SVCB/HTTPS em ServiceMode (prioridade ≥ 1), no namespace `_agents`:

```dns
; Entrypoint de índice — é este que o scanner procura.
_index._agents.carlosmiguel.dev.br.  3600  IN  HTTPS  1 www.carlosmiguel.dev.br. alpn="h2,h3" port=443

; Opcional: endpoint agent-to-agent, se um dia existir um serviço A2A.
; _a2a._agents.carlosmiguel.dev.br.  3600  IN  SVCB   1 www.carlosmiguel.dev.br. alpn="a2a" port=443
```

Notas:

- `HTTPS` é o tipo certo quando o endpoint é HTTP sobre TLS; `SVCB` é o genérico
  usado para outros protocolos (ex.: `alpn="a2a"`).
- Prioridade `0` seria AliasMode. DNS-AID pede **ServiceMode**, então use `1`.
- Parâmetros custom do draft ainda não têm keys registradas: use a forma
  numérica `keyNNNNN=...` se precisar de algum, e confira os nomes na versão
  atual do draft antes de publicar — eles mudam entre revisões.
- `mandatory=` só é necessário se algum parâmetro for obrigatório para o
  cliente entender o registro.

## Cloudflare (caminho mais curto)

DNS → Records → Add record → Type `HTTPS`:

- **Name:** `_index._agents`
- **Priority:** `1`
- **Target:** `www.carlosmiguel.dev.br`
- **Params:** `alpn="h2,h3" port=443`

## DNSSEC (obrigatório)

O scanner só aceita dados autenticados: assine a zona com DNSSEC. Na
Cloudflare, DNS → Settings → DNSSEC → Enable, e depois cadastre o registro DS
gerado no Registro.br (painel do domínio → DNSSEC).

## Verificação

```bash
# Direto no resolver da Cloudflare, via DNS-over-HTTPS (é assim que o scanner testa).
curl -s -H 'accept: application/dns-json' \
  'https://cloudflare-dns.com/dns-query?name=_index._agents.carlosmiguel.dev.br&type=HTTPS' | jq

# DNSSEC validado? Procure "AD": true.
curl -s -H 'accept: application/dns-json' \
  'https://dns.google/resolve?name=_index._agents.carlosmiguel.dev.br&type=HTTPS&do=1' | jq '.AD, .Answer'

dig +dnssec _index._agents.carlosmiguel.dev.br HTTPS
```

A propagação leva de minutos a algumas horas; o DS no registrador pode levar
mais.
