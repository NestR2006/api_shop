import React, { useState } from "react";
import _ from "lodash";

import Item from "./Item";
import Filters from "./FiltersSidebar";
import SortBar from "./SortBar";

import "../styles/itemsList.css";
import PropTypes from "prop-types";

const minPrice = 1000;
const maxEndPrice = 24000;

const defaultStates = {
  activeSizeFilter: null,
  activeMaterialFilter: null,
  activePriceRangeFilter: 24000,
};

const ItemsList = ({
  items,
  onAddToCartItem,
  onLikeButtonClicked,
  likedItems,
}) => {
  let filteredAndSortedList = items;

  const [
    { activeSizeFilter, activeMaterialFilter, activePriceRangeFilter },
    setActiveFilters,
  ] = useState(defaultStates);

  const [resetStates, InitResetStates] = useState(true);
  const [activeSort, setActiveSort] = useState(null);

  const changeSizeFilterHandler = (size) => {
    setActiveFilters((prev) => ({
      ...prev,
      activeSizeFilter: size,
    }));
  };

  const changePriceRangeHandler = (price) => {
    setActiveFilters((prev) => ({
      ...prev,
      activePriceRangeFilter: price,
    }));
  };

  const changeMaterialFilterHandler = (material) => {
    setActiveFilters((prev) => ({
      ...prev,
      activeMaterialFilter: material,
    }));
  };

  const changeSortMethod = (sortType) => {
    setActiveSort(sortType);
  };

  const filterResetHandler = () => {
    setActiveFilters(defaultStates);
  };

  if (activeSort != null) {
    switch (activeSort.id) {
      case "rating":
        filteredAndSortedList = _.orderBy(
          filteredAndSortedList,
          ["rating"],
          ["desc"],
        );
        break;
      case "name":
        filteredAndSortedList = _.orderBy(
          filteredAndSortedList,
          ["name"],
          ["desc"],
        );
        break;
      case "price-desc":
        filteredAndSortedList = _.orderBy(
          filteredAndSortedList,
          ["price"],
          ["desc"],
        );
        break;
      case "price-asc":
        filteredAndSortedList = _.orderBy(
          filteredAndSortedList,
          ["price"],
          ["asc"],
        );
        break;
    }
  }

  if (activeSizeFilter != null) {
    filteredAndSortedList = filteredAndSortedList.filter((item) =>
      item.sizes.includes(activeSizeFilter),
    );
  }

  if (activeMaterialFilter != null) {
    filteredAndSortedList = filteredAndSortedList.filter((item) =>
      item.material.includes(activeMaterialFilter),
    );
  }

  if (activePriceRangeFilter != null) {
    filteredAndSortedList = filteredAndSortedList.filter(
      (item) => item.price <= activePriceRangeFilter,
    );
  }

  return (
    <section id="items">
      <Filters
        onChangeSizeFilter={changeSizeFilterHandler}
        activeSizeFilter={activeSizeFilter}
        activeMaterialFilter={activeMaterialFilter}
        onChangePriceRange={changePriceRangeHandler}
        currentMaxPriceRange={activePriceRangeFilter}
        foundedItemsCount={filteredAndSortedList.length}
        onFilterReset={filterResetHandler}
        onChangeMaterialFilter={changeMaterialFilterHandler}
      />
      <div className="items-and-sortbar">
        <SortBar
          onActiveSortChoosed={changeSortMethod}
          activeSort={activeSort}
          foundedItemsCount={filteredAndSortedList.length}
        />
        <ul className="items-list">
          {filteredAndSortedList.map((item) => {
            return (
              <Item
                item={item}
                onAddToCart={onAddToCartItem}
                onLikeClicked={onLikeButtonClicked}
                isLiked={likedItems.includes(item)}
              />
            );
          })}
        </ul>
      </div>
    </section>
  );
};

ItemsList.propTypes = {
  onAddToCartItem: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
  onLikeClicked: PropTypes.func.isRequired,
  likedItems: PropTypes.array.isRequired,
};

export default ItemsList;
