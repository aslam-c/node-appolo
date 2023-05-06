const { gql } = require('apollo-server-express');
const {connectDb}=require('../database/mongoConnector')
const {Restaurant}=require("../database/models/Restaurant")
const todos=[{name:"Heloo",verified:true},{name:"Hew",verified:true},{name:"ehrue",verified:false}]


connectDb()

const typeDefs = gql`
  type Query {
    hello: String
    todos(status:Boolean):[Todo]
    restaurantCount(area:String!):Int
    users(limit:Int):[User]
    }

  type Todo{
    name:String
    verified:Boolean
   }
   
   type User{
    id: Int
    name: String
    username: String
    email: String
   }

`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: () => 'Hello world!',
    todos:(parent,args)=>{
    console.log(args.status)
    const selected=todos.filter(todo=>todo.verified==args.status)
    return selected   
},
restaurantCount:async (parent,args,ctx,info)=>{
    if(!ctx.isAuthenticated){
      return null
    }
    const selectedArea=args.area
    const records= await Restaurant.countDocuments({borough:selectedArea})
    return records
},
users:async(parent,args,ctx,info)=>{
  const {limit}=args
  const usersList=await ctx.dataSources.getDummyUserData()
  console.log(usersList)
  return usersList.slice(0,limit)

}
},

};



module.exports={typeDefs,resolvers}