const mongoose=require("mongoose");

const{Schema}=mongoose;

const UserSchema=new Schema({
    Username: String,
  email: {
    // unique:true,
    type: String,
   
  },
    password:{
        required:true,
        type:String,
    },
   
},

)


const User = mongoose.model('User', UserSchema);
module.exports=User;

