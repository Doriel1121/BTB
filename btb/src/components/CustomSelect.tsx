import { useContext } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { AppContext } from "../context/AppContextProvider";

export default function CustomSelect() {
  const { type, contentToFetch, isAdmin } = useContext(AppContext);

  const handleChange = (event: SelectChangeEvent) => {
    contentToFetch(event.target.value as string);
  };
  console.log("role", isAdmin);

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel>Content</InputLabel>
        <Select
          sx={{
            borderRadius: "15px",
          }}
          labelId="mySelect"
          value={type}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={"character"}>character</MenuItem>
          {isAdmin ? <MenuItem value={"episode"}>episode</MenuItem> : null}
          <MenuItem value={"location"}>location</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
