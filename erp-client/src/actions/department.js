import axios from "axios";
import { toast } from "react-toastify";
import {
  REGISTER_DEPARTMENT,
  REGISTER_DEPARTMENT_SUCCESS,
  REGISTER_DEPARTMENT_FAIL,
  GET_DEPARTMENTS,
  GET_STRUCTURE,
  GET_DEPARTMENT,
  DEPARTMENT_ERROR,
  DELETE_DEPARTMENT,
  DELETE_DEPARTMENT_SUCCESS,
  UPDATE_DEPARTMENT,
  UPDATE_DEPARTMENT_SUCCESS,
} from "./types";

//add new department
export const addDepartment =
  ({ name, description, managing_dept, children_dept }) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({
      name,
      description,
      managing_dept,
    });
    try {
      dispatch({
        type: REGISTER_DEPARTMENT,
      });
      const res = await axios.post("/api/departments", body, config);

      dispatch({
        type: REGISTER_DEPARTMENT_SUCCESS,
        payload: res.data,
      });
      toast.success("Registered Successfully.");
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) => {
          dispatch(setPopAlert(error.msg, "error"));
        });
      }

      dispatch({
        type: REGISTER_DEPARTMENT_FAIL,
      });
    }
  };

//Get all departments

export const getDepartments = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/departments");
    dispatch({
      type: GET_DEPARTMENTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: DEPARTMENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
//Get all departments with structure

export const getStructure = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/departments/hierarchy");
    dispatch({
      type: GET_STRUCTURE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: DEPARTMENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
//Get department by id
export const getDepartmentById = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/departments/${id}`);

    dispatch({
      type: GET_DEPARTMENT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: DEPARTMENT_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

//Update Department

export const updateDepartment =
  (id, { name, description, managing_dept, children_dept }) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({
      name,
      description,
      managing_dept,
      children_dept,
    });
    try {
      dispatch({
        type: UPDATE_DEPARTMENT,
      });
      const res = await axios.put(`/api/departments/${id}`, body, config);

      dispatch({
        type: UPDATE_DEPARTMENT_SUCCESS,
        payload: res.data,
      });
      toast.success("Department updated");
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => {
          toast.error(error.msg);
        });
      }
    }
  };
//Delete department by Id

export const deleteDepartment = (id) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_DEPARTMENT,
    });
    await axios.delete(`/api/departments/${id}`);

    dispatch({
      type: DELETE_DEPARTMENT_SUCCESS,
      payload: id,
    });
    toast.success("Department Deleted.");
  } catch (err) {
    console.log(err);
    dispatch({
      type: DEPARTMENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
