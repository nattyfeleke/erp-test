import { Box } from "@mui/material";
import Departments from "./components/department/Departments";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <Box sx={{ m: 5 }}>
      <Box component="h4">Management Structure</Box>
      <Departments />
      <ToastContainer />
    </Box>
  );
}

export default App;
