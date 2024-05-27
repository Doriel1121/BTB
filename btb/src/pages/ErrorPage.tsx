import { Box } from "@mui/material";

export default function ErrorPage() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}
    >
      Something went wrong please try again later
    </Box>
  );
}
