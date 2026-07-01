import type { ItemObj } from "../../types"

interface AdminItemProps{
  item: ItemObj, 
  onDeleteClicked: (itemId: number) => void, 
  onChangeInfoClicked: (item: ItemObj) => void,
}

const AdminItem = ({ item, onDeleteClicked, onChangeInfoClicked } : AdminItemProps) => {
  return (
    <li id={String(item.id)} className="AdminItem">
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
      </div>
      <button
        className="edit-item-button"
        onClick={() => onChangeInfoClicked(item)}
      />
      <button
        className="delete-item-button"
        onClick={() => onDeleteClicked(item.id)}
      />
    </li>
  );
};

export default AdminItem;
