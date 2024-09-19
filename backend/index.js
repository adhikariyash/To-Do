import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './src/db/index.js';
import { TaskModel } from './src/models/user.models.js';


dotenv.config(); 
const app = express();
app.use(cors({
  origin: ["https://to-do-frontend-sigma.vercel.app/","http://localhost:5173/"],
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



