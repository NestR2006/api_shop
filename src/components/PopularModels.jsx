import React from "react";
import PropTypes from "prop-types";

import popularPrint1 from "../assets/popular-print1.png";
import popularPrint2 from "../assets/popular-print2.png";
import popularPrint3 from "../assets/popular_print3.png";

const PopularModels = ({ onShowAllModels }) => {
  return (
    <section id="popular-models">
      <div className="head">
        <h1>Популярные принты -</h1>
        <a href="#" onClick={onShowAllModels}>
          Смотреть все
        </a>
      </div>
      <div className="models">
        <div className="card">
          <img src={popularPrint1} alt="" className="models-pics" />
          <h2>Хуй зна</h2>
        </div>
        <div className="card">
          <img src={popularPrint2} alt="" className="models-pics" />
          <h2>Hatsune Miku</h2>
        </div>
        <div className="card">
          <img src={popularPrint3} alt="" className="models-pics" />
          <h2>Hatsune Miku</h2>
        </div>
      </div>
    </section>
  );
};

PopularModels.propTypes = {
  onShowAllModels: PropTypes.func.isRequired,
};

export default PopularModels;
