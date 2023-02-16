# feedback-project

#### 1. RUN `npm init vue@latest`

## FURTHER SETUP

✔ Project name: … <your project>
  
✔ Add TypeScript? … No
  
✔ Add JSX Support? … Yes
  
✔ Add Vue Router for Single Page Application development? … Yes
  
✔ Add Pinia for state management? … No
  
✔ Add Vitest for Unit Testing? … Yes
  
✔ Add an End-to-End Testing Solution? › Cypress
  
✔ Add ESLint for code quality? … No
  
✔ Add Prettier for code formatting? … No
  

Scaffolding project in <your project location>...

Done. Now run:

  cd `<your project>`
  
 ` npm install`
  
 ` npm run lint`
  
 ` npm run dev`
  

  ## Additional installs: 
  
  ### VUEX
  `npm install vuex@next --save`
  
      https://vuex.vuejs.org/installation.html#npm
  
  
  ### JSONSERVER MOCKAPI
  
  `npm install --save-dev json-server`
  
  Added this to the 'package.json'-file: 
    
    `"mockapi": "json-server -w data/dummydata.json"`
  
  `npm run mockapi`
  
  ### AXIOS
  
  `npm install axios`
  
  (remember to: 
    `import axios from 'axios';`
  in the component)
  
  
  ### UNIT TESTING
  
  configure 'package.json' to include (in 'scripts:' section): 
  
  `"test:unit": "vitest --environment jsdom --root src/",`
  
  `npm run test:unit`
  
  Could add unit testing coverage: 
  `npm i -D @vitest/coverage-c8`
  
  'package.json' to include (in 'scripts:' section): 
  `"test:coverage": "vitest run --coverage --environment jsdom", `
  
  `npm run test:coverage`

  
  ### CYPRESS
  
  In 'cypress.config.js':
  Redirected Cypress to target :  `baseUrl: 'http://127.0.0.1:5173/'`
  
  To open cypress and watch tests run live:
  `npx cypress open`
  
  
  
  
  
  ## AUTO_GENERATED: 
## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
npm run test:e2e:dev
```

This runs the end-to-end tests against the Vite development server.
It is much faster than the production build.

But it's still recommended to test the production build with `test:e2e` before deploying (e.g. in CI environments):

```sh
npm run build
npm run test:e2e
```


