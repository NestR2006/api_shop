import PropTypes from "prop-types";
import React from "react";

import "../styles/mainSection.css";

const MainSection = ({ onGoCheckCollection }) => {
  return (
    <section id="main-section">
      <div id="sub-section">
        <h4 id="sub-title">Premium Dakimakuras</h4>
        <h1 id="title">Dominate Your Doll</h1>
        <h5 id="sub-text">
          Премиальные дакимакуры для истинных студентов апликованой информатики
        </h5>
        <div className="action-buttons">
          <button className="action-button" onClick={onGoCheckCollection}>
            СМОТРЕТЬ КОЛЛЕКЦИЮ
          </button>
          <button className="action-button">ПОДРОБНИЕ</button>
        </div>
        <div id="stats">
          <div className="stat">
            <h4>300</h4>
            <p>Довольных клиентов</p>
          </div>
          <div className="stat">
            <h4>4 ГОДА</h4>
            <p>Гарантии</p>
          </div>
          <div className="stat">
            <h4>24/7</h4>
            <p>Поддержка</p>
          </div>
        </div>
      </div>
    </section>
  );
};

MainSection.propTypes = {
  onGoCheckCollection: PropTypes.func.isRequired,
};

export default MainSection;
