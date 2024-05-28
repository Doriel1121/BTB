// src/components/CharacterDialog.tsx
import React, { useContext, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
} from "@mui/material";
import { Character } from "../models/Character.model";
import ContentForAdmin from "./ContentForAdmin";
import { AppContext } from "../context/AppContextProvider";

interface CharacterDialogProps {
  character: Character | null;
  isOpen: boolean;
  onClose: () => void;
}

const CharacterDialog: React.FC<CharacterDialogProps> = ({
  character,
  isOpen,
  onClose,
}) => {
  const { user } = useContext(AppContext);
  const isAdmin =
    JSON.parse(localStorage.getItem("userData")).role === "admin"
      ? true
      : false;

  return (
    <Dialog
      sx={{ width: "100%", minWidth: "300px" }}
      open={isOpen}
      onClose={onClose}
    >
      <DialogTitle>{character?.name}</DialogTitle>
      <DialogContent>
        <Box
          className="modal"
          sx={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-evenly",
            gap: "20px",
          }}
          display="flex"
          alignItems="center"
        >
          <Box>
            {character && (
              <img
                src={character.image}
                alt={character.name}
                width={200}
                height={200}
              />
            )}
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              flexDirection: "column",
            }}
          >
            <span>
              <strong>Status:</strong> {character?.status}
            </span>
            <span>
              <strong>Species:</strong> {character?.species}
            </span>
            <span>
              <strong>Gender:</strong> {character?.gender}
            </span>
            <span>
              <strong>Origin:</strong> {character?.origin.name}
            </span>
            <span>
              <strong>Location:</strong> {character?.location.name}
            </span>
            {isAdmin ? <ContentForAdmin content={character} /> : null}
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CharacterDialog;
