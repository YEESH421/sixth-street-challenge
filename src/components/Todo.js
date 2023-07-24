import { set } from 'firebase/database'
import { useState } from 'react'
import './Todo.css'

export default function Todo() {
    const [todo, setTodo] = useState([])
    const [newTodo, setNewTodo] = useState('')
    const [editing, setEditing] = useState([false, -1])
    const addTodo = () => {
        setTodo([...todo, newTodo])
        setNewTodo('')
    }
    const removeTodo = (i) => {
        setTodo(todo.filter((val, indx) => indx !== i))
    }
    return (
        <>
            <h3>Todo:</h3>
            <div className='container'>
                {todo.map((item, indx) => {
                    let hideEdit = indx === editing[1] && editing[0]
                    return (
                        <div key={indx}>
                            <input type="checkbox" id={`todo-${indx}`}></input>
                            <input type="text" value={todo[indx]} readOnly={!hideEdit} onChange={(e)=>setTodo(todo.map((val, i) => {
                                let res = val
                                if(i === indx){
                                    res = e.target.value
                                }
                                return res
                            }))}></input>
                            <button hidden={hideEdit} onClick={() => setEditing([true, indx])}>
                                Edit
                            </button>
                            <button hidden={!hideEdit} onClick={() => setEditing([false, -1])}>Update</button>
                            <button onClick={() => removeTodo(indx)}>Delete</button>
                        </div>)
                }
                )}
                <input type="text" value={newTodo} onChange={e => setNewTodo(e.target.value)} id="newTodo" placeholder="New Item"></input>
                <button onClick={addTodo} disabled={newTodo === ''}>Add</button>
            </div>
        </>)
}