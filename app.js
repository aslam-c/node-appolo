const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const {resolvers,typeDefs}=require("./schema/schema")
const {GraphQLError}=require("graphql")

//datasources
const {getDummyUserData}=require("./datasources/DummyUserDataSource")


const todos=[{"title":"stawrwert Gql","name":"applwwwy portal","task":"Buy apwwple"},
{"title":"starts Gql","name":"applwwwy portal","task":"Buy appwwle"},
{"title":"stsdart Gql","name":"applwwwy portal","task":"Buy awpple"}]

// Construct a schema, using GraphQL schema language

const server = new ApolloServer({ typeDefs, resolvers,context:({req,res})=>{
  
  return {dataSources:{getDummyUserData}}

} });

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
