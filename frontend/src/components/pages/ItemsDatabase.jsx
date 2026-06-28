import React, { useEffect, useState } from "react";
import AdminItem from "../elements/AdminItem";
import { method } from "lodash";

import "../../styles/itemsDatabase.css";

import AdminChangeItemInfoForm from "../elements/AdminChangeItemInfoForm";
import AdminAddItemForm from "../elements/AdminAddItemForm";

const ItemsDatabase = () => {
  const [items, setItems] = useState([]);
  const [itemToChange, setCurrentItemToChange] = useState();
  const [showAddItemForm, setState] = useState(false);

  const deleteItemHandler = async (item) => {
    const response = await fetch("/api/admin/delete-item", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ itemId: item.id }),
    });
  };

  const changeItemInfoHandler = (item) => {
    setCurrentItemToChange(item);
  };

  const itemSavedNewInfoHanlder = () => {
    setCurrentItemToChange(null);
  };

  const closeAddItemFormHandler = () => {
    setState(false);
  };

  const shoeAddItemFormHandler = () => {
    setState(true);
  };

  useEffect(() => {
    const asyncFetch = async () => {
      const response = await fetch("/api/items");
      if (response.ok) {
        const data = await response.json();
        setItems(data);
      }
    };
    asyncFetch();
  }, []);

  return (
    <>
      <div className="items-database">
        <h1>База товаров:</h1>
        <ul className="admin-items">
          {items?.map((item) => (
            <AdminItem
              key={item.id}
              item={item}
              onDeleteClicked={deleteItemHandler}
              onChangeInfoClicked={changeItemInfoHandler}
            />
          ))}
        </ul>
      </div>
      {itemToChange ? (
        <AdminChangeItemInfoForm
          item={itemToChange}
          onItemChangedInfo={itemSavedNewInfoHanlder}
        />
      ) : null}
      {showAddItemForm && (
        <AdminAddItemForm onCloseClicked={closeAddItemFormHandler} />
      )}
      <button className="add-item" onClick={shoeAddItemFormHandler}>
        +
      </button>
    </>
  );
};

export default ItemsDatabase;
