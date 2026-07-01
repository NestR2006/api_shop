import { useState } from "react";

import "../../styles/sortBar.css";

interface SortOption{
  id: string,
  label: string
}

interface SortBarProps{
  onActiveSortChoosed: (option: SortOption) => void,
  activeSort: SortOption,
  foundedItemsCount: number
}

const SortBar = ({ onActiveSortChoosed, activeSort, foundedItemsCount } : SortBarProps) => {
  const [showSortVariants, setFlag] = useState(false);
  const showSorts = () => {
    setFlag(!showSortVariants);
  };

  const sortOptions : SortOption[] = [
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
            {activeSort ? activeSort.label : ""}
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

export default SortBar;
