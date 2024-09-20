import React, { useState, useEffect } from "react";
import Todo from './Todo';
import axios from 'axios';

function Home() {
  const [Todos, setTodos] = useState([]);

  useEffect(() => {
    axios.get("https://to-do-nine-khaki.vercel.app/tasks/get", {
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(result => setTodos(result.data))
      .catch(err => console.log(err));
  }, []);

  const handleNewTask = (newTask) => {
    setTodos(prevTodos => [...prevTodos, newTask]);
  }

  return (
    <div className="h-screen bg-blue-950 flex flex-col items-center">
      <div className="mb-10 w-full">
        <Todo onTaskAdded={handleNewTask} />
      </div>
    
    </div>
  );
}

export default Home;
