const mongoose =require('mongoose');
require('dotenv').config({ path: './config/config.env' }); //require to get env file

const connectDB = async()=>{
    try{
        //await = this function will be callback when processed 
        const conn = await mongoose.connect(process.env.MONGO_URI ,{
            //use to avoid errors in console log 
            useNewUrlParser : true,
            useUnifiedTopology : true,
            useFindAndModify : false 
        })
        console.log(`MongoDB connected at ${conn.connection.host}`)

    }catch(err){
console.error(err);
process.exit(1);
    }
}

module.exports = connectDB;