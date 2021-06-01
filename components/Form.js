import React, { useState } from "react";
import Button from "./Button";
import Loader from "./Loader";

const Form = ({ type, onSubmit, room, title }) => {
  const [roomData, setRoomData] = useState({
    name: room.name || "",
    pricePerMonth: room.pricePerMonth || 0,
    location: room.location || "",
    type: room.type || "Studio",
    images: room.images || [],
  });
  const [isLoading, setIsLoading] = useState(false);

  const handFormSubmit = () => {
    setIsLoading(true)
    onSubmit(roomData, setIsLoading);
  };
  const onChange = (e) => {
    setRoomData({ ...roomData, [e.target.name]: e.target.value });
  };
  const imageOnchange = (e) => {
    const files = Array.from(e.target.files);
    setRoomData({ ...roomData, images: [] });

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          const imageBase64 = reader.result;
          setRoomData((oldData) => {
            return { ...oldData, images: [...oldData.images, imageBase64] };
          });
        }
      };

      reader.readAsDataURL(file);
    });
  };
  return (
    <form className="form" encType="multipart/form-data">
      <h2>{title}</h2>
      <label htmlFor="name">Name (required)</label>
      <input
        type="text"
        name="name"
        id="name"
        required
        value={roomData.name}
        onChange={onChange}
      />
      <label htmlFor="location">Location (required)</label>
      <input
        type="text"
        name="location"
        id="location"
        required
        value={roomData.location}
        onChange={onChange}
      />
      <label htmlFor="pricePerMonth">Price per month</label>
      <input
        type="number"
        name="pricePerMonth"
        id="pricePerMonth"
        required
        value={roomData.pricePerMonth}
        onChange={onChange}
      />
      <label htmlFor="type">Room's Type</label>
      <select name="type" id="type" value={roomData.type} onChange={onChange}>
        <option value="Studio">Studio</option>
        <option value="Condo">Condo</option>
        <option value="Apartment">Apartment</option>
      </select>
      <label htmlFor="images" id="uploadBtn">
        Upload Images
      </label>

      <input
        type="file"
        name="images"
        id="images"
        hidden
        onChange={imageOnchange}
        multiple
        accept="image/*"
      />

      <div className="image-preview">
        {roomData.images.length > 0 && (
          <>
            {roomData.images.map((img) => (
              <img
                src={img && img.url ? img.url : img}
                key={img}
                alt="Images Preview"
                width="55"
                height="55"
              />
            ))}
          </>
        )}
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <Button
          label={type}
          disable={(roomData.name.trim() && roomData.location.trim() && roomData.images.length !== 0) ? false : true}
          onClick={handFormSubmit}
        />
      )}
    </form>
  );
};

export default Form;
