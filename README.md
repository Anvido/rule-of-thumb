# Rule of Thumb

## Zemoga FE test

> > Rule of thumb is an application to tracks the sentiment of their users on trending and controversial people from different fields, including politics, business, media and entertainment, etc. -- Zemoga.

## Overview

- Application using React.js
- Dokerized code

## Usage mode and Installation

Rule of thumb requires [Node.js](https://nodejs.org/) v14+ to run.

Clone thes repository using the next command

```sh
git clone https://github.com/Anvido/rule-of-thumb
```

### Local execution

Install the dependencies and devDependencies and start the server.

```sh
cd rule-of-thumb
npm i
```

Run the React application

```sh
npm start
```

Now you can see the application running on `localhost:3000`

### Docker execution

To run dev settings

```sh
cd rule-of-thumb
docker build -f Dockerfile.dev -t react-dev .
docker run -p 3000:3000 react-dev
```

To run prod settings

```sh
cd rule-of-thumb
npm run build
docker build -t react-prod .
docker run -p 3000:80 react-prod
```
