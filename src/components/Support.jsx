import React from "react";

import "../styles/support.css";
import { json } from "react-router-dom";

const Support = () => {
  const sendFormHandler = (object) => {
    console.log(JSON.stringify(object));
  };

  return (
    <section id="support">
      <div className="form-block">
        <h2 className="title">Что случилось?</h2>
        <input
          type="text"
          name=""
          id="first-name"
          placeholder="First name"
          className="input-field"
        />
        <input
          type="text"
          name=""
          id="last-name"
          placeholder="Last name"
          className="input-field"
        />
        <input
          type="email"
          name=""
          id="email"
          placeholder="Email"
          className="input-field"
        />
        <textarea
          name=""
          id="text"
          className="text-input"
          placeholder="Опишите что случилось"
        ></textarea>
        <button
          className="send-form"
          onClick={() => {
            sendFormHandler({
              firtName: document.querySelector("#first-name").value,
              lastName: document.querySelector("#last-name").value,
              email: document.querySelector("#email").value,
              text: document.querySelector("#text").value,
            });
          }}
        >
          Отправить
        </button>
      </div>
    </section>
  );
};

export default Support;
