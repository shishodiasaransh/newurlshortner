import URL from "../models/models.js";
import User from "../models/userModel.js";
import { v4 as uuidv4 } from "uuid";
import { setuser } from "../service/auth.js";
import cookieParser from "cookie-parser";

export async function signup(req,res){
return res.render("signup.ejs")
}

export async function handlesingup(req,res) {
    const {name,email,password} = req.body;
  if (!name || !email || !password) return res.status(400).json({ msg: "Please enter details" });
  await User.create({
    name,
    email,
    password
  })
  
  const allurls= await URL.find({})
  return res.render('home.ejs',{urls:allurls})
    
}

export async function login(req,res) {
  return res.render('login.ejs')
  
}

export async function handlelogin(req,res) {
  const {email,password} = req.body
  console.log(email,password)
  const user = await User.findOne({email,password})
  console.log(user)

  if (!user) return res.status(400).render('login.ejs',{msg:'invalid username or password'})

    const sessionid = uuidv4()
    setuser(sessionid,user).then(()=>console.log("set"))
    res.cookie("uid",sessionid)
  const allurls= await URL.find({})
  return res.render('home.ejs',{urls:allurls})
}