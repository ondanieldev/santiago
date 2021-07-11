<div align="center">
  <a href="https://www.colegiosantiago.com.br/">
    <div>
      <h1>Santiago</h1>
    </div>
  </a>
  <hr>
</div>

# Introduction

This application was developed, firstly, to manage school finances. However, the project grew up and then we created a new private repository to develop the new function to the business.

ADVICE: This repository will not be used anymore.

# Back-end

## Setup

To run the application, you need to follow the steps below:

### Filling in environment variables

Copy `.env.example` to `.env` and fill the environment variables:

| Variable              | Possible values                                                                                                           | Description                                                                                                                                         |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| AUTH_SECRET           | Any                                                                                                                       | JWT secret to generate and validate login tokens.                                                                                                   |
| REDIS_HOST            | Any                                                                                                                       | Redis database host. By default, this variable is empty.                                                                                            |
| REDIS_PORT            | Any number                                                                                                                | Redis database port. By default, Redis works through the port 6379, but it is a good practice to change the port with docker.                       |
| REDIS_PASSWORD        | Any                                                                                                                       | Redis database password.                                                                                                                            |
| MAIL_PROVIDER         | ethereal or ses                                                                                                           | Driver used to provide mail services. In this application, we have two providers available: Ethereal for development and Amazon SES for production. |
| MAIL_DEFAULT_NAME     | Any                                                                                                                       | Name that you want to use when sending emails.                                                                                                      |
| MAIL_DEFAULT_EMAIL    | Any                                                                                                                       | The email that you want to use to send mails. To use Amazon SES, the email must be registered on the AWS platform.                                  |
| AWS_ACCESS_KEY_ID     | Any                                                                                                                       | Your AWS IAM access key id.                                                                                                                         |
| AWS_SECRET_ACCESS_KEY | Any                                                                                                                       | Your AWS IAM secret access key.                                                                                                                     |
| AWS_DEFAULT_REGION    | Any                                                                                                                       | The region where your AWS account is placed.                                                                                                        |
| STORAGE_PROVIDER      | disk or s3                                                                                                                | Driver used to provide storage services. In this application, we have two providers available: Disk for development and Amazon S3 for production.   |
| AWS_S3_BUCKET         | Any                                                                                                                       | Your AWS bucket where you want to storage the images and PDFs.                                                                                      |
| AWS_S3_PERMISSION     | private, public-read, public-read-write, authenticated-read,aws-exec-read, bucket-owner-read or bucket-owner-full-control | Permission to access the file on AWS S3. As the files stored on this application must be accessed by the users, we use the public-read permission.  |
| AWS_S3_URL            | Any                                                                                                                       | The URL where your S3 is placed. This variable is used to construct the URL of the files when using S3 storage provider.                            |
| APP_API_URL           | Any                                                                                                                       | The URL where your backend is running. This variable is used to construct the URL of the files when using Disk storage provider.                    |
| APP_API_PORT          | Any                                                                                                                       | The port where you want to run your application.                                                                                                    |

### Filling in containers data

Copy `docker-compose.example.yml` to `docker-compose.yml` and fill the containers data:

| Variable               | Description                                                                                                                                                                                                                                                             |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| POSTGRESQL_PASSWORD    | Postgres database password.                                                                                                                                                                                                                                             |
| POSTGRESQL_USERNAME    | Postgres database username.                                                                                                                                                                                                                                             |
| POSTGRESQL_DATABASE    | Postgres database name.                                                                                                                                                                                                                                                 |
| Ports (postgres image) | By default, postgres runs on port 5432. Therefore, the bitnami image used to configure this application also uses port 5432. However, it is a good practice to change this port to a random another. To do this, fill the left side of the port field to a random port. |
| REDIS_PASSWORD         | Redis database password                                                                                                                                                                                                                                                 |
| Ports (redis image)    | By default, redis runs on port 6379. Therefore, the bitnami image used to configure this application also uses port 6379. However, it is a good practice to change this port to a random another. To do this, fill the left side of the port field to a random port.    |

### Filling in TypeORM settings

Copy `ormconfig.example.json` to `ormconfig.json` and fill the TypeORM settings:

| Variable      | Description                                                                                                                                                                                                                              |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| type          | Databse type. Unless you change the database to another one, fill this field with postgres.                                                                                                                                              |
| host          | Database host. Unless you run the containers on another server, fill this field with localhost.                                                                                                                                          |
| port          | Database port. The same port used on the right side of the postgres container port field.                                                                                                                                                |
| username      | Database username. The same username used on the postgres container.                                                                                                                                                                     |
| password      | Database password. The same password used on the postgres container.                                                                                                                                                                     |
| database      | Database name. The same database used on the postgres container.                                                                                                                                                                         |
| entities      | Database entities. By default, in development mode, entities are placed in `./src/modules/**/infra/typeorm/entities/*.ts`. In production mode, they are placed in `./dist/modules/**/infra/typeorm/entities/*.js`                        |
| migrations    | Database migrations. By default, in development mode, migrations are placed on `./src/shared/infra/typeorm/migrations/*.ts`. In the production mode, they are placed in `./dist/shared/infra/typeorm/migrations/*.js`                    |
| migrationsDir | Database migrations directory used to run migration commands. By default, in development mode, migrations folder is `./src/shared/infra/typeorm/migrations`. In the prodcution mode, it is `./dist/shared/infra/typeorm/migrations/*.ts` |

### Installing dependencies

Run `yarn` to generate `node_modules` folder with all dependencies used in this application.

### Generating production folder

Run `yarn build` to generate `dist` folder with babel.

## Running

1. Run `docker-compose up -d` to starts and run all containers;
2. Run `yarn typeorm migration:run` to create database tables and other database settings;
3. Run `yarn dev:server` in development mode or`yarn prod` in production mode. When running in production mode, do not forget to run this command from the root folder. If you do not, the application will not be able to register the environment variables and will not work.

## Tests

This application was developed using TDD (Test Driven Development) with TS Jest. To run the tests, just run `yarn test`.

## Workflow CI

This application uses GitHub actions to make Continuous Integration. So, whenever you push on the branch master, GitHub will:

    1. Install dependencies;
    2. Create dist folder;
    3. Run migrations;
    4. Starts the application.

As you see, start docker containers and run tests is not used on this workflow, so you need to run `docker-compose up -d` before to use the actions.

Besides that, you also need to set up some GitHub secrets:

| Secret   | Description                                                                                                                                          |
| -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| SSH_HOST | Server IP where your application is placed.                                                                                                          |
| SSH_USER | Server user where your application is placed.                                                                                                        |
| SSH_PORT | Server SSH port where your application is placed. By default, this port is 22.                                                                       |
| SSH_KEY  | You need to create an SSH key pair and put the private key in this secret. The public key, however, must be placed in your server's authorized keys. |

# Front-end

## Introduction

This application was created to manage a school with a focus on the financial department. As the application was developed with SOLID principles, it will be easy to attach new modules in the future.

You also can see all functions and application flow on the tasks.md file.

## Setup

To run the application, you need to follow the steps below:

### Filling in environment variables

Copy `.env.example` to `.env` and fill the environment variables:

| Variable          | Description   |
| ----------------- | ------------- |
| REACT_APP_API_URL | Back-end URL. |

### Installing dependencies

Run `yarn` to generate `node_modules` folder with all dependencies used in this application.

## Running

1. Run `yarn start` to starts the application in development mode.

# License

MIT © [Daniel Oliveira](https://ondaniel.com.br/)
