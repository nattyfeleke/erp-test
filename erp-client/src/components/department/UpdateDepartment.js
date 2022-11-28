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
import { updateDepartment } from "../../actions/department";

const UpdateDepartment = (props) => {
  const {
    department,
    setUpdate,
    departments,
    updateDepartment,
    loading,
    updated,
  } = props;
  const departmentOptions = departments.map((dep) => ({
    name: dep.name,
    value: dep._id,
  }));
  const [values, setValues] = useState({
    name: department.name ? department.name : "",
    description: department.description ? department.description : "",
    managing_dept: department.managing_dept
      ? department.managing_dept?._id
      : "",
    children_dept:
      department.children_dept.length > 0
        ? department.children_dept.map((dep) => dep._id)
        : [],
  });
  useEffect(() => {
    if (updated) setUpdate(false);
  }, [updated]);

  const handleChange = (event) => {
    const {
      target: { value, name },
    } = event;
    if (name === "children_dept") {
      setValues({
        ...values,
        [name]: typeof value === "string" ? value.split(",") : value,
      });
    } else {
      setValues({ ...values, [name]: value });
    }
  };
  const handleUpdate = () => {
    updateDepartment(department._id, values);
  };
  const departmentName = (id) => departments.find((dep) => dep._id === id).name;

  return !loading ? (
    <>
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
      <Box>
        <Typography component="h4" variant="body1" sx={{ fontWeight: "600" }}>
          Managing department:{" "}
        </Typography>
        {department.has_managing_dept ? (
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
        ) : (
          <Typography variant="body1">None</Typography>
        )}
      </Box>
      {department.children_dept.length > 0 && (
        <Box>
          <Typography component="h4" variant="body1" sx={{ fontWeight: "600" }}>
            Children departments:{" "}
          </Typography>
          <Select
            multiple
            disabled
            name="children_dept"
            value={values.children_dept}
            onChange={handleChange}
            input={<OutlinedInput label="Chip" />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={departmentName(value)} />
                ))}
              </Box>
            )}
          >
            {departmentOptions.map((dep) => (
              <MenuItem key={dep.value} value={dep.value}>
                {dep.name}
              </MenuItem>
            ))}
          </Select>
        </Box>
      )}

      <Stack direction="row" spacing={2} color="#484848">
        <Button
          variant="outlined"
          color="inherit"
          onClick={() => {
            setUpdate(false);
          }}
        >
          Cancel
        </Button>
        <Button variant="contained" onClick={handleUpdate}>
          Update
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

UpdateDepartment.propTypes = {
  updateDepartment: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  updated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  loading: state.department.loading,
  updated: state.department.updated,
});

const mapDispatchToProps = {
  updateDepartment,
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateDepartment);
