import PropTypes from "prop-types";
import React, { useRef, useState } from "react";

const AdminAddItemForm = ({ onCloseClicked }) => {
  const animeNameRef = useRef(null);
  const charNameRef = useRef(null);
  const priceRef = useRef(null);
  const ratingRef = useRef(null);
  const sizesRef = useRef(null);
  const colorRef = useRef(null);

  const [choosedImage, setImageName] = useState();
  const [imageFile, setFile] = useState();
  const [shadowColor, setColor] = useState();

  const submitHandler = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("name", charNameRef.current.value);
    formData.append("anime", animeNameRef.current.value);
    formData.append("price", Number(priceRef.current.value));
    formData.append("rating", Number(ratingRef.current.value));
    formData.append("image", imageFile);
    formData.append("color", shadowColor);

    const response = await fetch("/api/admin/add-item", {
      method: "POST",
      body: formData,
    });
    if (!response.ok) {
      const data = await response.json();
      console.log(data.detail);
    }
  };

  const setImageHandler = (image) => {
    if (image.type === "image/png") {
      setImageName(URL.createObjectURL(image));
      setFile(image);
    }
  };

  const setShadowColorHandler = (color) => {
    setColor(color);
  };

  return (
    <form action="" onSubmit={submitHandler} id="add-item-form">
      <div className="image-and-color-inputs">
        <input
          type="file"
          accept="image/png"
          onChange={(event) => setImageHandler(event.target.files[0])}
          style={{
            backgroundImage: choosedImage ? `url(${choosedImage})` : "none",
            filter: shadowColor
              ? `drop-shadow(0px 0px 15px ${shadowColor})`
              : "none",
          }}
        />
        <input
          type="color"
          ref={colorRef}
          onChange={(event) => setShadowColorHandler(event.target.value)}
        />
      </div>
      <div className="info-inputs">
        <button
          type="button"
          className="close-button"
          onClick={onCloseClicked}
        />
        <input type="text" placeholder="Anime name" ref={animeNameRef} />
        <input type="text" placeholder="Character name" ref={charNameRef} />
        <input
          type="number"
          placeholder="Rating"
          max={5}
          min={0}
          ref={ratingRef}
        />
        <input type="number" placeholder="Price" ref={priceRef} />
        <input type="text" placeholder="sizes" ref={sizesRef} />
        <button type="submit">Add</button>
      </div>
    </form>
  );
};

AdminAddItemForm.propTypes = {
  onCloseClicked: PropTypes.func.isRequired,
};

export default AdminAddItemForm;
