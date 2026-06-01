import React from "react";

import QuoteIcon from "../assets/quote-icon.png";
import KirushaPfp from "../assets/kirusha.jpg";
import KontuziusPfp from "../assets/kontuzius-pfp.jpg";
import FrezarkaPfp from "../assets/frezarka.jfif";

const coments = [
  {
    comentText:
      "Пайобивая ету прєлєсть я панімаю шо ащущав Мірек перевіряючи мою Ардуінку",
    username: "Кірюлл АПІ",
    profilePicture: KirushaPfp,
  },
  {
    comentText: "А я ІСа в башню пробив",
    username: "Контузіус Подпівасус",
    profilePicture: KontuziusPfp,
  },
  {
    comentText: "Мене абасали я не здався бо я українець",
    username: "frezarka",
    profilePicture: FrezarkaPfp,
  },
];

const Comments = () => {
  return (
    <section id="commentsSection">
      <div className="head">
        <h1>Отзывы -</h1>
        <div className="btns">
          <button className="navigation"> {"<"} </button>
          <button className="navigation"> {">"} </button>
        </div>
      </div>
      <ul className="comments">
        {coments.map((comment) => {
          return (
            <li className="comment">
              <div className="comment-part">
                <img src={QuoteIcon} alt="" className="quote-icon" />
                <p className="comment-text">{comment.comentText}</p>
              </div>
              <div className="user-part">
                <img src={comment.profilePicture} alt="" className="user-pfp" />
                <h4 className="username">{comment.username}</h4>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Comments;
