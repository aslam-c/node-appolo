const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

const todos=[{"title":"stawrwert Gql","name":"applwwwy portal","task":"Buy apwwple"},
{"title":"starts Gql","name":"applwwwy portal","task":"Buy appwwle"},
{"title":"stsdart Gql","name":"applwwwy portal","task":"Buy awpple"}]

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
type Todos {
    title:String,
    name:String,
    task:String
}

type Query {
    todos:[Todos]
}
type Mutation {
    addTodo(title: String, name: String,task: String): [Todos]
}
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    todos: () => todos
},

Mutation:{addTodo:(title,name,task)=>{
    todos.push({title,name,task})
    return todos
}}
};

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
const startServer=async ()=>{
    await server.start()
    server.applyMiddleware({ app });

}
startServer()


app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
﻿
