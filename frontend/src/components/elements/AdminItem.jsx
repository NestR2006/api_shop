import PropTypes from "prop-types";
import React from "react";

const AdminItem = ({ item, onDeleteClicked, onChangeInfoClicked }) => {
  const deleteItemHanlder = (item) => {
    console.log(item, "Deleted");
  };

  return (
    <li id={item.id} className="AdminItem">
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
        onClick={() => onDeleteClicked(item)}
      />
    </li>
  );
};

AdminItem.propTypes = {
  item: PropTypes.object.isRequired,
  onDeleteClicked: PropTypes.func.isRequired,
  onChangeInfoClicked: PropTypes.func.isRequired,
};

export default AdminItem;
