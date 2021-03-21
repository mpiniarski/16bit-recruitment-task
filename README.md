This is a 16 bit recruitment task - Simple Roulette Game.

## Getting Started

- Run first:
```bash
npm run install
# or
yarn install
```

- To start the development server:

```bash
npm run dev
# or
yarn dev
```
and visit `localhost:3000`


- To run E2E tests:

```bash
npm run test
# or
yarn test
```

## Description
- Site is pre-rendered on the server, but canvas element with animation is only rendered in the browser
- I've used `Pixi.js` + `GreenSock` for canvas and animation
- I've used `Cypress` for E2E testing. The backend is mocked in the tests and I use `data-testid` to access page elements
- `Typescript` and `eslint` is set up
- The roulette spin result is actually coming from the backend before the animation, but a user only sees the result after the animation is over.
- I've used scss modules for styling