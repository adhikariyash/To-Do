import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './src/db/index.js';
import mongoose from 'mongoose';
import { TaskModel } from './src/models/user.models.js';

const PORT = process.env.PORT || 8000
dotenv.config(); 
const app = express();
app.use(cors({
  origin: ["http://localhost:5000"],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],

}));
app.use(express.json());

// db connect
connectDB()
.catch((err) => console.error(err));

app.post("/api/tasks", async(req,res)=>{
 const task =  req.body.task
  
 TaskModel.create({
  task:task
 }).then(result => res.json(result)).catch(err => console.log(err))
})

app.get("/tasks/get", async(req,res)=>{
  await TaskModel.find()
  .then(result => res.json(result)).catch(
    err => console.log(err)
  )
})

app.put("/update/:id", async(req, res)=>{
  const {id} = req.params;
TaskModel.findByIdAndUpdate({_id: id},{complete:true})
.then(result => res.json(result))
.catch(err => res.json(err))
} )

app.delete("/delete/:id", async(req,res)=>{
  const {id} = req.params;
  TaskModel.findByIdAndDelete({_id: id})
  .then(result => res.json(result)
).catch(err => res.json(err))
})
app.use("/", (req,res)=>{
  res.json({"message": "Hello"})
})


app.listen(PORT, ()=>{
  console.log("server is running")
})