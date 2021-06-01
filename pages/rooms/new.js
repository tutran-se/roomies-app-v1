import React from "react";
import Form from "../../components/Form";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
const CreateNewRoom = () => {
  const router = useRouter();
  const createNewRoom = async (roomData,setIsLoading) => {
    try {
      const option = {
        url: process.env.NEXT_PUBLIC_DOMAIN + "/api/rooms",
        method: "post",
        data: roomData,
      };
      const { data } = await axios(option);
      console.log(data);
      router.push("/");
    } catch (error) {  
      const { data } = error.response;
      toast("🏘️ "+ data.message);
      setIsLoading(false);
    }
  };
  return (
    <div className="container">
      <Form
        type={"Create"}
        title={"Create New Room"}
        onSubmit={createNewRoom}
        room={{}}
      />
    </div>
  );
};

export default CreateNewRoom;
