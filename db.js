
import mongoose from "mongoose";


const mongoDB = async()=>{
 try {
    await mongoose.connect(process.env.MONGO_URI,{
      dbName:"Gofoodmern" 
  })
    console.log('MongoDB Connected Successful');

   const food_data = await mongoose.connection.db.collection('food_items').find({}).toArray();
   global.food_items = food_data;
   const foodCategory = await mongoose.connection.db.collection("foodCategory").find({}).toArray();
   global.foodCategory = foodCategory;
 }
  catch (error) {
    console.log(error);
 }
}

// module.exports = mongoDB;
export default mongoDB;