import { useState, useEffect, useContext } from "react";
import {
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Autocomplete,
  TablePagination,
} from "@mui/material";
import { AppContext } from "../context/AppContextProvider";
import CharacterDialog from "./Modal";

interface CustomTableProps {
  data: Array<{
    id: number;
    name: string;
    status: string;
    species: string;
  }> | null;
}

const CustomTable = ({ data }) => {
  //   const {
  //     type,
  //     handleCharacters,
  //     handleEpisodes,
  //     handleLocations,
  //     characters,
  //     episodes,
  //     locations,
  //   } = useContext(AppContext);
  console.log("data befor error", data);

  const [rows, setRows] = useState(data || []);
  //   const [columns, setColumns] = useState([]);
  //   const [searchQuery, setSearchQuery] = useState("");
  const [options, setOptions] = useState(data?.map((item) => item.name));
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleClose = () => {
    setIsModalOpen(false);
    setSelectedCharacter(null);
  };

  useEffect(() => {
    // const filteredRows = data?.filter((row) =>
    //   row.name.toLowerCase().includes(searchQuery.toLowerCase())
    // );
    // setRows(filteredRows);
    setOptions(data?.map((item) => item.name));
  }, [data]);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSelectedCharacter = (character) => {
    setSelectedCharacter(character);
    setIsModalOpen(true);
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ background: "#fbfbfb" }}>
          <TableHead>
            <TableCell width={"10%"}>Id</TableCell>
            <TableCell width={"15%"}>Image</TableCell>
            <TableCell width={"25%"}>Name</TableCell>
            <TableCell width={"25%"}>Status</TableCell>
            <TableCell width={"25%"}>Species</TableCell>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow
                  className="tableRow"
                  onClick={() => handleSelectedCharacter(row)}
                  key={row.id}
                >
                  <TableCell>{row.id}</TableCell>
                  <TableCell>
                    <img className="image" width={"40px"} src={row.image} />
                  </TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.status}</TableCell>
                  <TableCell>{row.species}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <CharacterDialog
        character={selectedCharacter}
        isOpen={isModalOpen}
        onClose={handleClose}
      />
    </div>
  );
  //   }
};

export default CustomTable;
