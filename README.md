# Water Jug Challenge

For this project I've used Vue 3 + Vuetify.

## Explanation

By implementing the Breadth First Search (BFS) algorithm we explore all the possible states, progressing layer by layer until we reach a result that meets the target earlier on the structure.
Due to the early return statements it's possible to discard edge cases where any of the buckets won't reach the desired target, for example, where the amount wanted is not divisible by the greatest common divisor of both buckets or the target exceding the size of the largest jug.

### Install

Set up the project using npm by running the following command to install the dependencies:

```bash
npm install
```

### Starting the Development Server

To start the development server with hot-reload, run the following command. The server will be accessible at [http://localhost:3000](http://localhost:3000):

```bash
npm run dev
```

### Running unit tests

Start unit tests by running the following command:

```bash
npm run test
```

### Compile and Minify for Production

To build your project for production, use:

```bash
npm run build
```

Once the build process is completed, your application will be ready for deployment in a production environment.