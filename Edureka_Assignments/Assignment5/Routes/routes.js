var express=require('express');
var route=express.Router();
var Restarent=require("../Module/Restarent.json");
var Mealtype=require("../Module/MealType.json");
route.get('/getByCity',(req,res)=>{//http://localhost:4545/getByCity?city=Nizambad or http://localhost:4545/getByCity?city=Hyderabad
  var responce=Restarent.filter(item=>item.city==req.query.city)
  res.send(responce);
})
route.get('/mealdata',(req,res)=>{//http://localhost:4545/mealdata
var Mealresponce=Mealtype.map(item=>item);
res.send(Mealresponce);
})


module.exports=route;