const mongoose=require('mongoose')
const mongoURL="mongodb://localhost:27017/inotebook"
const connectToMongo=async()=>{

try{
    await mongoose.connect(mongoURL)
      console.log("connected");
    }catch(error){
console.error("error"+error);
    }

}
module.exports=connectToMongo;