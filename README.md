# trew-starter

## Description
A (mostly) production-ready Webpack-Express-React-Typescript website starter project.

* Typescript is enforced for all files, from the expressjs, to the react, to even the webpack config files.
* UI uses Redux for state management
* Development mode features full react and redux devtools extensions

## Motivation
I noticed that there were no starters out there that resembled anything close to a real-life production-ready web application that used Webpack, Typescript, and React. Several exist at the moment, but they lack either some or all of the following:
* A backend
* Typescript for *all* files -> typing
* Docker integration -> containerization
* Redux integration -> central state management
* Robust Webpack integration -> bundling, bundle size reduction

The above, or their equivalents, are necessary for a modern prod-ready web application.

## Contributing

### Building
* Development mode: `npm run start`
* Production mode, non-docker: `npm run build && node ./build/src/server/app.js`
* Production mode, docker: `docker-compose up --build`

### Advised IDE Extensions

ESLint
