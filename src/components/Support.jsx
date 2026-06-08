import React, { useRef } from "react";

import "../styles/support.css";
import { json } from "react-router-dom";

const Support = () => {
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const textRef = useRef(null);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = {
      firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value,
      email: emailRef.current.value,
      text: textRef.current.value,
    };

    console.log(JSON.stringify(formData));
  };

  return (
    <section id="support">
      <h2 className="title">Что случилось?</h2>
      <form action="" className="form-block" onSubmit={submitHandler}>
        <input
          type="text"
          name=""
          id="first-name"
          placeholder="First name"
          className="input-field"
          ref={firstNameRef}
        />
        <input
          type="text"
          name=""
          id="last-name"
          placeholder="Last name"
          className="input-field"
          ref={lastNameRef}
        />
        <input
          type="email"
          name=""
          id="email"
          placeholder="Email"
          className="input-field"
          ref={emailRef}
        />
        <textarea
          name=""
          id="text"
          className="text-input"
          placeholder="Опишите что случилось"
          ref={textRef}
        ></textarea>
        <button className="send-form">Отправить</button>
      </form>
    </section>
  );
};

export default Support;
