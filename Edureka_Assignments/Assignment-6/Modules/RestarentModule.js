var mongoose=require('mongoose');
var restarentSchema=mongoose.Schema({
  _id:{type:String,required:true},
  name:{type:String,required:true},
  description:{type:String,required:true},
  address:{type:String,required:true},
  location:{type:String,required:true},
  image:{type:String,required:true},
  min_price:{type:Number,required:true},
  contact:{type:Number,required:true},
  mealtype:{type:String,require:true},
  cuisine:{type:String,required:true},
  city:{type:String,required:true}

})

module.exports=mongoose.model("Restarent",restarentSchema);