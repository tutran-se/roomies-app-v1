import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import Button from "../components/Button";
import Form from "../components/Form";
import Loader from "../components/Loader";
import RoomItem from "../components/RoomItem";
import Link from "next/link";

export async function getServerSideProps(context) {
  const {
    location = "",
    pageNumber = 1,
    pricePerMonth = "",
    type = null,
  } = context.query;
  let queryString = `/api/rooms?location=${location}&pageNumber=${pageNumber}&pricePerMonth=${pricePerMonth}`;
  if (type) {
    queryString = queryString + `&type=${type}`;
  }
  const option = {
    url: process.env.NEXT_PUBLIC_DOMAIN + queryString,
    method: "get",
  };
  const { data } = await axios(option);
  return {
    props: { data, pageNumber }, // will be passed to the page component as props
  };
}

export default function Page({ data, pageNumber }) {
  const { rooms, isPrevious, isNext, result } = data;
  const router = useRouter();
  return (
    <main>
      <div style={{ width: "100%" }}>
        <Link href="/">
          <a>
            <h1 className="logo">Roomies</h1>
          </a>
        </Link>
        <Link href="/rooms/new">
          <a className="link">🏠 Create New Room</a>
        </Link>
        <Link href="/rooms/search">
          <a className="link">🔍 Search Room</a>
        </Link>
        <p className="introduction">
          Helping you make the best decisions in buying, selling, & renting your
          last minute locations.
        </p>
        {!result && <h3>🤦‍♂️ Ooops! Not found</h3>}
        <div
          className="room-container"
          style={{ justifyContent: result < 4 && "flex-start" }}
        >
          {rooms.map((room) => (
            <RoomItem room={room} key={room._id} />
          ))}
        </div>
        {(isPrevious || isNext) && (

          <div className="pagination">
            {result ? (<>
              <Link href={`/?pageNumber=${Number(pageNumber)-1}`}>
          <a>
          <Button
              label="Previous"
              disable={!isPrevious}
            />
          </a>
        </Link>
        <Link href={`/?pageNumber=${Number(pageNumber)+1}`}>
          <a>
          <Button label="Next" disable={!isNext} />
          </a>
        </Link>
           
            </> ) :''
            }
            
          </div>
        )}
      </div>
    </main>
  );
}
