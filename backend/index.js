const express=require("express")
const cors=require("cors")

const app=express()
const products=require('./products')
app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
    res.send("Welcome to out online shop API....")
})

app.get("/products",(req,res)=>{
    res.send(products)
})

const port=process.env.PORT||8000
//const port=8000
app.listen(port,8000,console.log(`Server running on port ${port}`))