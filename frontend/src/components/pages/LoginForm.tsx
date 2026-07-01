import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [notificationStatusAndMessage, setStatusAndMessage] = useState({
    state: false,
    text: "",
    color: "",
  });

  const setMessage = (msg: string, color: string) => {
    setStatusAndMessage({ state: true, text: msg, color: color });

    setTimeout(() => {
      setStatusAndMessage({ state: false, text: msg, color: color });
    }, 3000);
  };

  const navigate = useNavigate();

  const onSubmitHandler = async (e: React.SubmitEvent) => {
    e.preventDefault();
    const dataBlock = {
      email: emailRef.current!.value,
      password: passwordRef.current!.value,
    };

    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataBlock),
    });
    if (response.ok) {
      localStorage.setItem("token", "123");
      navigate("/user-page");
    }
    if (response.status === 401) {
      setMessage("Проверьте почту и пароль", "#dd2929");
    }
  };

  return (
    <>
      <div
        className={
          "notification" +
          (notificationStatusAndMessage.state ? " active" : "")
        }
        style={{
          boxShadow: `0px 0px 5px ${notificationStatusAndMessage.color}`,
        }}
      >
        {notificationStatusAndMessage.text}
      </div>
      <form className="form" onSubmit={onSubmitHandler}>
        <h2 className="title">Вход</h2>
        <div className="input-label">
          <label htmlFor="email">Email:</label>
          <input type="email" placeholder="Email" id="email" ref={emailRef} />
        </div>
        <div className="input-label">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            placeholder="Password"
            id="password"
            ref={passwordRef}
          />
        </div>
        <div className="input-label">
          <button type="submit">Войти</button>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
