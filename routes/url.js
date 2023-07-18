const urlmodel=require("../models/URL")
const express=require("express")
const router=express.Router()


router.post("/new",async(req,res)=>{
    try {
        const {orginalurl,customUrl}=req.body
        console.log(req.body);
        if(!orginalurl&&customUrl){
            return res.status(400).json({msg:"please fill the all input fields"})
        }
        const CheckAlredaypresent=await urlmodel.find({orginalurl})
        console.log(CheckAlredaypresent);
        if(CheckAlredaypresent.length){
            return res.status(405).json({msg:`The url is alreday shortend url : ${CheckAlredaypresent[0].customUrl}`})
        }
        const isCustomAvail=await urlmodel.find({customUrl})
        if(isCustomAvail.length){
            return res.status(405).json({msg:"This url is alreday taken"})
        }
        const UrltoDb=new urlmodel({orginalurl,customUrl})
        await UrltoDb.save()
        return res.status(200).json({shortendurl:customUrl})
    } catch (error) {
        console.error(error);
        return res.status(500).json({err:"Internal server error"})
    }
})
router.post("/redirect",async(req,res)=>{
    try {
        const {customUrl}=req.body
        if(!customUrl){
            return res.status(400).json({msg:"please fill the all input fields"})
        }
        const CheckAlredaypresent=await urlmodel.find({customUrl})
        console.log(CheckAlredaypresent);
        if(!CheckAlredaypresent.length>0){
            return res.status(405).json({msg:"The url is not present"})
        }
        return res.json({originalUrl:CheckAlredaypresent[0].orginalurl})
       
    } catch (error) {
        console.error(error);
        return res.status(500).json({err:"Internal server error"})
    }
})
module.exports=router