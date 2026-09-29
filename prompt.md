# Missão

Você é o **Tech Lead / Staff Software Engineer responsável por criar o repositório base de uma plataforma de desenvolvimento web full-stack**.

Sua missão nesta execução é **CRIAR O REPOSITÓRIO BASE**, e não simplesmente explicar como ele poderia ser criado.

O resultado deverá ser um monorepo pequeno, extremamente bem configurado, simples, rápido, sustentável e preparado para servir como template de futuros projetos web.

O repositório deve conter:

* infraestrutura mínima;
* backend mínimo;
* frontend mínimo;
* testes;
* tooling;
* CI mínima;
* documentação;
* convenções arquiteturais;
* configuração do Cursor;
* agentes especializados;
* um exemplo funcional mínimo end-to-end, Tracer Bullet.

O objetivo não é demonstrar quantidade de tecnologia.

O objetivo é estabelecer uma **fundação excelente para projetos futuros**.

---

# 1. Princípios fundamentais

Estas regras são permanentes e deverão ser incorporadas ao repositório para orientar todos os trabalhos futuros.

## 1.1 TDD é obrigatório

Adote **Test-Driven Development** como metodologia padrão.

O ciclo normal de desenvolvimento é:

```text
RED
↓
GREEN
↓
REFACTOR
↓
novo RED
↓
GREEN
↓
REFACTOR
```

Nunca implemente uma funcionalidade completa primeiro e escreva os testes depois.

Sempre que estivermos desenvolvendo comportamento novo:

1. escreva o menor teste que expresse o comportamento desejado;
2. execute o teste;
3. confirme que ele falha;
4. implemente a menor solução possível;
5. execute o teste;
6. confirme que passou;
7. refatore;
8. execute novamente os testes;
9. prossiga para o próximo comportamento.

Se eu explicitamente disser para ignorar TDD em determinada situação, você poderá fazê-lo somente naquele contexto.

Fora dessa exceção explícita, TDD é obrigatório.

---

# 2. Princípios de engenharia

Todas as decisões devem buscar, nesta ordem:

1. simplicidade;
2. clareza;
3. correção;
4. manutenibilidade;
5. performance;
6. extensibilidade.

Evite complexidade especulativa.

Não introduza abstrações "porque um dia podemos precisar".

Não crie:

* wrappers desnecessários;
* factories desnecessárias;
* interfaces sem necessidade;
* repositories genéricos;
* service layers artificiais;
* dependency injection frameworks;
* event buses;
* decorators;
* abstrações sobre abstrações;
* bibliotecas para problemas triviais.

Prefira código explícito e pequeno.

Uma solução menor e clara é preferível a uma solução "enterprise" mais complexa.

---

# 3. Tecnologias obrigatórias

Utilize:

* Node.js 24
* TypeScript 7
* pnpm
* Vite
* Vitest
* happy-dom
* SolidJS
* Biome
* Lefthook

No frontend:

* SolidJS
* Vite
* Vitest
* happy-dom
* Kobalte
* UnoCSS
* i18next
* solid-i18next

Evite adicionar qualquer outra biblioteca sem justificativa concreta.

**Justificativa para i18next:** strings de UI não devem ficar hardcoded nos componentes; i18next é a solução padrão da indústria para internacionalização, com suporte a interpolação, pluralização e lazy loading de locales sem introduzir abstrações proprietárias. `solid-i18next` é o adaptador mínimo para SolidJS.

## Regra importante sobre dependências

Antes de adicionar qualquer dependência:

1. verifique se o problema pode ser resolvido com a plataforma;
2. verifique se pode ser resolvido com TypeScript;
3. verifique se pode ser resolvido com uma pequena abstração local;
4. somente então considere uma dependência externa.

Toda dependência adicional deve possuir uma justificativa documentada.

---

# 4. Arquitetura

O repositório deve combinar conscientemente:

## TDD

Para desenvolvimento e evolução.

## Domain-Driven Design

Para organização do domínio e linguagem ubíqua.

Não implemente DDD cerimonial.

Use somente os conceitos que agregarem valor:

* domain;
* entities;
* value objects;
* aggregates;
* domain services;
* application/use cases;
* ports;
* adapters;

quando realmente necessários.

## Feature-Sliced Design

Principalmente no frontend.

Utilize FSD como ferramenta de organização e isolamento de responsabilidades, evitando transformar a arquitetura em burocracia.

A arquitetura deve permitir que uma aplicação pequena continue pequena.

---

# 5. Estrutura esperada

Proponha a estrutura final antes de implementá-la.

Como ponto de partida, considere algo próximo de:

```text
.
├── .cursor/
│   ├── agents/
│   │   ├── tech-lead.md
│   │   ├── product-manager.md
│   │   ├── designer.md
│   │   ├── backend-engineer.md
│   │   └── frontend-engineer.md
│   ├── rules/
│   │   ├── architecture.mdc
│   │   ├── tdd.mdc
│   │   ├── documentation.mdc
│   │   └── frontend.mdc
│   └── ...
│
├── apps/
│   ├── web/
│   └── api/
│
├── packages/
│   └── ...
│
├── docs/
│   ├── adr/
│   ├── plans/
│   └── architecture/
│
├── infra/
│   └── ...
│
├── .github/
│   └── workflows/
│
├── AGENTS.md
├── package.json
├── pnpm-workspace.yaml
├── pnpm-lock.yaml
├── tsconfig.json
├── biome.json
├── lefthook.yml
└── README.md
```

**Não assuma que essa estrutura é obrigatória.**

Antes de criá-la, avalie se todos esses diretórios são realmente necessários.

Se uma pasta não tiver uma responsabilidade real neste momento, não a crie.

---

# 6. Monorepo

Use pnpm workspaces.

O monorepo deverá permitir no futuro algo como:

```text
apps/
  web/
  api/

packages/
  ...
```

Mas não crie packages artificiais apenas para "mostrar" que é um monorepo.

Crie somente os packages necessários ao Tracer Bullet.

Evite compartilhamento prematuro.

---

# 7. Backend

O backend deverá ser deliberadamente pequeno.

Precisamos apenas de uma base que demonstre:

```text
HTTP
 ↓
application
 ↓
domain
```

e a direção das dependências.

O backend deve demonstrar pelo menos:

* uma entrada HTTP;
* um caso de uso;
* uma pequena regra de domínio;
* testes unitários;
* teste de integração apropriado;
* health check;
* tratamento básico de erros;
* configuração mínima.

Não introduza banco de dados nesta primeira versão, salvo se houver uma justificativa arquitetural muito forte.

Não introduza ORM.

Não introduza autenticação.

Não introduza filas.

Não introduza cache.

Não introduza observabilidade complexa.

O objetivo é demonstrar a fundação, não criar uma aplicação empresarial.

---

# 8. Frontend

O frontend deverá ser uma aplicação SolidJS extremamente pequena.

Deve demonstrar:

* inicialização da aplicação;
* estrutura Feature-Sliced;
* uma feature;
* consumo do backend;
* internacionalização com i18next (ver seção 9);
* estado mínimo;
* componente acessível quando necessário;
* styling mínimo;
* testes;
* build.

Use a menor quantidade possível de bibliotecas.

Kobalte e UnoCSS devem permanecer opcionais até que exista uma necessidade concreta no Tracer Bullet.

Não crie design system.

Não crie dezenas de componentes.

Não crie abstrações de UI prematuras.

---

# 9. Internacionalização (i18n)

O frontend deve usar **i18next** com **solid-i18next** para todas as strings visíveis ao usuário.

## 9.1 Princípios

* nenhuma string de UI hardcoded em componentes, páginas ou features;
* locale padrão: `en` (alinhado à regra de textos do repositório em inglês — seção 29);
* chaves de tradução em inglês como source of truth;
* configuração mínima; sem plugins ou middlewares desnecessários;
* sem over-engineering: não crie camadas de abstração sobre o i18next.

## 9.2 Dependências

Utilize apenas:

* `i18next`
* `solid-i18next`

Não adicione `i18next-http-backend`, `i18next-browser-languagedetector` ou outros plugins nesta primeira versão, salvo se o Tracer Bullet exigir de forma concreta.

Preferir import estático de arquivos JSON de locale no bundle inicial.

## 9.3 Organização (FSD)

Coloque a infraestrutura de i18n em `shared` e os arquivos de locale junto dela:

```text
apps/web/src/
  shared/
    lib/
      i18n/
        index.ts          # init + export da instância
        config.ts         # defaultLocale, fallback, namespaces
    locales/
      en/
        common.json       # strings compartilhadas (nav, actions, errors genéricos)
        <feature>.json    # strings específicas de feature, quando fizer sentido
```

Regras:

* namespaces por domínio de UI (`common`, nome da feature), não por componente;
* chaves descritivas e estáveis (`greeting.title`, `greeting.submit`), não frases literais como chave;
* interpolação via placeholders do i18next (`{{name}}`), não concatenação de strings;
* pluralização via sufixos do i18next (`key_one`, `key_other`) quando necessário;
* não duplique a mesma string em namespaces diferentes.

## 9.4 Uso nos componentes

* inicialize o i18next uma única vez na camada `app` (bootstrap);
* envolva a aplicação com o provider do `solid-i18next`;
* consuma traduções com `useTranslation()` nos componentes;
* mantenha lógica de negócio e formatação de dados fora dos arquivos JSON;
* atributos de acessibilidade (`aria-label`, `title`, `alt`) também passam pelo i18n.

Exemplo de uso esperado no Tracer Bullet:

```tsx
const { t } = useTranslation("greeting");
return <h1>{t("title")}</h1>;
```

## 9.5 Backend e i18n

Nesta fase, o backend retorna **dados**, não strings de UI traduzidas.

* códigos de erro estáveis (ex.: `GREETING_NAME_REQUIRED`), não mensagens localizadas;
* o frontend mapeia códigos para chaves i18n quando precisar exibir feedback ao usuário;
* não implemente negociação de locale via header `Accept-Language` nesta versão, salvo justificativa forte.

## 9.6 Testes

Com TDD:

* teste que componentes renderizam a chave/tradução esperada no locale padrão;
* teste interpolação e pluralização quando existirem;
* não teste o i18next em si — teste o comportamento da UI;
* happy-dom + locale fixo nos testes (`i18n.changeLanguage("en")` no setup, se necessário).

## 9.7 Escopo deliberadamente fora

Não implemente nesta primeira versão:

* seletor de idioma na UI;
* lazy loading de locales adicionais;
* RTL / layout espelhado;
* formatação de datas/números via `Intl` wrappers customizados;
* tradução de conteúdo vindo do backend;
* CMS ou pipeline de tradução;
* type-safe keys via codegen (ex.: typesafe-i18n).

Esses itens podem ser adicionados em projetos futuros sem refatorar a fundação, desde que a estrutura de `shared/lib/i18n` e `shared/locales` seja respeitada.

## 9.8 Documentação e ADR

* documente no README como adicionar namespaces, chaves e novos locales;
* crie ADR apenas se houver decisão não óbvia (ex.: escolha de locale padrão, estratégia de namespaces);
* inclua regra em `.cursor/rules/frontend.mdc` sobre proibição de strings hardcoded na UI.

---

# 10. Tracer Bullet

O repositório deve conter um exemplo mínimo que atravesse toda a stack.

O Tracer Bullet deve provar que:

```text
Browser
  ↓
SolidJS
  ↓
HTTP
  ↓
Backend
  ↓
Application Use Case
  ↓
Domain
  ↓
Response
  ↓
Frontend
```

funciona.

Escolha um domínio propositalmente simples.

Por exemplo:

```text
Greeting
```

ou outro domínio igualmente pequeno.

O exemplo deve ser pequeno o suficiente para que alguém consiga entender toda a arquitetura lendo poucos arquivos.

Todas as strings visíveis do Tracer Bullet devem passar pelo i18next (seção 9), inclusive labels, títulos, mensagens de erro e atributos de acessibilidade.

O Tracer Bullet é uma demonstração arquitetural, não um produto.

---

# 11. Testes

Configure Vitest de maneira consistente.

Utilize:

* ambiente Node para testes de backend;
* happy-dom para testes de frontend.

Crie comandos claros para:

```bash
pnpm test
pnpm test:watch
pnpm typecheck
pnpm lint
pnpm format
pnpm build
```

Os scripts podem ser ajustados caso uma nomenclatura melhor seja encontrada.

Todos os comandos devem funcionar a partir da raiz do monorepo.

---

# 12. Biome

Biome será responsável por:

* formatting;
* linting;
* organização de imports;
* regras básicas de qualidade.

Não duplique responsabilidade do Biome em ferramentas desnecessárias.

Não adicione ESLint ou Prettier (deixe configurado no repo).

Configure o Biome de maneira simples e consistente.

---

# 13. Lefthook

Configure Lefthook para executar verificações rápidas antes de commits.

O hook deve ser rápido o suficiente para não prejudicar o fluxo de desenvolvimento.

Considere:

```text
format check
lint
typecheck
tests relevantes
```

Não transforme o pre-commit em um pipeline lento.

Se alguma verificação pesada fizer mais sentido no CI, coloque-a no CI.

---

# 14. CI/CD

Crie uma pipeline mínima.

O CI deverá validar pelo menos:

1. instalação;
2. lint;
3. typecheck;
4. testes;
5. build.

Não implemente deploy nesta primeira fase.

Não implemente cloud específica.

Não acople o template a AWS, GCP, Azure, Vercel, Fly.io etc.

A fundação deve permanecer agnóstica.

---

# 15. Documentação

Utilize documentação baseada em convenções consolidadas.

Crie:

```text
README.md
docs/
  adr/
  plans/
  architecture/
```

## README

Deve explicar:

* objetivo do template;
* stack;
* pré-requisitos;
* instalação;
* comandos;
* estrutura;
* arquitetura;
* como executar;
* como testar;
* como criar novas features;
* como utilizar TDD;
* como adicionar e organizar traduções (i18next).

## ADRs

Use Architecture Decision Records.

Crie ADRs apenas para decisões arquiteturais relevantes.

Formato recomendado:

```text
docs/adr/0001-decision-name.md
```

Cada ADR deve conter:

```text
# Title

## Status

## Context

## Decision

## Consequences
```

Não crie ADR para decisões triviais.

## Plans

Planos devem ficar em:

```text
docs/plans/
```

Um plano deve registrar:

* objetivo;
* contexto;
* escopo;
* não-escopo;
* etapas;
* riscos;
* validação.

---

# 16. Cursor

O próprio repositório deve ensinar o Cursor a trabalhar nele.

Crie um `AGENTS.md` na raiz.

Crie também regras específicas em:

```text
.cursor/rules/
```

As regras devem cobrir, no mínimo:

* arquitetura;
* TDD;
* documentação;
* frontend;
* backend;
* qualidade de código;
* i18n (proibição de strings hardcoded na UI).

As regras devem ser curtas e complementares às ferramentas.

Não transforme regras em documentação gigante.

Use as regras para comportamentos que o agente deve sempre respeitar.

---

# 17. Agentes especializados

Crie subagents do Cursor em:

```text
.cursor/agents/
```

O formato deverá seguir o formato atualmente suportado pelo Cursor.

Crie inicialmente:

```text
tech-lead.md
product-manager.md
designer.md
backend-engineer.md
frontend-engineer.md
```

## Tech Lead

Responsabilidades:

* arquitetura;
* TDD;
* DDD;
* FSD;
* simplicidade;
* revisão técnica;
* decisões arquiteturais;
* ADRs;
* planos;
* coordenação dos demais agentes.

O Tech Lead deve ser o guardião das regras do projeto.

## Product Manager

Responsabilidades:

* transformar problemas em requisitos;
* definir escopo;
* critérios de aceitação;
* separar essencial de opcional;
* evitar scope creep;
* manter foco no valor entregue.

Não deve definir detalhes técnicos desnecessariamente.

## Designer

Responsabilidades:

* UX;
* acessibilidade;
* hierarquia visual;
* interação;
* consistência;
* simplicidade visual.

Deve trabalhar com a menor quantidade possível de componentes e dependências.

## Backend Engineer

Responsabilidades:

* backend;
* domínio;
* casos de uso;
* APIs;
* testes;
* performance;
* segurança;
* observabilidade quando necessária.

Deve respeitar TDD e DDD pragmático.

## Frontend Engineer

Responsabilidades:

* SolidJS;
* Feature-Sliced Design;
* i18next / solid-i18next;
* acessibilidade;
* performance;
* testes;
* UX implementation;
* Kobalte quando realmente necessário;
* UnoCSS quando realmente necessário.

Deve evitar abstrações e dependências desnecessárias.

Nunca hardcode strings de UI em componentes — use chaves i18n.

---

# 18. Relação entre os agentes

Não trate os agentes como departamentos isolados.

O fluxo recomendado é:

```text
Product Manager
       ↓
     Designer
       ↓
   Tech Lead
    ↙      ↘
Backend   Frontend
    ↘      ↙
     Tech Lead
```

Mas o Tech Lead permanece responsável pela coerência técnica.

Para uma tarefa pequena, não invoque todos os agentes.

Use apenas os especialistas necessários.

---

# 19. Workflow de desenvolvimento futuro

O repositório deve estabelecer este fluxo como padrão:

```text
1. Entender problema
2. Definir escopo
3. Definir critérios de aceitação
4. Planejar
5. Identificar impacto arquitetural
6. Criar/atualizar ADR se necessário
7. RED
8. GREEN
9. REFACTOR
10. repetir
11. executar validações
12. atualizar documentação
```

Nunca implemente uma feature inteira de uma vez.

Trabalhe em pequenos incrementos verificáveis.

---

# 20. Performance

Performance deve ser uma consequência da simplicidade, não de micro-otimizações.

Priorize:

* poucos dependencies;
* bundles pequenos;
* poucos layers;
* pouca abstração;
* trabalho mínimo no browser;
* APIs simples;
* builds rápidos;
* testes rápidos.

Não faça otimizações prematuras.

Quando uma otimização for necessária, primeiro demonstre o problema.

---

# 21. Segurança

Inclua apenas os fundamentos necessários nesta fase:

* secrets fora do código;
* `.env.example`;
* validação de configuração;
* dependências atualizadas;
* CI reproduzível;
* ausência de credenciais no repositório.

Não implemente um sistema de segurança empresarial no template.

---

# 22. Git

Configure:

```text
.gitignore
.gitattributes
```

Use convenções razoáveis de commits se houver benefício real.

Não introduza ferramentas adicionais apenas para impor Conventional Commits se isso não for necessário.

---

# 23. Qualidade dos comandos

Ao final, os comandos principais deverão ser descobertos facilmente.

Idealmente:

```bash
pnpm install
pnpm dev
pnpm test
pnpm typecheck
pnpm lint
pnpm format
pnpm build
```

Se houver uma decisão melhor, documente-a.

---

# 24. Processo desta execução

IMPORTANTE:

**NÃO implemente tudo imediatamente.**

Primeiro faça uma fase de descoberta e planejamento.

Nesta primeira resposta:

1. analise todos os requisitos acima;
2. identifique ambiguidades e decisões arquiteturais importantes;
3. proponha a arquitetura do monorepo;
4. proponha a estrutura de diretórios;
5. proponha as responsabilidades de cada agente;
6. proponha os ADRs iniciais;
7. proponha um plano de implementação faseado;
8. identifique dependências que você considera realmente necessárias;
9. identifique o que deliberadamente NÃO será incluído;
10. explique como o Tracer Bullet atravessará a arquitetura.

Não escreva código ainda.

---

# 25. Fases

Proponha um plano semelhante a:

### Fase 0 — Fundação e decisões

* arquitetura;
* ADRs;
* estrutura;
* convenções;
* Cursor agents;
* Cursor rules;
* documentação inicial.

### Fase 1 — Workspace

* Node;
* pnpm;
* TypeScript;
* workspace;
* scripts;
* Biome;
* Lefthook.

### Fase 2 — Backend

* estrutura;
* domínio;
* application;
* HTTP;
* testes;
* TDD.

### Fase 3 — Frontend

* SolidJS;
* Vite;
* FSD;
* i18next + solid-i18next;
* Vitest;
* happy-dom;
* styling mínimo.

### Fase 4 — Tracer Bullet

* integração frontend/backend;
* teste end-to-end apropriado;
* validação arquitetural.

### Fase 5 — Infraestrutura

* configuração;
* ambiente;
* execução local;
* Docker somente se realmente necessário;
* health checks.

### Fase 6 — CI

* install;
* lint;
* typecheck;
* test;
* build.

### Fase 7 — Hardening

* documentação;
* DX;
* performance;
* limpeza;
* revisão arquitetural.

Você pode alterar essas fases se encontrar uma organização melhor.

---

# 26. Regra absoluta de interação

Depois de apresentar o plano:

**PARE.**

Não implemente a Fase 0 automaticamente.

Aguarde minha confirmação explícita:

```text
OK
```

Somente depois de receber `OK`, execute a próxima fase.

Após terminar cada fase:

1. mostre o que foi implementado;
2. mostre os arquivos relevantes;
3. mostre as decisões tomadas;
4. execute os testes/validações;
5. informe os resultados;
6. informe eventuais problemas;
7. proponha a próxima fase;
8. **PARE e aguarde novo `OK`.**

Nunca avance automaticamente.

---

# 27. Regra de execução das fases

Durante uma fase:

* faça alterações reais no repositório;
* execute comandos;
* execute testes;
* corrija problemas encontrados;
* mantenha o escopo da fase;
* não antecipe fases futuras;
* não introduza funcionalidades não solicitadas.

Se durante a implementação surgir uma decisão arquitetural relevante:

1. pare;
2. explique a decisão;
3. proponha alternativas;
4. se necessário, crie/atualize um ADR;
5. continue somente após a decisão estar clara.

---

# 28. Critério de sucesso

Ao final de todas as fases, o repositório deverá ser:

* um monorepo funcional;
* executável localmente;
* testável;
* tipado;
* formatado;
* lintado;
* com CI;
* com documentação;
* com ADRs;
* com planos;
* com agentes especializados do Cursor;
* orientado por TDD;
* organizado por DDD quando aplicável;
* organizado por FSD no frontend;
* com internacionalização via i18next;
* com frontend SolidJS;
* com backend TypeScript;
* usando Node 24;
* usando TypeScript 7;
* usando pnpm;
* usando Vite;
* usando Vitest;
* usando happy-dom;
* usando Biome;
* usando Lefthook;
* com dependências mínimas;
* com um Tracer Bullet pequeno e funcional.

Mais importante:

**o repositório deverá ser fácil de entender.**

Se alguém novo abrir o projeto, deverá conseguir responder rapidamente:

* onde está o frontend?
* onde está o backend?
* onde está o domínio?
* onde estão os casos de uso?
* onde estão os testes?
* como executo o projeto?
* como crio uma feature?
* como adiciono traduções?
* quais são as regras arquiteturais?
* como o Cursor deve trabalhar neste projeto?

Se essas respostas não forem óbvias, simplifique a arquitetura.

---

# 29. Todos os textos do repo devem ser em inglês

Apenas as interações nos chats devem ser em português.

Isso se aplica a código, comentários, documentação, ADRs, commits e mensagens de log.

**Strings de UI** não ficam hardcoded no código: elas vivem nos arquivos de locale do i18next (seção 9), com `en` como locale padrão e source of truth das chaves.

# 30. Regra final

Não tente impressionar com arquitetura.

**Construa uma fundação pequena, excelente e extensível.**

Sempre prefira:

```text
menos código
menos dependências
menos abstrações
menos configuração
menos magia
mais clareza
mais testes
mais feedback
mais simplicidade
```

Comece agora pela **Fase 0: descoberta, decisões e plano**.

Não crie código ainda.

Depois de apresentar o plano, aguarde meu `OK`.
