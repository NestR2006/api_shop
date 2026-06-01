import React, { useState } from "react";
import items from "../api/items";
import _ from "lodash";

import Item from "./Item";
import Filters from "./FiltersSidebar";
import SortBar from "./SortBar";

const minPrice = 1000;
const maxEndPrice = 24000;

const defaultStates = {
  activeSizeFilter: null,
  activeMaterialFilter: null,
  activePriceRangeFilter: 24000,
};

const ItemList = () => {
  let filteredAndSortedList = items;

  const [{ activeSizeFilter, activePriceRangeFilter }, setActiveFilters] =
    useState(defaultStates);

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
    filteredAndSortedList = filteredAndSortedList.filter(
      (item) => !item.sizes.indexOf(activeSizeFilter),
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
        onChangePriceRange={changePriceRangeHandler}
        currentMaxPriceRange={activePriceRangeFilter}
        foundedItemsCount={filteredAndSortedList.length}
        onFilterReset={filterResetHandler}
      />
      <div className="items-and-sortbar">
        <SortBar
          onActiveSortChoosed={changeSortMethod}
          activeSort={activeSort}
          foundedItemsCount={filteredAndSortedList.length}
        />
        <ul className="items-list">
          {filteredAndSortedList.map((item) => {
            return <Item item={item}></Item>;
          })}
        </ul>
      </div>
    </section>
  );
};

export default ItemList;
