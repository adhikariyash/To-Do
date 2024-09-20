import React from 'react'
import Todo from './Todo'
import { useState,useEffect } from 'react';
import axios from 'axios';
import { RiCheckboxCircleFill,RiCheckboxBlankCircleLine } from "react-icons/ri";


function Home() {
const [Todos, setTodo] = useState([])
const [done, setDone] = useState()

console.log(Todos)

     useEffect(() => {
     axios.get("https://to-do-nine-khaki.vercel.app/tasks/get",{
      headers: {
        'Access-Control-Allow-Origin': '*',
    }
     }).then((result) =>  setTodo(result.data)).catch((err) => console.log(err));
      }, []);

      const handleTodo = (id)=>{
 axios.put("https://to-do-nine-khaki.vercel.app/update/"+id, {
  headers: {
    'Access-Control-Allow-Origin': '*',
}
 }).then(result => {
  setDone(result)
  location.reload()
 }).catch(err => (err))
 
      }
    
      const handleDelete =(id) =>{
      axios.delete("https://to-do-nine-khaki.vercel.app/delete/"+id,{
        headers: {
          'Access-Control-Allow-Origin': '*',
      }
      }
      )
        .then(result => console.log(result)
     ).catch(err => console.log(err))
      } 


   return (
    <div className='h-screen bg-blue-950 flex flex-col  items-center'>
    <div className='mb-10 w-full'>
    <Todo/>
    </div>
      <div className='text-white w-full sm:w-1/2 px-10 flex flex-col gap-1'>
       {(Todos.length === 0)? <p className='font-bold text-3xl text-center'>No Records!</p>: Todos.map((tod)=>
       <div>
       
         <li onClick={()=>{
            handleTodo(tod._id)
          }} className={(tod.complete)?"list-none flex justify-between bg-black px-4 py-2 font-semibold rounded-xl border-2 text-xl border-green-500":"list-none bg-black px-4 py-2 rounded-xl flex justify-between text-xl font-semibold border-2 "}>  <div className='flex justify-center items-center gap-3'> {tod.complete?<RiCheckboxCircleFill size={25} />  :<RiCheckboxBlankCircleLine size={25} /> }{tod.task} </div><button 
          onClick={()=>{
            (tod.complete)? handleDelete(tod._id) : console.log("not complete")
          }} className='font-bold border-2 px-2 rounded-full py-[2px] bg-red-600'>X</button></li>
       </div>
        )}
      </div>
    </div>
  )
}

export default Home
