import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";

const AdminChangeItemInfoForm = ({ item, onItemChangedInfo }) => {
  const [formData, setFormData] = useState({
    name: "",
    anime: "",
    price: "",
    rating: "",
    inStock: "",
  });

  useEffect(() => {
    setFormData({
      name: item?.name || "",
      anime: item?.anime || "",
      price: item?.price || "",
      rating: item?.rating || "",
      inStock: item?.inStock || "",
    });
  }, [item]);

  const changeHandler = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const asyncFetch = async () => {
      const response = await fetch("/admin/change-item-info", {
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

      <input
        type="text"
        name="inStock"
        value={formData.inStock}
        onChange={changeHandler}
      />

      <button type="submit">Save changes</button>
    </form>
  );
};

AdminChangeItemInfoForm.propTypes = {
  item: PropTypes.object.isRequired,
  onItemChangedInfo: PropTypes.func.isRequired,
};

export default AdminChangeItemInfoForm;
