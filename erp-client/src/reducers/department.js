import {
  GET_DEPARTMENTS,
  GET_STRUCTURE,
  DEPARTMENT_ERROR,
  DELETE_DEPARTMENT,
  REGISTER_DEPARTMENT,
  REGISTER_DEPARTMENT_SUCCESS,
  UPDATE_DEPARTMENT,
  UPDATE_DEPARTMENT_SUCCESS,
  DELETE_DEPARTMENT_SUCCESS,
} from "../actions/types";

const initialState = {
  departments: [],
  structure: null,
  loading: true,
  error: {},
  updated: false,
};

export default function departments(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_DEPARTMENTS:
      return {
        ...state,
        departments: payload,
        loading: false,
        updated: false,
      };
    case GET_STRUCTURE:
      return {
        ...state,
        structure: payload,
        loading: false,
        updated: false,
      };
    case REGISTER_DEPARTMENT_SUCCESS:
      return {
        ...state,
        departments: [...state.departments, payload],
        loading: false,
        updated: true,
      };
    case UPDATE_DEPARTMENT:
    case DELETE_DEPARTMENT:
    case REGISTER_DEPARTMENT:
      return {
        ...state,
        loading: true,
        updated: false,
      };
    case UPDATE_DEPARTMENT_SUCCESS:
      return {
        ...state,
        departments: state.departments.map((department) => {
          if (department._id === payload._id) return payload;
          return department;
        }),
        loading: false,
        updated: true,
      };
    case DELETE_DEPARTMENT_SUCCESS:
      return {
        ...state,
        departments: state.departments.filter(
          (department) => department._id !== payload
        ),
        loading: false,
        updated: true,
      };
    case DEPARTMENT_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
