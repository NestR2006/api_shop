import { useEffect, useState } from "react";
import type { ItemObj } from "../../types";


interface AdminChangeItemInfoFormProps{
  item: ItemObj, 
  onItemChangedInfo: () => void,
}

const AdminChangeItemInfoForm = ({ item, onItemChangedInfo } : AdminChangeItemInfoFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    anime: "",
    price: "",
    rating: "",
  });

  useEffect(() => {
    setFormData({
      name: item?.name || "",
      anime: item?.anime || "",
      price: String(item?.price) || "",
      rating: String(item?.rating) || "",
    });
  }, [item]);

  const changeHandler = (e : React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = (e : React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const asyncFetch = async () => {
      const response = await fetch("/api/admin/change-item-info", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: item.id,
          name: formData.name,
          anime: formData.anime,
          price: formData.price,
          rating: formData.rating,
        }),
      });
      if (response.ok) {
        onItemChangedInfo();
      }
    };
    asyncFetch();
  };

  return (
    <form id="admin-change-item-info" onSubmit={submitHandler}>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={changeHandler}
      />

      <input
        type="text"
        name="anime"
        value={formData.anime}
        onChange={changeHandler}
      />

      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={changeHandler}
      />

      <input
        type="number"
        name="rating"
        value={formData.rating}
        onChange={changeHandler}
      />

      <button type="submit">Save changes</button>
    </form>
  );
};

export default AdminChangeItemInfoForm;
