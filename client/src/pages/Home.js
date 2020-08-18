import React, { useState } from "react";
import "./Home.css";
import "react-toggle/style.css";

import Toggle from "react-toggle";
import Card from "../components/Card";
import Button from "../components/Button";

const DUMMY_TODO = [
  { title: "Todo 1", description: "This is the description for todo 1", key: 1 },
  { title: "Todo 2", description: "This is the description for todo 2. I had a cheat day yesterday" },
  { title: "Todo 3", description: "This is the description for todo 3. Diet back on point today!" },
  { title: "Todo 4", description: "This is the description for todo 4. Gym later. Math too!" },
  { title: "Todo 5", description: "This is the description for todo 4. Gym later. Math too! Lets get it" },
];

export default function Home(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const { colour, theme, changeHandler } = props;

  const column1 = (
    <h1 className="font-weight-bold pt-4 bigger" style={{ color: colour.light }}>
      Add a todo
    </h1>
  );
  const column3 = (
    <h1 className="font-weight-bold pt-4 bigger" style={{ color: colour.light }}>
      Toggle light/dark
    </h1>
  );

  const errorMessage = (
    <div className="alert alert-danger alert-dismissible fade show mt-3 w-75 mx-auto" role="alert">
      <strong>Invalid!</strong> Make sure no inputs are empty.
      <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={resetError}>
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  );

  function resetError() {
    setError("");
  }

  function titleChangeHandler(e) {
    setTitle(e.target.value);
  }

  function descriptionChangeHandler(e) {
    setDescription(e.target.value);
  }

  function formSubmitHandler(e) {
    e.preventDefault();
    if (title && description) {
      DUMMY_TODO.push({ title, description, key: 6 });
      setTitle("");
      setDescription("");
      setError("");
    } else {
      setError(errorMessage);
    }
  }

  return (
    <div className="row w-100">
      {/* Add todo column */}
      <div className="col sticky-top vh-100 d-flex flex-column align-items-end">
        <section className="mx-4">
          <Card colour={colour} h="96vh" w="30vw" title={column1} theme={theme}>
            <form>
              <input className="form-control form-control-lg w-50 mx-auto mt-5 mb-3" type="text" placeholder="Title" required onChange={titleChangeHandler} value={title} maxLength="20" />
              <textarea className="form-control w-75 mx-auto mb-3" rows="3" placeholder="Description" required onChange={descriptionChangeHandler} value={description} maxLength="150" />
              <Button w="75%" text="Add" onClick={formSubmitHandler} submit />
              {error}
            </form>
          </Card>
        </section>
      </div>

      {/* List of todos column */}
      <div className="col d-flex flex-column align-items-center  middleBorder px-0" style={{ borderColor: colour ? colour.darkest : colour.mid }}>
        {/* Heading */}
        <section className="sticky-top w-100 py-5 rounded-bottom" style={{ backgroundColor: colour.darkest }}>
          <h1 className="font-weight-bold" style={{ color: colour.light }}>
            My Todos
          </h1>
        </section>

        {/* Todos */}
        <section className="w-100 px-4">
          {/* Map every todo */}
          {DUMMY_TODO.map((todo, i) => {
            return (
              <Card colour={colour} w="75%" title={todo.title} theme={theme} todo key={i}>
                {todo.description}
              </Card>
            );
          })}
        </section>
      </div>

      {/* Dark/Light mode toggle column */}
      <div className="col sticky-top vh-100 d-flex flex-column align-items-start">
        <section className="mx-4">
          <Card colour={colour} h="96vh" w="30vw" title={column3} theme={theme}>
            <div className="mx-auto mt-4">
              <Toggle checked={theme} onChange={changeHandler} />
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
}
