import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Button from "../../components/Button";

const search = () => {
    const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [roomSearch, setRoomSearch] = useState({
    location: "",
    pricePerMonth: 1,
    type: "Studio",
  });
  const onChange = (e) => {
    setRoomSearch({ ...roomSearch, [e.target.name]: e.target.value });
  };
  const handleRoomSearch = () => {
    const { location, pricePerMonth, type } = roomSearch;
    let queryString = `?location=${location}&pricePerMonth=${pricePerMonth}&type=${type}`;
    router.push('/'+queryString)
  };
  return (
    <>
    <Head>
        <title>Roomies | Search Room</title>
      </Head>
    <div className="container">
      <form className="form" encType="multipart/form-data">
        <h2>Search Room</h2>

        <label htmlFor="location">Location</label>
        <input
          type="text"
          name="location"
          id="location"
          placeholder="Ex: Toronto"
          required
          value={roomSearch.location}
          onChange={onChange}
        />
        <label htmlFor="pricePerMonth">Filter by Price</label>
        <select
          name="pricePerMonth"
          id="pricePerMonth"
          value={roomSearch.pricePerMonth}
          onChange={onChange}
        >
          <option value="1">Low to High</option>
          <option value="-1">High to Low</option>
        </select>
        <label htmlFor="type">Room's Type</label>
        <select
          name="type"
          id="type"
          value={roomSearch.type}
          onChange={onChange}
        >
          <option value="Studio">Studio</option>
          <option value="Condo">Condo</option>
          <option value="Apartment">Apartment</option>
        </select>

        {isLoading ? (
          <Loader />
        ) : (
          <Button label={"Search"} onClick={handleRoomSearch} />
        )}
      </form>
    </div>
    </>
  );
};

export default search;
