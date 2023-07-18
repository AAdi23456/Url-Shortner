const mongoose=require("mongoose")
const UrlSchema=mongoose.Schema({
    orginalurl:String,
    customUrl:{require:true,unique:true,type:String}
})
const UrlModel=mongoose.model("urls",UrlSchema)

module.exports=UrlModel
