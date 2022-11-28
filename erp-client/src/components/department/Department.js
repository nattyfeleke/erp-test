import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Box,
  Stack,
  Typography,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import ConfirmModal from "../ConfirmModal";
import { connect } from "react-redux";
import { deleteDepartment } from "../../actions/department";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

function Department({ department, setUpdate, deleteDepartment, loading }) {
  const [showManagingDept, setShowManagingDept] = useState(false);
  const [showChildDept, setShowChildDept] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subtitle: "",
  });

  const handleClose = () =>
    setConfirmDialog({ ...confirmDialog, isOpen: false });
  useEffect(() => {
    return () => {
      setShowChildDept(false);
      setShowManagingDept(false);
    };
  }, [department]);
  const onDelete = (id) => {
    setConfirmDialog({ ...confirmDialog, isOpen: false });
    deleteDepartment(id);
  };
  return !loading ? (
    <>
      <Box sx={{ display: "flex" }}>
        <Typography component="h4" variant="body1" sx={{ fontWeight: "600" }}>
          Department Name:{" "}
        </Typography>
        <Typography component="p" variant="body1" sx={{ ml: 1 }}>
          {department.name}{" "}
        </Typography>
      </Box>
      <Box sx={{ display: "flex" }}>
        <Typography component="h4" variant="body1" sx={{ fontWeight: "600" }}>
          Description:{" "}
        </Typography>
        <Typography component="p" variant="body1" sx={{ ml: 1 }}>
          {department.description}{" "}
        </Typography>
      </Box>
      <Box>
        <Button
          sx={{
            fontSize: "0.875rem",
            textTransform: "none",
            lineHeight: "1.125",
            p: 0,
            textAlign: "left",
          }}
          onClick={() => setShowManagingDept(!showManagingDept)}
        >
          Click here to see managing department
        </Button>
        {showManagingDept && (
          <Box sx={{ mt: 0.5 }}>
            <Typography
              onClick={() => {
                department.has_managing_dept &&
                  setSelected(department.managing_dept?._id);
              }}
              sx={{ fontSize: "0.875rem", cursor: "pointer" }}
            >
              {department.has_managing_dept
                ? department.managing_dept?.name
                : "No managing department"}
            </Typography>
          </Box>
        )}
      </Box>
      <Box>
        {department.children_dept.length > 0 && (
          <Button
            sx={{
              fontSize: "0.875rem",
              textTransform: "none",
              lineHeight: "1.125",
              p: 0,
              textAlign: "left",
            }}
            onClick={() => setShowChildDept(!showChildDept)}
          >
            Click here to see children departments
          </Button>
        )}

        {showChildDept && (
          <Box sx={{ mt: 0.5 }}>
            {department.children_dept.map((dep) => (
              <Typography
                key={dep._id}
                component="p"
                variant="body1"
                sx={{ fontSize: "0.875rem", cursor: "pointer" }}
                onClick={() => {
                  setSelected(dep?._id);
                }}
              >
                {dep.name}
              </Typography>
            ))}
          </Box>
        )}
      </Box>
      <Stack direction="row" spacing={2}>
        <Button
          variant="outlined"
          color="warning"
          startIcon={<DeleteIcon />}
          onClick={() => {
            setConfirmDialog({
              isOpen: true,
              title: "Are you sure to delete this Department?",
              subtitle: "You can't undo this operation",
              onConfirm: () => {
                onDelete(department._id);
              },
            });
          }}
        >
          Delete
        </Button>
        <Button
          variant="outlined"
          startIcon={<EditIcon />}
          onClick={() => {
            setUpdate(true);
          }}
        >
          Edit
        </Button>
      </Stack>

      <ConfirmModal confirmDialog={confirmDialog} handleClose={handleClose} />
    </>
  ) : (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={loading}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}

Department.propTypes = {
  deleteDepartment: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  loading: state.department.loading,
});

const mapDispatchToProps = {
  deleteDepartment,
};
export default connect(mapStateToProps, mapDispatchToProps)(Department);
