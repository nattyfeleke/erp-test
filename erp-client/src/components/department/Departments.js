import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import TreeView from "@mui/lab/TreeView";
import TreeItem from "@mui/lab/TreeItem";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";

import Department from "./Department";
import UpdateDepartment from "./UpdateDepartment";
import NewDepartment from "./NewDepartment";

import { connect } from "react-redux";
import { getDepartments, getStructure } from "../../actions/department";
// Icons
import AddIcon from "@mui/icons-material/Add";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const boxStyle = {
  maxWidth: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  border: "1px dashed",
  p: 2,
};

const Departments = (props) => {
  const {
    getDepartments,
    getStructure,
    department: { structure, departments, loading, updated },
  } = props;
  const [selected, setSelected] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [addDepartment, setAddDepartment] = useState(false);
  const [update, setUpdate] = useState(false);
  useEffect(() => {
    getDepartments();
    getStructure();
  }, [getDepartments, getStructure]);
  useEffect(() => {
    if (updated) {
      getDepartments();
      getStructure();

      setSelectedDepartment(null);
    }
  }, [updated]);

  const handleChange = (e, nodeId) => {
    setSelected(nodeId);
    const selectedDep = departments.find((dep) => dep._id === nodeId);
    setSelectedDepartment(selectedDep);
  };

  const getNodes = (childrens) => {
    return childrens.map((child, index) => (
      <div key={index}>
        {child.children_dept.length > 0 ? (
          <TreeItem key={child._id} nodeId={child._id} label={child.name}>
            {getNodes(child.children_dept)}
          </TreeItem>
        ) : (
          <TreeItem key={child._id} nodeId={child._id} label={child.name} />
        )}
      </div>
    ));
  };

  return (
    <>
      {!addDepartment && (
        <Button
          variant="outlined"
          sx={{ textTransform: "none", mb: 2 }}
          startIcon={<AddIcon />}
          onClick={() => {
            setAddDepartment(true);
          }}
        >
          Add department
        </Button>
      )}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "2rem",
        }}
      >
        <Box>
          {" "}
          {loading ? (
            <Backdrop
              sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={loading}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
          ) : (
            structure && (
              <>
                <TreeView
                  defaultCollapseIcon={<ExpandMoreIcon />}
                  defaultExpandIcon={<ChevronRightIcon />}
                  sx={{ flexGrow: 1, minWidth: "162px" }}
                  onNodeSelect={(e, nodeId) => {
                    //only change selected department when the department is not getting updated or added
                    !update || !addDepartment ? handleChange(e, nodeId) : null;
                  }}
                  selected={selected}
                >
                  <TreeItem nodeId={structure?._id} label={structure?.name}>
                    {structure?.children_dept.length > 0 &&
                      getNodes(structure?.children_dept)}
                  </TreeItem>
                </TreeView>
              </>
            )
          )}
        </Box>
        <Box sx={boxStyle}>
          {addDepartment ? (
            <NewDepartment
              departments={departments}
              setAddDepartment={setAddDepartment}
            />
          ) : selectedDepartment ? (
            update ? (
              <UpdateDepartment
                department={selectedDepartment}
                departments={departments}
                setUpdate={setUpdate}
              />
            ) : (
              <Department
                department={selectedDepartment}
                setUpdate={setUpdate}
              />
            )
          ) : (
            <>
              <Typography variant="body1" sx={{ color: "#9c9c9c" }}>
                No department selected
              </Typography>
            </>
          )}
        </Box>
      </Box>
    </>
  );
};

Departments.propTypes = {
  getStructure: PropTypes.func.isRequired,
  getDepartments: PropTypes.func.isRequired,
  department: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  department: state.department,
});

export default connect(mapStateToProps, { getDepartments, getStructure })(
  Departments
);
