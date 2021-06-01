import React from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
const RoomItem = ({ room }) => {
  const router = useRouter();
  console.log(router);
  const deleteOneRoome = async () => {
    try {
      const option = {
        url: process.env.NEXT_PUBLIC_DOMAIN + "/api/rooms/"+ room._id,
        method: "delete",
      };
    //   console.log(roomData);
      await axios(option);
      router.push(router.asPath);
    } catch (error) {  
        console.log(error);
      const { data } = error.response;
      toast("🏘️ "+ data.message);
    }
  };
  return (
    <div className="room-item">
      <Image
        src={room.images[0].url}
        width={780}
        height={480}
        alt="room-cover"
      />

      <p className="room-price">${room.pricePerMonth} / month</p>
      <p className="room-type">{room.type}</p>
      <h3 className="room-name">{room.name}</h3>
      <p className="room-location">{room.location}</p>
      <div className="room-footer">
        <Link href={`/rooms/update/${room._id}`}>
          <a>
        <span className="update">Update</span>
          </a>
        </Link>
        <span className="delete" onClick={deleteOneRoome}>Delete</span>
      </div>
    </div>
  );
};

export default RoomItem;
