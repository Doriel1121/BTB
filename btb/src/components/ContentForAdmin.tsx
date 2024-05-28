import { useEffect } from "react";
import { Character } from "../models/Character.model";
import { useFetch } from "../hooks/useFetch";
import Loader from "./Loader";
import ErrorPage from "../pages/ErrorPage";

type Props = {
  content: Character;
};

export default function ContentForAdmin({ content }: Props) {
  const { data, isLoading, isError, fetchData } = useFetch<any>();
  useEffect(() => {
    const locationId = content?.location.url.split("/").pop();
    console.log("location id: ", locationId);

    fetchData(`getLocation/location/${locationId}`, "get");
  }, []);

  if (isLoading) return <Loader />;
  if (isError) return <ErrorPage />;

  return (
    <div>
      <span>
        <strong>Dimention: </strong>
        {data?.data.dimension}
      </span>
      <br />
      <span>
        <strong>Location Type: </strong>
        {data?.data.type}
      </span>
      <br />
      <span>
        <strong>Number Of Residents: </strong>
        {data?.data.residents.length}
      </span>
    </div>
  );
}
