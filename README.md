# trew-starter

## Description
A Typescript-React-Express-Webpack web application starter. This is suitable for a medium to large scale web app.

Aspects:
* ExpressJS API
* Typescript for *all* files
* React for UI
* Redux for state management
* Sass for styling
* Jest for unit testing
* Cypress for end-to-end testing
* Development and production modes
* Development mode has react and redux devtools extensions

Current known limitations:
* No https integration
* Lack of a script to "set up" the starter
* For production mode, could use nginx to serve front-end files instead of having both UI and API on one ExpressJS server.
* Lack of ESLint integration (coming soon)

## Motivation
I couldn't find any starters out there that was much more than create-react-app with basic typescript integration; lacking a backend, Sass, Redux, etc.

## Contributing

### Building
* Development mode: `npm run start`
* Production mode, non-docker: `npm run build && node ./build/src/server/app.js`
* Production mode, docker: `docker-compose up --build`

### Testing
* All: `npm run test`
* unit: `npm run test-unit`
* e2e (development mode): `npm run test-e2e-dev`
* e2e (production mode): `npm run test-e2e-prod`

### Advised IDE Extensions

ESLint
