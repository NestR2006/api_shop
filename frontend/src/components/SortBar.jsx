import React, { useState } from "react";
import PropTypes from "prop-types";

import "../styles/sortBar.css";

const SortBar = ({ onActiveSortChoosed, activeSort, foundedItemsCount }) => {
  const [showSortVariants, setFlag] = useState(false);
  const showSorts = () => {
    setFlag(!showSortVariants);
  };

  const sortOptions = [
    { id: "rating", label: "По рейтингу" },
    { id: "name", label: "По алфавиту" },
    { id: "price-desc", label: "Сначала дорогие" },
    { id: "price-asc", label: "Сначала дешевые" },
  ];

  return (
    <div className="bar">
      <div
        className={"sortBy-container" + (showSortVariants ? " opened" : "")}
        onClick={showSorts}
      >
        <div className="title-part">
          <h4 className="title">Сортировка: </h4>
          <p className="activeSort">
            {activeSort === null ? "" : activeSort.label}
          </p>
        </div>
        {sortOptions.map((option) => {
          return (
            <button
              className="option-button"
              key={option.id}
              onClick={() => onActiveSortChoosed(option)}
            >
              {option.label}
            </button>
          );
        })}
      </div>
      <h4 className="itemsCounter">Найдено товаров: {foundedItemsCount}</h4>
    </div>
  );
};

SortBar.propTypes = {
  onActiveSortChoosed: PropTypes.func.isRequired,
  activeSort: PropTypes.object.isRequired,
  foundedItemsCount: PropTypes.number.isRequired,
};

export default SortBar;
