# ts-api-database
![Version](https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](#)

## Install

```sh
npm install
npm start:dev
```

### Endpoint

Los endpoint disponibles son:

```sh
# id_user=5&id_team=7
/api//usuarios
# year=2019&week=12
/api//usuarios/:id
# year=2019&week=12,13
/api/team/:id
# year=2019&week=12
/api/projects/:id
```

## Environment

Ejemplo:
```sh
# APP
PORT=3000

# DATABASE
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_DATABASE=database
MYSQL_USER=root
MYSQL_PASSWORD=root
MYSQL_CONNECTION_LIMIT=10
```

👤 **acalderon (https://acalderon.dev)**