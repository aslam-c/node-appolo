require("dotenv").config();
const util = require("util");
const mongoose = require("mongoose");

mongoose.set("debug", (collectionName, method, query, doc) => {
  console.log(`${collectionName}.${method}`, JSON.stringify(query), doc);
});
const connectDb = async () => {
  const connectionString = "mongodb+srv://asdmail045:asd123...@cluster0.fdahejp.mongodb.net/sample_restaurants";
  const promisifiedConnect = util.promisify(mongoose.connect);
  try {
    console.log("Connecting to database " + connectionString);
    // let connection = await promisifiedConnect(connectionString, {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    //   family: 4,
    //   keepAlive: true,
    //   keepAliveInitialDelay: 300000,
    //   autoIndex: true,
    // });
 
    let connection = await mongoose.connect(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        family: 4,
        keepAlive: true,
        keepAliveInitialDelay: 300000,
        autoIndex: true,
      });
   
    console.log("Connected successfully to " + connectionString);
  } catch (error) {
    //someting went wrong
    console.log("Cant connect to db", error);
  }
};

module.exports = { connectDb };