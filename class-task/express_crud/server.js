import express from "express"
import {userData} from "./data.js";
import {mid1,validationPost} from "./middleware.js";
const app = express();

app.use(express.json())
app.use(mid1)

app.get("/", (req,res)=>{
    res.send("home route")
})

app.get("/user", (req,res)=>{

    return res.json(userData)
})

app.get("/user/:id", (req,res)=>{
    const id=req.params.id;

    const user=userData.find((ele)=>ele.id==id);

    if(!user){
        res.json({
            message:"user not found"
        })
    }

    return res.json(user)
})


app.get("/search", (req,res)=>{
    console.log(req.query)
    const username = req.query.name;
    const password=req.query.password
    res.send({
        username, password
    })
})

app.post("/user", (req,res)=>{

    let{name, age,city}=req.body;

    if(!name || !age || !city){
        return res.status(400).json({
            message:"please provide all details"
        })
    }

    let newUserdata={
        id:userData.length+1,
        name:name,
        age:age,
        city:city
    }

    userData.push(newUserdata)
    res.status(200).json({message:"user created successfully"})

})

app.listen(3000,()=>{
    console.log("server is running")
})