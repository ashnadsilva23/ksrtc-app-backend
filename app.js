const express =require("express")
const mongoose =require("mongoose")
const  cors = require("cors")
const {usermodel} =require("./models/register")
const bcrypt = require("bcryptjs") 



const app =express ()
app.use(cors())
app.use(express.json())
mongoose.connect("mongodb+srv://ashna:ashna@cluster0.n9qo4.mongodb.net/busDB?retryWrites=true&w=majority&appName=Cluster0")



const generateHashedpswd = async(password)=>{
    const salt = await bcrypt.genSalt(10)
    return bcrypt.hash(password,salt)
}



app.post("/reg",async(req,res)=>{
    let input=req.body
    let hashedpswd = await generateHashedpswd(input.password)
    console.log(hashedpswd)
    input.password=hashedpswd
    let register=new usermodel(input)
    register.save()
    res.json({"status":"success"})


})

app.listen(8080,()=>{
    console.log("server started")
})