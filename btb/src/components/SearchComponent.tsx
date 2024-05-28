// src/components/SearchBar.tsx
import React, { useState, useCallback, useContext } from "react";
import { Autocomplete, TextField, CircularProgress, Box } from "@mui/material";
import debounce from "lodash.debounce";
import { useFetch } from "../hooks/useFetch";
import { AppContext } from "../context/AppContextProvider";
import CharacterDialog from "./Modal";
import { Character } from "../models/Character.model";

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
    setSearchTerm(value);
    fetchCharacters(value);
  };

  const handleSelect = (event: React.ChangeEvent<{}>, value: any) => {
    const character = results.find((char) => char.name === value?.name);
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
        options={results.map((character) => ({
          name: character.name,
          id: character.id,
        }))}
        onInputChange={handleChange}
        getOptionLabel={(option) => option.name}
        onChange={handleSelect}
        renderOption={(props, option) => (
          <li {...props} key={option.id}>
            {option.name}
          </li>
        )}
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
