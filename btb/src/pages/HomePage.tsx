import { useContext, useEffect } from "react";
import { useFetch } from "../hooks/useFetch";
import CustomTable from "../components/CustomTable";
import { AppContext } from "../context/AppContextProvider";
import { Box } from "@mui/material";
import Loader from "../components/Loader";
import ErrorPage from "./ErrorPage";
import SearchBar from "../components/SearchComponent";

export default function HomePage() {
  const { data, isLoading, isError, fetchData } = useFetch<any>();
  const { characters, episodes, locations, type } = useContext(AppContext);

  useEffect(() => {
    if (
      (characters.length === 0 && type === "character") ||
      (locations.length === 0 && type === "location") ||
      (episodes.length === 0 && type === "episode")
    ) {
      console.log("calling again");

      fetchData(`getData/${type}`, "get");
      console.log(type);
    } else {
    }
  }, [type]);

  if (isLoading) return <Loader />;
  if (isError) return <ErrorPage />;

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        width: "100%",
        gap: "20px",
      }}
    >
      <div className="mainContentsWrapper">
        <SearchBar />
      </div>
      <div className="mainContentsWrapper">
        <CustomTable data={data?.data?.results} />
      </div>
    </Box>
  );
}
