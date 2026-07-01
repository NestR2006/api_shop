import Item from "../elements/Item";

import "../../styles/likedItems.css";

import type { ItemObj } from "../../types";

interface LikedItemsProps{
  likedItems: ItemObj[],
  onLikeButtonClicked: (likedItem: ItemObj) => void,
  onAddToCartButtonClicked: (item: ItemObj) => void,
}

const LikedItems = ({
  likedItems,
  onLikeButtonClicked,
  onAddToCartButtonClicked,
}: LikedItemsProps) => {
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
              isLiked={true}
            />
          );
        })}
      </div>
    </section>
  );
};

export default LikedItems;
