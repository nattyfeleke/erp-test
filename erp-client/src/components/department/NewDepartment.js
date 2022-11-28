import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  Button,
  Box,
  Stack,
  Typography,
  TextField,
  Select,
  OutlinedInput,
  Chip,
  MenuItem,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { addDepartment } from "../../actions/department";

const NewDepartment = (props) => {
  const { setAddDepartment, departments, addDepartment, loading, updated } =
    props;
  const departmentOptions = departments.map((dep) => ({
    name: dep.name,
    value: dep._id,
  }));
  const [values, setValues] = useState({
    name: "",
    description: "",
    managing_dept: "",
  });
  useEffect(() => {
    if (updated) setAddDepartment(false);
  }, [updated]);

  const handleChange = (event) => {
    const {
      target: { value, name },
    } = event;

    setValues({ ...values, [name]: value });
  };
  const handleSumbit = () => {
    addDepartment(values);
  };

  return !loading ? (
    <>
      <Typography
        component="h6"
        variant="body1"
        color="primary"
        sx={{ fontWeight: "600" }}
      >
        Enter Department details
      </Typography>
      <Box component="form" sx={{ display: "flex" }}>
        <Typography component="h4" variant="body1" sx={{ fontWeight: "600" }}>
          Department Name:{" "}
        </Typography>

        <TextField
          required
          label="Required"
          name="name"
          value={values.name}
          onChange={handleChange}
          sx={{ ml: 1 }}
        />
      </Box>
      <Box sx={{ display: "flex" }}>
        <Typography component="h4" variant="body1" sx={{ fontWeight: "600" }}>
          Description:{" "}
        </Typography>
        <TextField
          required
          label="Required"
          name="description"
          onChange={handleChange}
          value={values.description}
          sx={{ ml: 1 }}
        />
      </Box>
      <Box sx={{ display: "flex" }}>
        <Typography
          component="h4"
          variant="body1"
          sx={{ fontWeight: "600", mr: 1 }}
        >
          Managing department:{" "}
        </Typography>

        <Select
          value={values.managing_dept}
          required
          label="Required"
          name="managing_dept"
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {departmentOptions.map((dep) => (
            <MenuItem key={dep.value} value={dep.value}>
              {dep.name}
            </MenuItem>
          ))}
        </Select>
      </Box>

      <Stack direction="row" spacing={2} color="#484848">
        <Button
          variant="outlined"
          color="inherit"
          onClick={() => {
            setAddDepartment(false);
          }}
        >
          Cancel
        </Button>
        <Button variant="contained" onClick={handleSumbit}>
          Add
        </Button>
      </Stack>
    </>
  ) : (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={loading}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

NewDepartment.propTypes = {
  addDepartment: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  updated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  loading: state.department.loading,
  updated: state.department.updated,
});

const mapDispatchToProps = {
  addDepartment,
};

export default connect(mapStateToProps, mapDispatchToProps)(NewDepartment);
