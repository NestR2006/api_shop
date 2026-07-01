import { useRef, useState } from "react";

interface AdminAddItemFormProps{
  onCloseClicked: () => void,
}

const AdminAddItemForm = ({ onCloseClicked } : AdminAddItemFormProps) => {
  const animeNameRef = useRef<HTMLInputElement>(null);
  const charNameRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const ratingRef = useRef<HTMLInputElement>(null);
  const sizesRef = useRef<HTMLInputElement>(null);
  const colorRef = useRef<HTMLInputElement>(null);

  const [choosedImage, setImageLink] = useState("");
  const [imageFile, setFile] = useState<File | undefined>(undefined);
  const [shadowColor, setColor] = useState("");

  const submitHandler = async (e : React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("name", charNameRef.current!.value);
    formData.append("anime", animeNameRef.current!.value);
    formData.append("price", priceRef.current!.value);
    formData.append("rating", ratingRef.current!.value);
    formData.append("image", imageFile!);
    formData.append("color", shadowColor);

    const response = await fetch("/api/admin/add-item", {
      method: "POST",
      body: formData,
    });
    if (!response.ok) {
      onCloseClicked();
    }
  };

  const setImageHandler = (image: File) => {
    if (image.type === "image/png") {
      setImageLink(URL.createObjectURL(image));
      setFile(image);
    }
  };

  const setShadowColorHandler = (color : string) => {
    setColor(color);
  };

  return (
    <form action="" onSubmit={submitHandler} id="add-item-form">
      <div className="image-and-color-inputs">
        <input
          type="file"
          accept="image/png"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            const file = event.target.files?.[0];
            if (file) setImageHandler(file);
          }}
          style={{
            backgroundImage: choosedImage ? `url(${choosedImage})` : "none",
            filter: shadowColor
              ? `drop-shadow(5px 5px 5px ${shadowColor})`
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
          step={0.1}
          ref={ratingRef}
        />
        <input type="number" placeholder="Price" ref={priceRef} />
        <input type="text" placeholder="sizes" ref={sizesRef} />
        <button type="submit">Add</button>
      </div>
    </form>
  );
};

export default AdminAddItemForm;
