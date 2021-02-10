# trew-starter

## Description
A Typescript-React-Express-Webpack web application starter. This is suitable for a medium to large scale web app.

Aspects:
* ExpressJS API
* Typescript for *all* files
* React for UI
* Redux for state management
* Sass for styling
* Development and production modes
* Development mode has react and redux devtools extensions

Current known limitations:
* No https integration
* Docker integration could be a little more refined
* Lack of a script to "set up" the starter
* For production mode, could use nginx to serve front-end files instead of having both UI and API on one ExpressJS server.
* Lack of ESLint integration (coming soon)

## Motivation
I couldn't find any starters out there that resembled anything close to a realistic web application that used Webpack, Typescript, and React. The similar starters that existed before this appeared to closely resemble a create-react-app landing page with *some* typescript.

## Contributing

### Building
* Development mode: `npm run start`
* Production mode, non-docker: `npm run build && node ./build/src/server/app.js`
* Production mode, docker: `docker-compose up --build`

### Advised IDE Extensions

ESLint
