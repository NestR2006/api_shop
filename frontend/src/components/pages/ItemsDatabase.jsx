import React, { useEffect, useState } from "react";
import AdminItem from "../elements/AdminItem";
import { method } from "lodash";

import "../../styles/itemsDatabase.css";

import AdminChangeItemInfoForm from "../elements/AdminChangeItemInfoForm";

const ItemsDatabase = () => {
  const [items, setItems] = useState([]);
  const [itemToChange, setCurrentItemToChange] = useState();

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
      {itemToChange ? (
        <AdminChangeItemInfoForm
          item={itemToChange}
          onItemChangedInfo={itemSavedNewInfoHanlder}
        />
      ) : null}
    </div>
  );
};

export default ItemsDatabase;
