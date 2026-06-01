import PropTypes from "prop-types";
import React, { useState } from "react";

const Filters = ({
  onChangeSizeFilter,
  activeSizeFilter,
  onChangePriceRange,
  onChangeMaterialFilter,
  currentMaxPriceRange,
  foundedItemsCount,
  onFilterReset,
  activeMaterialFilter,
}) => {
  let startValue = 1000;
  let maxEndValue = 24000;

  const [currentPrice, changeMaxPrice] = useState(startValue);
  const [showListOfHeroes, changeShowListOfHeroes] = useState(false);
  const [choosedHero, setChoosedHero] = useState("Любой персонаж");

  const changePriceFilterHandler = (event) => {
    onChangePriceRange(event.target.value);
  };

  const showHeroesListHandler = () => {
    changeShowListOfHeroes(!showListOfHeroes);
  };

  const chooseHeroHandler = (filter) => {
    setChoosedHero(filter);
  };

  return (
    <div className="filters">
      <h4>Главная/Каталог</h4>
      <h1 className="title">Дакимакуры</h1>
      <p className="sub-text">Найди свою идеальную вайфу</p>
      <button className="show-filters">Фильтры</button>

      <div className="price-filter">
        <h4 className="title">Цена</h4>
        <input
          type="range"
          min={startValue}
          max={maxEndValue}
          className="slider"
          id="price-range"
          onChange={changePriceFilterHandler}
        />
        <p id="start-value">{startValue}₴</p>
        <p id="end-value">{currentMaxPriceRange}₴</p>
      </div>

      <div className="size-filter">
        <h4 className="title">Размер</h4>
        <div className="sizes">
          {["150x50", "160x50", "180x60"].map((size) => {
            return (
              <button
                key={size}
                className={
                  "filter-btn" +
                  (activeSizeFilter === size ? " active-filter" : "")
                }
                onClick={() => onChangeSizeFilter(size)}
              >
                {size}
              </button>
            );
          })}
        </div>

        <div className="material-filter">
          <h4 className="title">Материал</h4>
          <div className="sizes">
            {["Атлас", "Полистер", "Черемша"].map((material) => {
              return (
                <button
                  key={material}
                  className={
                    "filter-btn" +
                    (activeMaterialFilter === material ? " active-filter" : "")
                  }
                  onClick={() => onChangeMaterialFilter(material)}
                >
                  {material}
                </button>
              );
            })}
          </div>
        </div>
      </div>
      <div className="hero-filter">
        <div className={"container" + (showListOfHeroes ? " openned" : " ")}>
          <h4 className="title" onClick={showHeroesListHandler}>
            {choosedHero} {">"}
          </h4>
          {[
            "Асука Ленгли",
            "Рем",
            "Хатсуне Мику",
            "Годжо Сатору",
            "Макима",
          ].map((hero) => {
            return (
              <button
                href=""
                className="hero-button"
                id={hero}
                onClick={() => chooseHeroHandler(hero)}
              >
                {hero}
              </button>
            );
          })}
          ;
        </div>
      </div>
      <button className="filterReset" onClick={onFilterReset}>
        Сбросить фильтры
      </button>
    </div>
  );
};

Filters.propTypes = {
  onChangeSizeFilter: PropTypes.func.isRequired,
  activeSizeFilter: PropTypes.string.isRequired,
  onChangePriceRange: PropTypes.func.isRequired,
  currentMaxPriceRange: PropTypes.number.isRequired,
  onChangeMaterialFilter: PropTypes.func.isRequired,
  foundedItemsCount: PropTypes.number.isRequired,
  onFilterReset: PropTypes.func.isRequired,
};

export default Filters;
