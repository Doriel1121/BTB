import { useContext, useEffect, useState } from "react";
import { useFetch } from "../hooks/useFetch";
import CustomSelect from "../components/CustomSelect";
import CustomTable from "../components/CustomTable";
import Header from "../components/Header";
import { AppContext } from "../context/AppContextProvider";
import { Autocomplete, Box, TextField } from "@mui/material";
import Loader from "../components/Loader";
import ErrorPage from "./ErrorPage";
import SearchBar from "../components/SearchComponent";

export default function HomePage() {
  const { data, isLoading, isError, fetchData } = useFetch<any>();
  const {
    characters,
    episodes,
    locations,
    type,
    handleCharacters,
    handleEpisodes,
    handleLocations,
  } = useContext(AppContext);
  const [currentData, setCurrentData] = useState([]);

  useEffect(() => {
    if (
      (characters.length === 0 && type === "character") ||
      (locations.length === 0 && type === "location") ||
      (episodes.length === 0 && type === "episode")
    ) {
      console.log("calling again");

      fetchData(`getData/${type}`, "get", null, handleSuccess, handleError);
      console.log(type);
      //   setCurrentData(data?.data?.results);
    } else {
      //   renderRelevantContent();
    }
  }, [type]);
  const handleSuccess = (data: any) => {
    //     // navigate("/");
    // setCurrentData(data?.data?.results);
    //     switch (type) {
    //       case "character":
    //         handleCharacters(data?.data?.results);
    //         break;
    //       case "episode":
    //         handleEpisodes(data?.data?.results);
    //         break;
    //       case "location":
    //         handleLocations(data?.data?.results);
    //         break;
    //       default:
    //         handleCharacters(data?.data?.results);
    //         break;
    //     }
    //     console.log("Data fetched successfully:", data);
  };

  const handleError = (error: any) => {
    console.error("Error fetching data:", error);
  };

  //   const renderRelevantContent = () => {
  //     // setCurrentData(data?.data?.results);
  //     console.log("im displaying");

  //     switch (type) {
  //       case "character":
  //         setCurrentData(characters);
  //         // handleCharacters(data);
  //         break;
  //       case "episode":
  //         setCurrentData(episodes);
  //         // handleEpisodes(data);
  //         break;
  //       case "location":
  //         setCurrentData(locations);
  //         // handleLocations(data);
  //         break;
  //       default:
  //         // handleCharacters(data);
  //         break;
  //     }
  //   };

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
        {/* <CustomSelect /> */}
        <SearchBar />
      </div>
      <div className="mainContentsWrapper">
        <CustomTable data={data?.data?.results} />
      </div>
    </Box>
  );
}
