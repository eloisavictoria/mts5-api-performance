# Testes de performance — Mentoria de Teste de Software 2026, Turma 5

## Introdução

Este repositório reúne scripts de testes de performance de APIs desenvolvidos com JavaScript e k6 durante as aulas do curso **Mentoria de Teste de Software 2026 — Turma 5**.

Os cenários disponíveis exercitam as operações de login e transferência. Os scripts verificam respostas da API e podem ser executados contra um ambiente escolhido por meio da variável `BASE_URL`.

## Tecnologias utilizadas

- **JavaScript**: linguagem dos cenários de teste.
- **Grafana k6**: ferramenta de execução dos testes de carga e coleta de métricas.
- **JSON**: formato usado para dados de configuração e massa de teste.

## Estrutura do repositório

```text
.
├── config/
│   └── config.local.json
├── fixtures/
│   └── postLogin.json
├── helpers/
│   └── autenticacao.js
├── tests/
│   ├── login.test.js
│   └── transferencias.test.js
├── utils/
│   └── variaveis.js
├── .gitignore
└── README.md
```

O arquivo `html-report.html` pode aparecer na raiz depois da exportação do dashboard do k6; ele é um relatório gerado, não um script de teste.

## Objetivo dos grupos de arquivos

- **`tests/`**: contém os cenários executáveis. `login.test.js` testa o endpoint de login; `transferencias.test.js` obtém um token e testa uma transferência.
- **`helpers/`**: reúne funções reutilizáveis pelos testes. `autenticacao.js` realiza o login e retorna o token.
- **`fixtures/`**: armazena dados de entrada dos cenários em JSON. `postLogin.json` contém os dados enviados no login.
- **`utils/`**: concentra utilitários compartilhados. `variaveis.js` resolve a URL base usando `BASE_URL` ou, se ela não estiver definida, a configuração local.
- **`config/`**: contém a configuração local padrão. `config.local.json` define `http://localhost:3000` como URL base.
- **`.gitignore`**: define arquivos que não devem ser versionados, incluindo o relatório HTML gerado.

## Instalação e execução

### Pré-requisitos

1. Ter a API que será testada em execução e acessível no endereço informado em `BASE_URL`.
2. Instalar o [k6](https://grafana.com/docs/k6/latest/set-up/install-k6/) seguindo as instruções para o seu sistema operacional.
3. Confirmar a instalação:

   ```powershell
   k6 version
   ```

Este repositório não contém dependências npm: os scripts são executados diretamente pelo k6.

### Definir a URL da API e executar um teste

O k6 disponibiliza variáveis de ambiente aos scripts por meio de `__ENV`. Defina `BASE_URL` com a URL raiz da API, sem o caminho específico do endpoint. Por exemplo, para uma API local:

**PowerShell (Windows):**

```powershell
$env:BASE_URL = "http://localhost:3000"
k6 run .\tests\login.test.js
```

Para executar o teste de transferências:

```powershell
$env:BASE_URL = "http://localhost:3000"
k6 run .\tests\transferencias.test.js
```

**Bash (Linux/macOS):**

```bash
BASE_URL="http://localhost:3000" k6 run tests/login.test.js
BASE_URL="http://localhost:3000" k6 run tests/transferencias.test.js
```

Se `BASE_URL` não for definida, os scripts usam o valor de `config/config.local.json`. Para testar outro ambiente, informe a URL correspondente antes de executar o k6.

### Acompanhar o dashboard em tempo real e exportar o relatório

Ative o dashboard web do k6 com `K6_WEB_DASHBOARD=true` e configure o arquivo de exportação com `K6_WEB_DASHBOARD_EXPORT=html-report.html`.

**PowerShell (Windows):**

```powershell
$env:BASE_URL = "http://localhost:3000"
$env:K6_WEB_DASHBOARD = "true"
$env:K6_WEB_DASHBOARD_EXPORT = "html-report.html"
k6 run .\tests\login.test.js
```

Durante a execução, abra <http://localhost:5665> para acompanhar as métricas em tempo real. Ao final do teste, o k6 exporta o relatório para `html-report.html` na pasta atual. Para gerar o relatório de transferências, substitua o script no comando por `.\tests\transferencias.test.js`.

**Bash (Linux/macOS):**

```bash
BASE_URL="http://localhost:3000" \
K6_WEB_DASHBOARD=true \
K6_WEB_DASHBOARD_EXPORT=html-report.html \
k6 run tests/login.test.js
```

Também é possível exportar o dashboard sem abrir a interface em tempo real; para acompanhamento durante o teste, mantenha o dashboard habilitado e acesse o endereço indicado.
