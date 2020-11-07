import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./Modal.css";

import CloseIcon from "../static/Close.svg";
import Button from "./Button";

export default function Modal(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const { type, id, close, colour } = props;

  useEffect(
    function () {
      async function fetchTodo() {
        try {
          const response = await fetch(`${process.env.REACT_APP_API_URL}/${id}`);
          const responseData = await response.json();
          setTitle(responseData.todo.title);
          setDescription(responseData.todo.description);
        } catch (err) {
          console.log(err);
        }
      }

      fetchTodo();
    },
    [id]
  );

  async function clickHandler() {
    if (type === "edit") {
      if (title && description) {
        try {
          await fetch(`${process.env.REACT_APP_API_URL}/${id}`, {
            method: "PATCH",
            headers: {
              Accept: "application/json, text/plain, */*",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ title, description }),
          });
        } catch (err) {
          console.log(err);
        }
        window.location.reload(false);
        setError("");
      } else {
        setError("Something went wrong!");
      }
    }
    if (type === "delete") {
      try {
        await fetch(`${process.env.REACT_APP_API_URL}/${id}`, { method: "DELETE" });
        window.location.reload(false);
      } catch (err) {
        console.log(err);
      }
    }
    if (type === "complete!") {
      try {
        await fetch(`${process.env.REACT_APP_API_URL}/${id}`, { method: "DELETE" });
        window.location.reload(false);
      } catch (err) {
        console.log(err);
      }
    }
  }

  const content = (
    <React.Fragment>
      <div className="modalOverlay" onClick={() => close(false)}></div>
      <div className="modalContainer">
        <img src={CloseIcon} alt="close" className="modalClose" onClick={() => close(false)} />
        {type === "edit" && 
                <React.Fragment>
                <h2 className="modalTitle">Fill in the form (any unchanged fields stay the same)</h2>
                <form className="add-todo-bottom">
                    <label htmlFor="todo_add" style={{color: colour.text}}>Title</label>
                    <div className="add-todo-bottom-input ">
                        <input type="text" style={{border: `1px solid ${colour.contrast}`, backgroundColor: colour.alternateContrast}} className="add-todo-input input-fix" name="todo_add" placeholder="Enter title." required onChange={(e) => setTitle(e.target.value)} value={title} maxLength="20"/>
                    </div>
                    {error && <p className="error-text">*{error}</p>}

                    <label htmlFor="todo_add" style={{color: colour.text}}>Notes</label>
                    <div className="add-todo-bottom-input">
                        <input type="text" style={{border: `1px solid ${colour.contrast}`, background: colour.alternateContrast}} className="add-todo-input" name="todo_add" placeholder="Enter notes." required onChange={(e) => setDescription(e.target.value)} value={description} maxLength="150"/>
                        <Button colour={colour} onClick={clickHandler} submit>Add</Button>
                    </div>
                    {error && <p className="error-text">*{error}</p>}
                </form>
                </React.Fragment>
        }
        {type === "delete" && 
        <React.Fragment>
          <h2 className="modalTitle" style={{color: colour.text}}>Are you sure you want to delete this todo (cannot go back)</h2>
          <Button onClick={clickHandler} colour={colour}>{type}</Button>
        </React.Fragment>
        }

        {type === "complete!" && 
        <React.Fragment>
          <h2 className="modalTitle" style={{color: colour.text}}>Are you sure you want to complete this todo (deletes it)</h2>
          <Button onClick={clickHandler} colour={colour}>{type}</Button>
        </React.Fragment>
        }
      </div>
    </React.Fragment>
  );

  return ReactDOM.createPortal(content, document.getElementById("modal"));
}
