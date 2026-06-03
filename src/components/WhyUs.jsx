import React from "react";

import CommunityIcon from "../assets/community-icon.png";
import GuaranteeIcon from "../assets/guarantee-icon.png";
import TestsIcon from "../assets/tests-icon.png";
import CLockIcon from "../assets/clock-icon.png";

import "../styles/whyUs.css";

const WhyUs = () => {
  return (
    <section id="why-us">
      <div id="title-and-text">
        <h1 id="title">Почему выбирают наши</h1>
        <p id="marked-word">Дакимакуры</p>
        <p className="sub-text">
          Мы создаем не просто дакимакуры, а полноценную подушку из качественной
          ткани и высококачественного принта
        </p>
      </div>
      <ul className="qualities">
        <li className="quality">
          <img src={CommunityIcon} className="list-icons" />
          <div className="title-text">
            <h3>300</h3>
            <p>Довольных клиентов</p>
          </div>
        </li>
        <li className="quality">
          <img src={GuaranteeIcon} className="list-icons" />
          <div className="title-text">
            <h3>6 лет</h3>
            <p>Рассширенной гарантии для инженеров</p>
          </div>
        </li>
        <li className="quality">
          <img src={TestsIcon} className="list-icons" />
          <div className="title-text">
            <h3>120+</h3>
            <p>Тестов качества</p>
          </div>
        </li>
        <li className="quality">
          <img src={CLockIcon} className="list-icons" />
          <div className="title-text">
            <h3>24/7</h3>
            <p>Поддержка клиентов</p>
          </div>
        </li>
      </ul>
    </section>
  );
};

export default WhyUs;
