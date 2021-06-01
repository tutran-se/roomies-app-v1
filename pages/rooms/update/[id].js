import axios from "axios";
import { useRouter } from "next/router";
import React from "react";
import { toast } from "react-toastify";
import Form from "../../../components/Form";
import Head from "next/head";
export async function getServerSideProps(context) {
  const { id } = context.params;
  const option = {
    url: process.env.NEXT_PUBLIC_DOMAIN + "/api/rooms/" + id,
    method: "get",
  };
  const { data } = await axios(option);
  return {
    props: { data }, // will be passed to the page component as props
  };
}
const UpdatePage = ({ data }) => {
  const { room } = data;
  const router = useRouter();
  const { id } = router.query;
  console.log(id);
  const updateOneRoome = async (roomData, setIsLoading) => {
    try {
      const option = {
        url: process.env.NEXT_PUBLIC_DOMAIN + "/api/rooms/" + id,
        method: "put",
        data: roomData,
      };
      const { data } = await axios(option);
      router.push("/");
    } catch (error) {
      const { data } = error.response;
      toast("🏘️ " + data.message);
      setIsLoading(false);
    }
  };
  return (
    <div className="container">
      <Head>
        <title>Roomies | Update Room</title>
      </Head>
      <Form
        type={"Update"}
        title={"Update Room"}
        onSubmit={updateOneRoome}
        room={room}
      />
    </div>
  );
};

export default UpdatePage;
