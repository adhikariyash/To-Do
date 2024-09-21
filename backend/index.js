import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './src/db/index.js';
import { TaskModel } from './src/models/user.models.js';
const app = express();
dotenv.config(); 
const PORT = process.env.PORT || 8000


app.use(cors({
  origin:['https://to-dolist99.vercel.app/','https://to-do-black-psi.vercel.app/']
}));

app.use(express.json());

// db connect
connectDB()
  .then(() => {
 app.listen(PORT, (req,res)=>{
  console.log(`${PORT}`)
 })
  })
  .catch((err) => console.error("Database connection error:", err));

app.post("/api/tasks", async (req, res) => {
  const task = req.body.task;
 console.log(task)
  try {
    const result = await TaskModel.create({ task });
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating task" });
  }
});

app.get("/tasks/get", async (req, res) => {
  try {
    const result = await TaskModel.find();
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching tasks" });
  }
});

app.put("/update/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await TaskModel.findByIdAndUpdate(
      { _id: id },
      { complete: true }
    );
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating task" });
  }
});

app.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await TaskModel.findByIdAndDelete({ _id: id });
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting task" });
  }
});
