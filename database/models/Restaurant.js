const mongoose=require('mongoose');
const { Schema } = mongoose;

const restaurantSchema = new Schema({
  name: String, // String is shorthand for {type: String}
  borough: String,
  cuisine: String,
  restaurant_id: String,
},{collection:"restaurants"});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports={Restaurant}