import { useState } from "react";
import _ from "lodash";

import Item from "../elements/Item";
import Filters from "../elements/FiltersSidebar";
import SortBar from "../elements/SortBar";

import "../../styles/itemsList.css";

import type { ItemObj } from "../../types";

const defaultStates = {
  activeSizeFilter: "",
  activeMaterialFilter: "",
  activePriceRangeFilter: 24000,
};

interface ItemsListProps{
  items : ItemObj[],
  onAddToCartItem: (item: ItemObj) => void,
  onLikeButtonClicked: (item: ItemObj) => void,
  likedItems : ItemObj[],
}

interface SortOption{
  id: string,
  label: string
}

const ItemsList = ({
  items,
  onAddToCartItem,
  onLikeButtonClicked,
  likedItems,
}: ItemsListProps) => {
  let filteredAndSortedList = items;

  const [
    { activeSizeFilter, activeMaterialFilter, activePriceRangeFilter },
    setActiveFilters,
  ] = useState(defaultStates);

  const [activeSort, setActiveSort] = useState<SortOption>();

  const changeSizeFilterHandler = (size : string) => {
    setActiveFilters((prev) => ({
      ...prev,
      activeSizeFilter: size,
    }));
  };

  const changePriceRangeHandler = (price: number) => {
    setActiveFilters((prev) => ({
      ...prev,
      activePriceRangeFilter: price,
    }));
  };

  const changeMaterialFilterHandler = (material: string) => {
    setActiveFilters((prev) => ({
      ...prev,
      activeMaterialFilter: material,
    }));
  };

  const changeSortMethod = (sortType : SortOption) => {
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

  if (activeSizeFilter != "") {
    filteredAndSortedList = filteredAndSortedList.filter((item) =>
      item.sizes.includes(activeSizeFilter),
    );
  }

  if (activeMaterialFilter != "") {
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
        activeSizeFilter={activeSizeFilter!}
        activeMaterialFilter={activeMaterialFilter!}
        onChangePriceRange={changePriceRangeHandler}
        currentMaxPriceRange={activePriceRangeFilter}
        onFilterReset={filterResetHandler}
        onChangeMaterialFilter={changeMaterialFilterHandler}
      />
      <div className="items-and-sortbar">
        <SortBar
          onActiveSortChoosed={changeSortMethod}
          activeSort={activeSort!}
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

export default ItemsList;
