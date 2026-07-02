import { useState } from "react";
import AdminItem from "../elements/AdminItem";

import "../../styles/itemsDatabase.css";

import AdminChangeItemInfoForm from "../elements/AdminChangeItemInfoForm";
import AdminAddItemForm from "../elements/AdminAddItemForm";

import type { ItemObj } from "../../types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const ItemsDatabase = () => {
  const ItemsFetch = useQuery({queryKey: ["items"], queryFn: async () : Promise<ItemObj[]> => {
    const response = await fetch("/api/items");
    return await response.json();
  }})

  const queryClient = useQueryClient();
  const deleteItemMutation = useMutation({mutationFn: async(itemId: number) => {
    const response = await fetch("/api/admin/delete-item", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ itemId: itemId }),
    });

    return await response.json();
  },
  onSuccess:() => {
    queryClient.invalidateQueries({queryKey: ["items"]});
  }})

  const items = ItemsFetch.data ?? [];

  const [itemToChange, setCurrentItemToChange] = useState<ItemObj>();
  const [showAddItemForm, setState] = useState(false);

  const deleteItemHandler = async (itemId: number) => {
    deleteItemMutation.mutate(itemId);
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
