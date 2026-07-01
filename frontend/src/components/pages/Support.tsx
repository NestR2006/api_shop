import { useRef } from "react";

import "../../styles/support.css";

const Support = () => {
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);

  const submitHandler = (e: React.SubmitEvent) => {
    e.preventDefault();

    const formData = {
      firstName: firstNameRef.current!.value,
      lastName: lastNameRef.current!.value,
      email: emailRef.current!.value,
      text: textRef.current!.value,
    };

    fetch("/api/support", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => console.log("Success:", data))
      .catch((error) => console.error("Error sending form data:", error));
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
