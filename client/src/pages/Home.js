import React, { useState } from "react";
import "./Home.css";
import "react-toggle/style.css";

import Toggle from "react-toggle";
import Card from "../components/Card";

export default function Home(props) {
  // true = dark || false = light
  const [theme, setTheme] = useState(false);

  function themeChangeHandler() {
    setTheme(!theme);
  }

  const toggle = (
    <div className="mx-auto mt-4">
      <Toggle
        defaultChecked={!theme}
        icons={{
          checked: null,
          unchecked: null,
        }}
        onChange={themeChangeHandler}
      />
    </div>
  );
  const { dark, light } = props;

  const column1 = (
    <h1 className="font-weight-bold pt-4 bigger" style={{ color: dark.light }}>
      Add a todo
    </h1>
  );

  const column3 = (
    <h1 className="font-weight-bold pt-4 bigger" style={{ color: dark.light }}>
      Toggle light/dark
    </h1>
  );

  return (
    <div className="row w-100">
      {/* Add todo column */}
      <div className="col sticky-top vh-100 d-flex flex-column align-items-end">
        <section className="mx-4">
          <Card dark={dark} light={light} h="96vh" w="30vw" title={column1}></Card>
        </section>
      </div>

      {/* List of todos column */}
      <div className="col d-flex flex-column align-items-center  middleBorder px-0" style={{ borderColor: dark.darkest }}>
        {/* Heading */}
        <section className="sticky-top w-100 py-5 rounded-bottom" style={{ backgroundColor: dark.darkest }}>
          <h1 className="font-weight-bold" style={{ color: dark.light }}>
            My Todos
          </h1>
        </section>

        {/* Todos */}
        <section className="w-100 px-4">
          {/* Map every todo */}
          <Card w="75%" dark={dark} light={light} title="Todo name" todo>
            Todo info... blah blah Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusamus asperiores beatae nesciunt culpa reprehenderit, dolores possimus praesentium fuga at maxime est soluta aliquam, nam modi, laborum perspiciatis vel
            tempore natus. Hic sunt quam earum culpa velit natus. Velit, repudiandae quod ratione explicabo et ipsa voluptatibus esse excepturi quaerat vel totam rerum, facilis harum accusantium nihil fuga blanditiis consequuntur id deleniti. Libero
            dolorum unde illo adipisci necessitatibus quibusdam perferendis rem aspernatur a praesentium dolorem ab, dolor nihil aperiam, vero iste similique. Voluptatum eos dolor sapiente iusto tenetur natus quibusdam, adipisci commodi?
          </Card>
        </section>
      </div>

      {/* Dark/Light mode toggle column */}
      <div className="col sticky-top vh-100 d-flex flex-column align-items-start">
        <section className="mx-4">
          <Card dark={dark} light={light} h="96vh" w="30vw" title={column3}>
            {toggle}
          </Card>
        </section>
      </div>
    </div>
  );
}
