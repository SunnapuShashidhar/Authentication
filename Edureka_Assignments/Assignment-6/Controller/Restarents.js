var RestarenSchema=require("../Modules/RestarentModule");
filterRestarent=(req,res,next)=>{
  page=parseInt(req.query.page);
  const {min_price,mealtype,cuisine,}=req.body;

  var limit=page?page:0;
  var skip=page?page*2:2;
  var limit=page-1;
  var skip=page+1;
var filterBypay={};
if(mealtype && cuisine&&min_price){
  filterBypay["mealtype.type"]=mealtype,
  filterBypay["min_price.type"]=min_price;
  filterBypay["cuisine.type"]=cuisine;
}
if(mealtype && min_price){
  filterBypay["mealtype.type"]=mealtype,
  filterBypay["min_price.type"]=min_price;//seching according to the min price
}
if(mealtype)
filterBypay["mealtype.type"]=mealtype



RestarenSchema.find(filterBypay).sort({min_price:1}).then(responce=>{//sort should be used before the responce only inside the then sort not workes
  const filtering=responce.slice(limit,skip);//slice(limitIntdex,skipIndex);it is used to slice and return the particular index values
  res.send({status:200,message:"data fetched successfully",filtering})}).catch()
}
module.exports=filterRestarent;
//in sort 1 ascending order -1 descending order