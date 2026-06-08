import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";

import Item from "./Item";

import "../styles/likedItems.css";

const LikedItems = ({
  likedItems,
  onLikeButtonClicked,
  onAddToCartButtonClicked,
}) => {
  return (
    <section id="liked-items">
      <h1 className="liked-title">
        Любимые товары{" "}
        <span className="liked-count">({likedItems.length})</span>
      </h1>
      <div className="liked-items-grid">
        {likedItems.map((likedItem) => {
          return (
            <Item
              item={likedItem}
              onLikeClicked={onLikeButtonClicked}
              onAddToCart={onAddToCartButtonClicked}
            />
          );
        })}
      </div>
    </section>
  );
};

LikedItems.propTypes = {
  likedItems: PropTypes.array.isRequired,
  onLikeButtonClicked: PropTypes.func.isRequired,
  onAddToCartButtonClicked: PropTypes.func.isRequired,
};

export default LikedItems;
