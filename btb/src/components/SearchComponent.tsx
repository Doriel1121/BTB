// src/components/SearchBar.tsx
import React, { useState, useCallback, useContext } from "react";
import { Autocomplete, TextField, CircularProgress, Box } from "@mui/material";
import axios from "axios";
import debounce from "lodash.debounce";
import { useFetch } from "../hooks/useFetch";
import { AppContext } from "../context/AppContextProvider";
import CharacterDialog from "./Modal";

interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [results, setResults] = useState<Character[]>([]);
  const [loading, setIsLoading] = useState<boolean>(false);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { data, isLoading, isError, fetchData } = useFetch<any>();
  const { handleCharacters } = useContext(AppContext);

  const fetchCharacters = useCallback(
    debounce(async (query: string) => {
      if (query) {
        setIsLoading(true);
        fetchData(`search/${query}`, "get", null, handleSuccess, handleError);
      } else {
        setResults([]);
      }
    }, 500),
    []
  );

  const handleSuccess = (data: any) => {
    setIsLoading(false);
    setResults(data.data.results);
    handleCharacters(data.data.results);
  };

  const handleError = (error: any) => {
    setIsLoading(false);
    setResults([]);
  };

  const handleChange = (event: React.ChangeEvent<{}>, value: string) => {
    let trimedValue = value.replace(/[^a-zA-Z\s]/g, "");
    setSearchTerm(trimedValue);
    fetchCharacters(trimedValue);
  };

  const handleSelect = (event: React.ChangeEvent<{}>, value: string | null) => {
    const character = results.find(
      (char) => char.name === value?.replace(/[^a-zA-Z\s]/g, "")
    );
    if (character) {
      setSelectedCharacter(character);
      setIsModalOpen(true);
    }
  };
  const handleClose = () => {
    setIsModalOpen(false);
    setSelectedCharacter(null);
  };

  return (
    <Box>
      <Autocomplete
        freeSolo
        options={results.map(
          (character) => character.name + "-" + character.id
        )}
        onInputChange={handleChange}
        onChange={handleSelect}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search Characters"
            variant="outlined"
            fullWidth
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
      />
      <CharacterDialog
        character={selectedCharacter}
        isOpen={isModalOpen}
        onClose={handleClose}
      />
    </Box>
  );
};

export default SearchBar;
