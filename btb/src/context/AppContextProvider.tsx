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
  user: boolean;
  handleLogout: any;
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
  const [user, setUser] = useState<boolean>(localStorage.getItem("userData"));

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
  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  const values = {
    characters,
    episodes,
    locations,
    handleCharacters,
    handleEpisodes,
    handleLocations,
    contentToFetch,
    type,
    user,
    handleLogout,
  };

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
}
