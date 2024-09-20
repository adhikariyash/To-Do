import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './src/db/index.js';
import { TaskModel } from './src/models/user.models.js';
app.use(cors());
app.options('*', cors());
dotenv.config(); 

const app = express();


app.use(express.json());

// db connect
connectDB()
  .then(() => {
  console.log("successfull")
  })
  .catch((err) => console.error("Database connection error:", err));

app.post("/api/tasks", async (req, res) => {
  const task = req.body.task;

  try {
    const result = await TaskModel.create({ task });
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating task" });
  }
});

app.get("/tasks/get", async (req, res) => {
  try {
    const result = await TaskModel.find();
    res.json(result);
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
      { complete: true },
      { new: true } // Return the updated document
    );
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating task" });
  }
});

app.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await TaskModel.findByIdAndDelete({ _id: id });
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting task" });
  }
});
