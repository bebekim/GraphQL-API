// index.js
// This is the main entry point of our application
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
require('dotenv').config();

const db = require('./db');
const models = require('./models');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

// Run the server on a port specified in our .env file or port 4000
const port = process.env.PORT || 4000;
// Store the DB_HOST value as a variable
const DB_HOST = process.env.DB_HOST;

const app = express();

// Connect to the database
db.connect(DB_HOST);

// Apollo Server Setup
const server = new ApolloServer({
  typeDefs,
  resolvers,
  // context allows one to pass specific information along from our server code to an individual resolver with each request
  // This will be useful for incorporating user authentication into application
  context: () => {
    // add the db model to the context
    return { models };
  }
});

// Apply the Apollo GraphQL middleware and set the path to /api
server.applyMiddleware({ app, path: '/api' });

// app.get('/', (req, res) => res.send('Hello World!!'));

app.listen({ port }, () =>
  console.log(
    `GraphQL Server running at http://localhost:${port}${server.graphqlPath}`
  )
);
