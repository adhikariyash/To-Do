import mongoose from "mongoose";
const taskSchema =  mongoose.Schema({
    task:{
        type: String,
        required: true,
    },
    complete:{
        type: Boolean,
        default: false,
    }
})
export const TaskModel = mongoose.model("TaskModel", taskSchema) 