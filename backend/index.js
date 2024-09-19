import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './src/db/index.js';
import mongoose from 'mongoose';
import { TaskModel } from './src/models/user.models.js';

dotenv.config(); 

const app = express({
  origin: process.env.CORS_ORIGIN,
  credentials: true,
});
;

app.use(cors({ origin: 'https://your-netlify-site.netlify.app' }));
app.use(express.json());

// db connect
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log("your app is running");
    });
  })
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