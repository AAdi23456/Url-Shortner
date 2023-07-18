const urlrouter=require("./routes/url")
const express=require("express")
const app=express()
const MongoDbConnection=require("./database/Mongodb")
const cors=require("cors")
app.use(express.json())
app.use(cors())
app.use("/",urlrouter)



try {
    app.listen(3000,()=>{
        console.log("server is running on port 3000")
        MongoDbConnection

    })
} catch (error) {
    console.error(error);
}