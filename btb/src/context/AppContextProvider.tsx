import { ReactNode, createContext, useState } from "react";
import RickAndMortyCharacters from "../models/Characters.model";
import RickAndMortyLocationResponse from "../models/location.model";
import RickAndMortyEpisodeResponse from "../models/Episodes.model";

export interface AppContextInterface {
  characters: any;
  episodes: any;
  locations: any;
  type: string;
  contentToFetch: any;
  handleEpisodes: any;
  handleLocations: any;
  handleCharacters: any;
  isAdmin: boolean;
}

const defaultState = {} as AppContextInterface;
export const AppContext = createContext(defaultState);

type AppProviderProps = {
  children: ReactNode;
};

export default function AppContextProvider({ children }: AppProviderProps) {
  const [characters, setCharacters] = useState<RickAndMortyCharacters>([]);
  const [episodes, setEpisodes] = useState<RickAndMortyEpisodeResponse>([]);
  const [locations, setLocations] = useState<RickAndMortyLocationResponse>([]);
  const [type, setType] = useState<string>("character");
  const [isAdmin, setIsAdmin] = useState<boolean>(
    localStorage.getItem("role") === "admin" ? true : false
  );

  const handleCharacters = (charactersList: RickAndMortyCharacters) => {
    setCharacters(charactersList);
  };
  const handleEpisodes = (episodesList: RickAndMortyEpisodeResponse) => {
    setEpisodes(episodesList);
  };
  const handleLocations = (locationsList: RickAndMortyLocationResponse) => {
    setLocations(locationsList);
  };
  const contentToFetch = (type: string) => {
    setType(type);
  };
  //   const handleRole = (role: string) => {

  //   };
  const values = {
    characters,
    episodes,
    locations,
    handleCharacters,
    handleEpisodes,
    handleLocations,
    contentToFetch,
    type,
    isAdmin,
  };

  return (
    <AppContext.Provider value={values}>{children}</AppContext.Provider>
    // <div>provider</div>
  );
}
