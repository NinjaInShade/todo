import React, { useState, useEffect } from "react";
import "./Home.css";
import "react-toggle/style.css";

import Toggle from "react-toggle";
import Modal from "../components/Modal"
import Button from "../components/Button";
import Spinner from "react-bootstrap/Spinner";

export default function Home({colour, theme, changeHandler}) {
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showComplete, setShowComplete] = useState(false);
  const [currentId, setCurrentId] = useState();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const loadingSpinnerColour = !theme ? "primary" : "dark";

  useEffect(function () {
    async function fetchData() {
      try {
        const response = await fetch(process.env.REACT_APP_API_URL);
        const data = await response.json();
        setTodos(data.todos);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    }

    fetchData();
  }, []);

  function OpenEditHandler(id){
    setCurrentId(id)
    setShowEdit(true)
  }

  function OpenDeleteHandler(id){
    setCurrentId(id)
    setShowDelete(true)
  }

  function OpenCompleteHandler(id){
    setCurrentId(id)
    setShowComplete(true)
  }

  async function formSubmitHandler(e) {
    e.preventDefault();
    if (title && description) {
      try {
        const response = await fetch(process.env.REACT_APP_API_URL, {
          method: "POST",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            Accept: "application/json, text/plain, */*",
          },
          body: JSON.stringify({ title, description }),
        });
        const responseData = await response.json();
        console.log(responseData);
        window.location.reload(false);
      } catch (err) {
        console.log(`${err} .... An error has occurred.`);
      }
      setTitle("");
      setDescription("");
    } else {
      setError("Something went wrong");
    }
  }

  return (
    <React.Fragment>
      {showEdit && <Modal colour={colour} id={currentId} type="edit" close={setShowEdit} />}
      {showDelete && <Modal colour={colour} id={currentId} type="delete" close={setShowDelete} />}
      {showComplete && <Modal colour={colour} id={currentId} type="complete!" close={setShowComplete} />}
      <section className="top-bg" style={{backgroundColor: colour.contrast}}></section>

        <section className="todo-list">
        <div className="add-todo-container">
                <Toggle checked={theme} onChange={changeHandler} />
                <h2 className="add-todo-text" style={{color: colour.text}}>Add todo:</h2>
                <form className="add-todo-bottom">
                    <label htmlFor="todo_add" style={{color: colour.text}}>Title</label>
                    <div className="add-todo-bottom-input ">
                        <input type="text" style={{border: `1px solid ${colour.contrast}`, backgroundColor: colour.alternateContrast}} className="add-todo-input" name="todo_add" placeholder="Enter title." required onChange={(e) => setTitle(e.target.value)} value={title} maxLength="20"/>
                    </div>
                    {error && <p className="error-text">*{error}</p>}

                    <label htmlFor="todo_add" style={{color: colour.text}}>Notes</label>
                    <div className="add-todo-bottom-input">
                        <input type="text" style={{border: `1px solid ${colour.contrast}`, background: colour.alternateContrast}} className="add-todo-input" name="todo_add" placeholder="Enter notes." required onChange={(e) => setDescription(e.target.value)} value={description} maxLength="150"/>
                        <Button colour={colour} onClick={formSubmitHandler} submit>Add</Button>
                    </div>
                    {error && <p className="error-text">*{error}</p>}
                </form>
            </div>

            {loading ?  
              <Spinner animation="border" role="status"  className="spinner-margin" variant={loadingSpinnerColour}>
                <span className="sr-only">Loading...</span>
              </Spinner> : 
              todos.map(todo => {
                return (
                  <div className="todo" key={todo._id}>
                    <div className="icons">
                      <button onClick={() => OpenEditHandler(todo._id)}><i className="fas fa-edit fa-2x" style={{color: colour.alternateText}}></i></button>
                      <button onClick={() => OpenDeleteHandler(todo._id)}><i className="fas fa-trash fa-2x icons-inner" style={{color: colour.alternateText}}></i></button>
                      <button onClick={() => OpenCompleteHandler(todo._id)}><i className="fas fa-check-circle fa-2x" style={{color: colour.alternateText}}></i></button>
                    </div>
                    <hr style={{border: `1px solid ${colour.alternateText}`}}/>
                    <div className="text-wrap">
                      <h3 style={{color: colour.text}}>{todo.title}</h3>
                      <p style={{color: colour.alternateText}}>{todo.description}</p>
                  </div>
               </div>
                )
            })}
        </section>
    </React.Fragment>
  );
}
