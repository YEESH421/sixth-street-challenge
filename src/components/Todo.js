import { set } from 'firebase/database'
import { useState } from 'react'
import './Todo.css'

export default function Todo() {
    const [todo, setTodo] = useState([])
    const [newTodo, setNewTodo] = useState('')
    const addTodo = ()=> {
        setTodo([...todo, newTodo])
        setNewTodo('')
    }
    const removeTodo = (i) =>{
        setTodo(todo.filter((val, indx) => indx !== i))
    }
    return (
        <>
            <h3>Todo:</h3>
            {todo.map((item, indx) => {
                return (
                <div key={indx}>
                    <input type="checkbox" id={`todo-${indx}`}></input>
                    <label htmlFor={`todo-${indx}`}>{item}</label>
                    <button onClick={()=>removeTodo(indx)}>Delete</button>
                </div>)
            }
            )}
            <input type="text" value={newTodo} onChange={e => setNewTodo(e.target.value)} id="newTodo" placeholder="New Item"></input>
            <button onClick={addTodo}>Add</button>
        </>)
}