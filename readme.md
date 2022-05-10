# Estudos sobre AWS Lambda

## Usando framework serverless

O serverless é um framework que facilita a criação de funções lambdas na AWS e em outros Clouds, como: Azure e Google Cloud. Porém ele é mais recomendado para AWS e pode ser usado com NodeJS e Python.

### Como criar o primeiro projeto?

Para iniciar você precisa instalar o serverless em sua máquina e para isso você pode usar o NPM. Para instalar use o comando abaixo:

```bash
  npm install -g serverless
```

Após instalado bastar usar usar o comando abaixo e verá opções de exemplos para facilitar sua introdução ao serverless.

```bash
  serverless
```

Você pode também usar o alias `sls` que já vem instalado e facilita a criação o uso da CLI e a partir de agora vamos usar somente ele. Após executar `sls` você verá as seguintes opções:

```bash
❯ AWS - Node.js - Starter
  AWS - Node.js - HTTP API
  AWS - Node.js - Scheduled Task
  AWS - Node.js - SQS Worker
  AWS - Node.js - Express API
  AWS - Node.js - Express API with DynamoDB
  AWS - Python - Starter
  AWS - Python - HTTP API
  AWS - Python - Scheduled Task
  AWS - Python - SQS Worker
  AWS - Python - Flask API
  AWS - Python - Flask API with DynamoDB
  Other
```
Selecione a primeira opção você terá o primeiro exemplo
