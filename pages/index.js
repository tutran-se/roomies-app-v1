import axios from "axios";
import Button from "../components/Button";
import RoomItem from "../components/RoomItem";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";

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
    props: { data, pageNumber,type,location,pricePerMonth }, // will be passed to the page component as props
  };
}

export default function Page({ data, pageNumber,type,location,pricePerMonth }) {
  const { rooms, isPrevious, isNext, result } = data;
  const nextRoute = type ? `/?pageNumber=${Number(pageNumber)+1}&location=${location}&pricePerMonth=${pricePerMonth}&type=${type}`:`/?pageNumber=${Number(pageNumber)+1}`
  const previousRoute = type ? `/?pageNumber=${Number(pageNumber)-1}&location=${location}&pricePerMonth=${pricePerMonth}&type=${type}`:`/?pageNumber=${Number(pageNumber)-1}`
  return (
    <main>
      <Head>
        <title>Roomies | Home</title>
      </Head>
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
              <Link href={previousRoute}>
          <a>
          <Button
              label="Previous"
              disable={!isPrevious}
            />
          </a>
        </Link>
        <Link href={nextRoute}>
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
