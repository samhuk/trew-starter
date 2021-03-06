# 🚀 TREW Starter 

## Description
A Typescript-React-Express-Webpack web application starter. This is suitable for a medium to large scale web app, containing most of what you will need, with the exception of deployment-specific aspects such as configuration for https, docker swarm, and so on.

Aspects:
* **Typescript** for *all* files
* **React** for UI
* **ExpressJS** for API
* **Webpack** for client-side bundling
* **Redux** for state management
* **Sass** for styling
* **Jest** for unit testing
* **Cypress** for end-to-end testing
* Development and production modes
* Development mode has react and redux devtools extensions
* An example model ("Order") to demonstrate the use of the other technologies

Current known limitations/exclusions:
* Lack of a script to "set up" the starter
* For production mode, could use nginx to serve front-end files instead of having both UI and API on one ExpressJS server.
* Database service. This has been left out so far since I think that this is the most deployment-specific/opinionated aspect.

## Motivation
I found that the existing starters out there lacked one or more of the above listed aspects that I believe are necessary for a medium to large scale web application. I felt like it would be convenient if there was a starter that didn't compromise on detail.

## Setup
Find all occurances of "trew-starter" and replace with your desired service name.

## Scripts

### Prerequisites
* Ensure that the machine has **python** installed and is available on PATH. This is because of node-sass.
* `npm install` for node packages.

### Running
* Development mode: `npm run start`
* Production mode, non-docker: `npm run build && node ./build/src/server/app.js`
* Production mode, docker: `npm run build-docker && npm run start-docker`

### Testing
* unit: `npm run test-unit`
* e2e (development mode): `npm run test-e2e-dev`
* e2e (production mode): `npm run test-e2e-prod`
* unit & e2e: `npm run test`
* Please see the other scripts in the package.json file for the complete list.

### Development watch script
* The advised script to use while making changes is `npm run watch-all`. This concurrently starts the dev deployment and runs the unit tests, reloading both when changes occur.

### Advised IDE Extensions

ESLint
