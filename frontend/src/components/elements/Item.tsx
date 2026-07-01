import type { ItemObj } from "../../types"

interface ItemProps{
  item: ItemObj,
  onAddToCart: (item: ItemObj) => void,
  onLikeClicked: (item: ItemObj) => void,
  isLiked: boolean
}

const Item = ({ item, onAddToCart, onLikeClicked, isLiked } : ItemProps) => {
  return (
    <li id={String(item.id)} className="item">
      <button
        className={"like-button" + (isLiked ? " active" : "")}
        onClick={() => onLikeClicked(item)}
      />
      <img
        src={item.image}
        alt=""
        style={{ filter: `drop-shadow(5px 5px 5px ${item.color})` }}
      />
      <div className="labels">
        <h4 className="anine-name">{item.anime}</h4>
        <h2 className="hero-name">{item.name}</h2>
        <p className="rating">{item.rating}★</p>
        <p className="price">{item.price} UAH</p>
        <button className="add-to-cart" onClick={() => onAddToCart(item)}>
          Добавить в корзину
        </button>
      </div>
    </li>
  );
};

export default Item;
