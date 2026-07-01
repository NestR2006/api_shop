import React, { useRef, useState } from "react";

const RegistrationForm = () => {
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  const [notificationStatusAndMessage, setStatusAndMessage] = useState({
    state: false,
    text: "",
    color: "",
  });

  const setMessage = (msg : string, color: string) => {
    setStatusAndMessage({ state: true, text: msg, color: color });

    setTimeout(() => {
      setStatusAndMessage({ state: false, text: msg, color: color });
    }, 3000);
  };

  const onSubmitHandler = async (e : React.SubmitEvent) => {
    e.preventDefault();

    if (passwordRef.current!.value !== confirmPasswordRef.current!.value) {
      setMessage("Пароли не совпадают", "#dd2929");
      return;
    }

    if (
      !firstNameRef.current!.value.trim() ||
      !lastNameRef.current!.value.trim() ||
      !emailRef.current!.value.trim() ||
      !phoneRef.current!.value.trim() ||
      !addressRef.current!.value.trim() ||
      !passwordRef.current!.value.trim() ||
      !confirmPasswordRef.current!.value.trim()
    ) {
      setMessage("Поля не заполнены", "#dd2929");
      return;
    }

    const dataBlock = {
      firstName: firstNameRef.current!.value,
      lastName: lastNameRef.current!.value,
      email: emailRef.current!.value,
      phone: phoneRef.current!.value,
      address: addressRef.current!.value,
      password: passwordRef.current!.value,
    };

    const response = await fetch("/api/registration", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataBlock),
    });
    const data = await response.json();

    if (response.ok) {
      setMessage("Регистрация прошла успешно", "green");
    } else {
      console.log(data.detail);
      setMessage(data.detail, "red");
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
      <form className="form registration-form" onSubmit={onSubmitHandler}>
        <h2 className="title">Регистрация</h2>
        <div className="input-label">
          <label htmlFor="first-name">Имя</label>
          <input
            type="text"
            placeholder="First Name"
            id="first-name"
            ref={firstNameRef}
          />
        </div>
        <div className="input-label">
          <label htmlFor="last-name">Фамилия</label>
          <input
            type="text"
            placeholder="Last Name"
            id="last-name"
            ref={lastNameRef}
          />
        </div>
        <div className="input-label">
          <label htmlFor="email">Электронная почта:</label>
          <input type="email" placeholder="Email" id="email" ref={emailRef} />
        </div>
        <div className="input-label">
          <label htmlFor="phone">Номер телефона:</label>
          <input
            type="tel"
            placeholder="Phone number"
            id="phone"
            ref={phoneRef}
          />
        </div>
        <div className="input-label">
          <label htmlFor="address">Адресс</label>
          <input
            type="text"
            placeholder="Living address"
            id="address"
            ref={addressRef}
          />
        </div>
        <div className="input-label">
          <label htmlFor="password">Пароль:</label>
          <input
            type="password"
            placeholder="Password"
            id="password"
            ref={passwordRef}
          />
        </div>
        <div className="input-label">
          <label htmlFor="confirm-password">Пароль</label>
          <input
            type="password"
            placeholder="Confirm Password"
            id="confirm-password"
            ref={confirmPasswordRef}
          />
        </div>
        <div className="input-label">
          <button type="submit">Создать</button>
        </div>
      </form>
    </>
  );
};

export default RegistrationForm;
