# Restonode

Restaurant example code demonstrating an implementation of sequelize on nodejs.

## Pre-requisites

* Nodejs 8.x+
* Docker

## Run

1. Run docker containers

  a. `cd support-services`
  b. `docker-compose up`

This will run an instance of Postgres and RabbitMq.

2. Create and seed Database.

  a. `cd api`
  b. `npm i`
  c. `node_modules/.bin/sequelize db:create`
  c. `node_modules/.bin/sequelize db:migrate`
  d. `node_modules/.bin/sequelize db:seed:all`


3. Run API

 a. `cd api`
 b. Go to `https://developers.google.com/maps/documentation/distance-matrix/` and obtain an api-key.
 c. Paste the api-key in `config/default.json` in `distanceMatrixApiKey`.
 d. `npm start`

4. Run Order Service

  a. `cd order-service`
  b. `npm i`
  c. `npm start`

## Api

* GET `api/restaurant` (Get all restaurants)
* POST `/restaurant/:restaurantId/rating` (Rate a restaurant)
* GET `/restaurant/:restaurantId/rating/gte/:rating` (Get all restaurants with rating greater or equal than a rate value)
* GET `/meal` (Get all meals)
* POST `/restaurant/:restaurantId/order` (Create an order)