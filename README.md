# trew-starter

## Description
A (mostly) production-ready Webpack-Express-React-Typescript website starter project.

* Typescript is enforced for all files, from the expressjs, to the react, to even the webpack config files.
* UI uses Redux for state management
* Development mode features full react and redux devtools extensions

## Contributing

### Building
* Development mode: `npm run start`
* Production mode, non-docker: `npm run build && node ./build/src/server/app.js`
* Production mode, docker: `docker-compose up --build`

### Advised IDE Extensions

ESLint
