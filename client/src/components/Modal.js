import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./Modal.css";

import CloseIcon from "../static/Close.svg";
import Button from "./Button";

export default function Modal(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const { type, id, close } = props;

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

  const errorMessage = (
    <div className="alert alert-danger alert-dismissible fade show mt-3 w-75 mx-auto" role="alert">
      <strong>Invalid!</strong> Make sure no inputs are empty.
      <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={() => setError("")}>
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  );

  function titleChangeHandler(e) {
    setTitle(e.target.value);
  }

  function descriptionChangeHandler(e) {
    setDescription(e.target.value);
  }

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
        setError(errorMessage);
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
        {type === "edit" && <h2 className="modalTitle">Fill in the form (any unchanged fields stay the same)</h2> && (
          <form>
            <input className="form-control form-control-lg w-100 mx-auto mt-5 mb-3" type="text" required onChange={titleChangeHandler} value={title} maxLength="20" />
            <textarea className="form-control w-75 mx-auto mb-3" rows="3" required onChange={descriptionChangeHandler} value={description} maxLength="150" />
            {error}
          </form>
        )}
        {type === "delete" && <h2 className="modalTitle">Are you sure you want to delete this todo (cannot go back)</h2>}
        {type === "complete!" && <h2 className="modalTitle">Are you sure you want to complete this todo (deletes it)</h2>}
        <Button text={type} onClick={clickHandler} h="20%" w="35%" />
      </div>
    </React.Fragment>
  );

  return ReactDOM.createPortal(content, document.getElementById("modal"));
}
