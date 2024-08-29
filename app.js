import express from "express"
import path from "path"
import router from "./routes/routes.js"
import "dotenv/config"
import dbConnect from "./dbConnect.js"
import cookieParser from "cookie-parser"
// import { restrictlogin, restrictsignup } from "./middleware/auth.js"


const app=express()
const PORT=process.env.PORT
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use("/",router)
app.use(cookieParser())


dbConnect(process.env.MONGO_URL).then(()=>console.log("Database is connected "))

app.set("view engine","ejs");
app.set('views',path.resolve("./views"))


app.listen(PORT,(req,res)=>{
    console.log("server is running at port : ",PORT)
})