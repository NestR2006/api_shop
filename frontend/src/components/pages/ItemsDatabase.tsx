import { useEffect, useState } from "react";
import AdminItem from "../elements/AdminItem";

import "../../styles/itemsDatabase.css";

import AdminChangeItemInfoForm from "../elements/AdminChangeItemInfoForm";
import AdminAddItemForm from "../elements/AdminAddItemForm";

import type { ItemObj } from "../../types";

const ItemsDatabase = () => {
  const [items, setItems] = useState<ItemObj[]>();
  const [itemToChange, setCurrentItemToChange] = useState<ItemObj>();
  const [showAddItemForm, setState] = useState(false);

  const deleteItemHandler = async (itemId: number) => {
    await fetch("/api/admin/delete-item", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ itemId: itemId }),
    });
  };

  const changeItemInfoHandler = (item : ItemObj) => {
    setCurrentItemToChange(item);
  };

  const itemSavedNewInfoHanlder = () => {
    setCurrentItemToChange(undefined);
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
