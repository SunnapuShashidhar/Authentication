var express=require('express');
var app=express();
var bodyparser=require('body-parser');

//importing the Routes
var routes=require('./Routes/routes')
app.use(bodyparser.json());


app.use('/',routes);
app.listen(4545,(req,res)=>{
  console.log("API is running in the 4545 port");
})

