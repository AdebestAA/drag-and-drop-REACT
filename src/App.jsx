import React, { useEffect, useRef, useState } from 'react'
import { data } from './data'




const App = () => {
    const [todos,setTodos]  = useState(data)

    const [draggedData,setDraggedData ] = useState([])
    const handleDragStart = (e,id)=>{
    e.dataTransfer.setData("todoId",id)
    }  

    const handleDragOver = (e)=>{
    e.preventDefault()
    console.log("dragging sover");
    }

    const handleDropForStarted = (e)=>{
    const getID = e.dataTransfer.getData("todoId")
    let copyTodos = [...draggedData]
    // using filter Array Method to find Item and getting the single value from the array it returns
    let findTodos = copyTodos.filter((todo,index) => Number(todo.id) === Number(getID) )
    // get the items from the array it return
    findTodos = findTodos[0] 
    if (findTodos) {
    findTodos = {...findTodos,status:"Started"}
    }
    const filterInitialTodo = copyTodos.filter (todo => Number(todo.id)!== Number(getID) )

    setDraggedData(filterInitialTodo)
    setTodos([...todos,findTodos])
    }

    const handleDropForCompleted = (e)=>{
    const getID = e.dataTransfer.getData("todoId")
    let copyTodos = [...todos]
    // Using find Array method to find the array from the copytodos
    let findTodos = copyTodos.find((todo,index) => Number(todo.id) === Number(getID) ) 
    if (findTodos) {
    findTodos = {...findTodos,status:"Completed"}
    }

    const filterInitialTodo = copyTodos.filter (todo => Number(todo.id)!== Number(getID) )

    setDraggedData([...draggedData,findTodos])
    setTodos(filterInitialTodo)
    }
  return (
    <article className='collective-container'>
    <h1 className='top-header'>Todos</h1>
    <div className='todos-container'>
    {/* started */}
    <section className='each-status started'>
    <h1>stared</h1>

    <div 
    onDragOver={(e)=> handleDragOver(e)} 
    onDrop={(e)=> handleDropForStarted(e)}
    className='each-status-container'>
    {todos.map((todo,index)=>{

    return (
    <div key={index}  draggable={true} onDragStart={(e)=> handleDragStart(e,todo.id)} className='each-todo-div'>
    <h5>{todo.todo}</h5>
    <span>{todo.status}</span>
    </div>
    )
    })}
    </div>
    </section>


    {/* completed */}
    <section className='each-status completed'>
    <h1>completed</h1>
    <div
    onDragOver={(e)=> handleDragOver(e)} 
    onDrop={(e)=> handleDropForCompleted(e)}
    className='each-status-container'>
    {draggedData?.map((todo,index)=>{

    return (
    <div 
    draggable={true}
    onDragStart={(e)=> handleDragStart(e,todo.id)}  
    key={index} className='each-todo-div'>
    <h5>{todo.todo}</h5>
    <span>{todo.status}</span>
    </div>
    )
    })}
    </div>
    </section>
    </div>

    </article>
  )

}

export default App
