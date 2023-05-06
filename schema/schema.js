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
    email: String
   }
   type Mutation { 
    createUser(name:String,email:String):String
   }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: () => 'Hello world!',
    todos:(parent,args)=>{
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
  return usersList.slice(0,limit)

}
},
Mutation:{
  createUser:(parent,args,ctx)=>{
    const {name,email}=args
    let r = (Math.random() + 1).toString(36).substring(7);

    return r
  }
}

};



module.exports={typeDefs,resolvers}