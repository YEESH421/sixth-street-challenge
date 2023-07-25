import { useState, useEffect } from 'react'
import { firebaseSlugBase } from "../utils/firebase";
import { child, onValue, set } from "@firebase/database";
import './Todo.css'

export default function Todo({ localParticipant, participants }) {
    const [todo, setTodo] = useState([])
    // const [sharedTodo, setSharedTodo] 
    const [newTodo, setNewTodo] = useState(['', false])
    const [editing, setEditing] = useState([false, -1])
    const [count, setCount] = useState(0)
    const [checked, setChecked] = useState([])
    const addTodo = () => {
        const base = firebaseSlugBase();
        if (localParticipant) {
            set(child(base, `todo`), [...todo, newTodo])
        }
        // setTodo([...todo, newTodo])
        setNewTodo(['', false])
        setCount(count+1)
    }
    const removeTodo = (i) => {
        const base = firebaseSlugBase();
        if (localParticipant) {
            set(child(base, `todo`), todo.filter((val, indx) => 
                indx !== i
            ))
        }
        setCount(count-1)
        // setTodo(todo.filter((val, indx) => indx !== i))
    }

    const editEntry = ()=> {
        const base = firebaseSlugBase();
        if (localParticipant) {
            set(child(base, `todo`), todo)
        }       
        setEditing([false, -1])
    }

    const toggleCheck =(togIndx)=>{
        const base = firebaseSlugBase();
        if (localParticipant) {
            set(child(base, `todo`), todo.map((val, indx) => {
                let res = val
                if(indx === togIndx){
                    res[1] = !res[1]
                }
                return res
            }))
        }
        setCount(count+1)  
    }

    useEffect(() => {
        const base = firebaseSlugBase();
        const todoRef = child(base, "todo");
        onValue(todoRef, (snapshot) => {
            if (snapshot.val()) {
                let temp = []
                Object.entries(snapshot.val()).forEach(([key, val]) => {
                    if(val){
                        temp.push(val)
                    }
                })
                setTodo(temp);
            }
        });
    }, [count]);

    return (
        <>
            <h3>Todo:</h3>
            <div className='container'>
                {todo !== null ? todo.map((item, indx) => {
                    let hideEdit = indx === editing[1] && editing[0]
                    return (
                        <div key={indx}>
                            <input type="checkbox" id={`todo-${indx}`} checked={item[1]} onChange={()=>toggleCheck(indx)}></input>
                            <input type="text" value={item[0]} readOnly={!hideEdit} onChange={(e) => setTodo(todo.map((val, i) => {
                                let res = val[0]
                                if (i === indx) {
                                    res = e.target.value
                                }
                                return [res, item[1]]
                            }))}></input>
                            <button hidden={hideEdit} onClick={() => setEditing([true, indx])}>
                                Edit
                            </button>
                            <button hidden={!hideEdit} onClick={editEntry}>Update</button>
                            <button onClick={() => removeTodo(indx)}>Delete</button>
                        </div>)
                }
                ) : null}
                <input type="text" value={newTodo[0]} onChange={e => setNewTodo([e.target.value, false])} id="newTodo" placeholder="New Item"></input>
                <button onClick={addTodo} disabled={newTodo[0] === ''}>Add</button>
            </div>
        </>)
}