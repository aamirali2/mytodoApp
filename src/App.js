import React, { useState, useEffect } from 'react'
import './App.css';
import { v4 as uuidv4 } from 'uuid';


// this fun is used to get list frome localstrorage and conver into array

const getlocalitem =()=>{


  let list = localStorage.getItem('list')
  console.log(list);
  if(list){
    return JSON.parse(list)
  }
  else{
    return [];
  }

}
function App() {
  const [text, setText] = useState("Enter here")
  const [todo, setTodo] = useState(getlocalitem())


  const changeText = (e) => {
    setText(e.target.value)
  }
  const changeHandeler = (e) => {
    // this is used to prevent form submitt
    e.preventDefault();
    
    setTodo([...todo, text])
    setText("")
  }

  const removeTodo = (deleteitem)=>{
     const finaldata = todo.filter((item, index)=>{
      return index != deleteitem ;
    })
    setTodo(finaldata)
  }

  const updateTodo = (updateitem)=>{
         if(updateitem){
           todo.filter((item)=>{
             return setText(item.id)
           })
         }
    }

  useEffect(()=>{
    // here add value to local storage
    localStorage.setItem("list",JSON.stringify(todo))

  }, [todo])

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <form onSubmit={changeHandeler}>
        <h2 className="label-wrapper">
          <label htmlFor="new-todo-input" className="label__lg">
            What needs to be done?
          </label>
        </h2>
        <input
          type="text"
          className="input input__lg"
          value={text}
          onChange={changeText}

        />
        <button type="submit" className="btn btn__primary btn__lg">
          Add
        </button>
      </form>
      <div className="filters btn-group stack-exception">
        <button type="button" className="btn toggle-btn" aria-pressed="true">
          <span className="visually-hidden">Show </span>
          <span>all</span>
          <span className="visually-hidden"> tasks</span>
        </button>
        <button type="button" className="btn toggle-btn" aria-pressed="false">
          <span className="visually-hidden">Show </span>
          <span>Active</span>
          <span className="visually-hidden"> tasks</span>
        </button>
        <button type="button" className="btn toggle-btn" aria-pressed="false">
          <span className="visually-hidden">Show </span>
          <span>Completed</span>
          <span className="visually-hidden"> tasks</span>
        </button>
      </div>
      <h2 id="list-heading">
        {todo.length} tasks remaining
      </h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {
          todo.map((item, index) => {
            return (
              <>
                <li className="todo stack-small" key={index}>
                  <div className="c-cb">
                    <input id="todo-0" type="checkbox" defaultChecked={true} />
                    <label className="todo-label" htmlFor="todo-0">
                      {item} 
                    </label>
                  </div>
                  <div className="btn-group">
                    <button type="button" className="btn" onClick={()=>updateTodo(index)}>
                      Edit <span className="visually-hidden">{item}</span>
                    </button>
                    <button type="button" className="btn btn__danger" onClick={()=>removeTodo(index)}>
                      Delete <span className="visually-hidden">{item}</span>
                    </button>
                  </div>
                </li>


              </>
            )
          })
        }
        
      </ul>
    </div>
  );
}

export default App;
