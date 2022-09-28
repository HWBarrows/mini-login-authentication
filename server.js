import express from 'express'
import  connect  from './lib/database.js'
import dotenv from 'dotenv'
import User from './models/User.js'

dotenv.config()
connect()
const app = express()
app.use(express.json())

app.post('/register', async (req, res)=> { 
    const user = await User.register(req.body)
    if (user){
        return res.send({user})
    }
    res.status(400).send({error: "Invalid Input"})
})
app.post('/login', async (req, res)=> { 
    const user = await User.login(req.body)
    if (user){
        return res.send({user})
    }
    
    res.status(401).send({success:false, error: "Invalid credentials"})
})


app.listen(3535, ()=> {
    console.log("Hi from http://localhost:3535");
})