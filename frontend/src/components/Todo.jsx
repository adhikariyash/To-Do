import React, { useEffect, useState } from "react";
import axios from "axios";

function Todo() {
  const [task, setTask] = useState();
  
 

  function handleTask() {
    axios.post("https://to-do-nine-khaki.vercel.app/api/tasks", { task: task },{
      headers: {
        'Content-Type': 'application/json',
    }
    })
      .then((result) => {
        location.reload()
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className=" flex justify-center bg-blue-950 items-center w-full  flex-col">
      <div className=" pt-10 w-1/2 flex flex-row justify-center">
        <form  className="w-full justify-center items-center flex">
          <input
          type="text" required
          placeholder="Task"
            value={task}
            onChange={(e) => {
              setTask(e.target.value);
            }}
            className="border-2 text-lg sm:w-full px-7  font-bold lg:text-2xl p-2 rounded-xl border-black 
             rounded-r-none"
          />
          <button
            type="button"
            onClick={handleTask}
            className=" bg-black py-3 px-4 border-2 border-red-500 font-bold text-2xl  rounded-r-full text-white "
          >
            Add
          </button>
        </form>
      </div>
     
    </div>
  );
}

export default Todo;
