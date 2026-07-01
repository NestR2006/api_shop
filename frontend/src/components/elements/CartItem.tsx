import type { ItemObj } from "../../types"

interface CartItemProps{
  itemInfo : ItemObj,
  onDecrease: (id: number) => void,
  onIncrease: (id: number) => void,
  count: number,
  onDeleteClicked: (id: number) => void,
}

const CartItem = ({
  itemInfo,
  onDecrease,
  onIncrease,
  count,
  onDeleteClicked,
} : CartItemProps) => {
  return (
    <div className="cart-item">
      <div className="info">
        <h5 className="hero-name">{itemInfo.name}</h5>
        <h6 className="anime-name">{itemInfo.anime}</h6>
      </div>
      <div className="control-buttons-and-counter">
        <button
          className="control-button"
          onClick={() => onIncrease(itemInfo.id)}
        >
          +
        </button>
        <p className="counter">{count}</p>
        <button
          className="control-button"
          onClick={() => onDecrease(itemInfo.id)}
        >
          -
        </button>
        <button
          className="delete-button"
          onClick={() => onDeleteClicked(itemInfo.id)}
        />
      </div>
    </div>
  );
};

export default CartItem;
