<h1 align="center">
<br>
  <img src="https://i.ibb.co/yFQyYQ7/i-Role-Group.png" alt="Project Logo" />
  <br>
</h1>

## Express Template With MongoDB and Redis

this Template using Express with Typescript and MongoDB and using Redis for caching

## Description

this Template help you to build your Api or microservice Project.

## Features

Authentication :

- passport
- jwt authentication

Integration testing :

- Jest
- supertest

Languages :

- i18n

Documentation :

- swagger

## Pre-Requirements

What you need to install before running this Project:

- Node >= 14
- Npm >= 6
- Mongodb >= 4.0
- Redis

## Database Setup

What you need to install before running this Project:

- Install MongoDB and Redis in your system and set necessary configurations.
- Do not forget to check your environment settings in .env

## Set up environment

The environment variables can be found in the docs folder. you can copy them to root directory and delete .example They
come with these default values:

```
ENDPOINT=http://localhost

# Port number
PORT=<YOUR APP PORT>

# Debug
DEBUG=true

# URL of the Mongo DB
DATABASE_URL=mongodb://localhost:27017/<YOUR DB NAME>

# URL of the Redis
REDIS_URL=redis://127.0.0.1:6379

# JWT secret key
JWT_SECRETKEY=<YOUR JWT_SECRETKEY>
JWT_REFRESH_SECRET=<YOUR JWT_REFRESH_SECRET>
JWT_EMAIL_TOKEN=<YOUR JWT_EMAIL_TOKEN>

# SMTP configuration options for the email service
# For testing, you can use a fake SMTP service like Ethereal: https://ethereal.email/create
SMTP_HOST=email-server
SMTP_PORT=587
SMTP_USERNAME=email-server-username
SMTP_PASSWORD=email-server-password
EMAIL_FROM=support@yourapp.com

```

## Installation

To deploy this project run

### step 1 : install dependencies

```bash
  npm run i
```

### step 2: : running all Tests

```bash
  npm run jest
```

### step 3: add admin in database

```bash
  npm run migrate-up
```

### step 4: run project in development

```bash
  npm run start-dev
```

Express server listening on http://localhost:3001/, in Development mode.

## Docker and Deployment

you can simply set your own configs in docker-compose.yml file and run:

```bash
docker-compose up -d
```

Express server listening on http://localhost:3000/, in Production mode.

## App skeleton

```
.
├── docs
│   ├── .env.development.example
│   ├── .env.production.example
│   └── .env.test.example
├── resource
│   └── locales
│       ├── de.json
│       ├── en.json
│       └── fr.json
├── src
│   ├── __tests__
│   │   |
│   │   ├── auth
│   │   │   ├── forgotPassword.test.ts
│   │   │   ├── login.test.ts
│   │   │   ├── register.test.ts
│   │   │   └── resetPassword.test.ts
│   │   ├── unit-tests
│   │   │   ├── password.test.ts
│   │   │   └── repository.test.ts
│   │   |
│   │   └── user.ts
│   │       └── user.test.ts
│   ├── api
│   │   ├── bin
|   |   |   └── index.ts
│   │   ├── controllers
|   |   |   ├── v1
│   │   │   |   ├── Auth.controller.ts
│   │   │   |   └── User.controller.ts
|   |   |   └── Controller.ts
│   │   ├── dtos
|   |   |   ├── auth.dto.ts
|   |   |   └── user.dto.ts
│   │   ├── middlewares
|   |   |   ├── Auth.middleware.ts
|   |   |   ├── Language.middleware.ts
|   |   |   └── Middleware.ts
│   │   ├── routes
|   |   |   ├── v1
│   │   |   |   ├── private
│   │   |   |   |   ├── index.ts
│   │   |   |   |   └── user.route.ts
│   │   |   |   ├── public
│   │   |   |   |   ├── auth.route.ts
│   │   |   |   |   └── index.ts
│   │   |   |   └── index
|   |   |   └── index.ts
│   │   └── validators
|   |       ├── v1
│   │       |   ├── Auth.validator.ts
│   │       |   └── User.validator.ts
|   |       └── Validator.ts
│   ├── config
│   │   ├── cors.config.ts
│   │   ├── database.config.ts
│   │   ├── email.config.ts
│   │   ├── index.ts
│   │   ├── language.config.ts
│   │   ├── logger.config.ts
│   │   ├── rateLimit.config.ts
│   │   ├── redis.config.ts
│   │   ├── server.config.ts
│   │   └── swagger.config.ts
│   ├── database
│   │   ├── migrations
|   |   |   └── 1680008332663-add_super_admin.ts
│   │   ├── models
│   │   │   ├── resetPassword.ts
│   │   │   └── user.ts
│   │   ├── migrate.ts
│   │   └── Repository.ts
│   ├── services
│   │   ├── v1
│   │   │   ├── Auth.service.ts
│   │   │   └── User.service.ts
│   │   └── Service.ts
│   ├── test
│   │   ├── auth
│   │   │   └── AuthTestController.ts
│   │   ├── constants
│   │   │   └── auth.ts
│   │   ├── template
│   │   │   └── TemplateTestController.ts
│   │   ├── user
│   │   │   └── UserTestController.ts
│   │   ├── setup.ts
│   │   └── TestController.ts
│   ├── types
│   │   └── index.d.ts
│   ├── utils
│   │   ├── passport
│   │   │   └── passport-jwt.ts
│   │   ├── email.ts
│   │   ├── password.ts
│   │   └── translate.ts
│   ├── app.ts
|   └── server.ts
├── .dockerignore
├── .eslintrc.json
├── .gitignore
├── .prettierrc.json
├── docker-compose.yml
├── docker-compose-dev.yml
├── Dockerfile
├── Dockerfile.dev
├── jest.config.json
├── LICENSE
├── migrate.json
├── package.json
├── README.md
└── tsconfig.json

```

## Swagger

if you run project in development mode Swagger documentation will be available on route:

```bash
http://localhost:3001/api-docs
```

## License

[ISC](https://choosealicense.com/licenses/isc/)

## Authors

- [@samb2](https://www.github.com/samb2)
- [@mohamadalikaboosi](https://www.github.com/mohamadalikaboosi)

## Show your support

Give a ⭐️ if this project helped you!