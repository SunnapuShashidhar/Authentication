var filterRestarent=require("../Controller/Restarents");

var express=require('express');
var router=express.Router();
router.get('/filter',async(req,res,next)=>await filterRestarent(req,res,next))
module.exports=router;