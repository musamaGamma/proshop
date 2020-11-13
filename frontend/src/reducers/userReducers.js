import {
  userLoginRequest,
  userLoginSuccess,
  userLoginFail,
  userLogout,
  userRegisterRequest,
  userRegisterSuccess,
  userRegisterFail,
  userDetailsRequest,
  userDetailsSuccess,
  userDetailsFail,
  userUpdateProfileSuccess,
  userUpdateProfileRequest,
  userUpdateProfileFail,
  userDetailsReset,
  usersListRequest,
  usersListSuccess,
  usersListFail,
  usersListReset,
  userDeleteRequest,
  userDeleteSuccess,
  userDeleteFail,
  userUpdateReset,
  userUpdateRequest,
  userUpdateSuccess,
  userUpdateFail,
} from "../constants/userConstants";

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case userLoginRequest:
      return { loading: true };
    case userLoginSuccess:
      return { loading: false, userInfo: action.payload };
    case userLoginFail:
      return { loading: false, error: action.payload };
    case userLogout:
      return {};
    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case userRegisterRequest:
      return { loading: true };
    case userRegisterSuccess:
      return { loading: false, userInfo: action.payload };
    case userRegisterFail:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case userDetailsRequest:
      return { ...state, loading: true };
    case userDetailsSuccess:
      return { loading: false, user: action.payload };
    case userDetailsFail:
      return { loading: false, error: action.payload };
    case userDetailsReset:
      return {user: {}}
    default:
      return state;
  }
};
export const userUpdateProfuleReducer = (state = {  }, action) => {
  switch (action.type) {
    case userUpdateProfileRequest:
      return { loading: true };
    case userUpdateProfileSuccess:
      return { loading: false,success:true, userInfo: action.payload };
    case userUpdateProfileFail:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const userslistReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case usersListRequest:
      return {...state, loading: true };
    case usersListSuccess:
      return { loading: false,success:true, users: action.payload };
    case usersListFail:
      return { loading: false, error: action.payload };
    case usersListReset: 
    return {users: []}
    default:
      return state;
  }
};
export const userDeleteReducer = (state = {  }, action) => {
  switch (action.type) {
    case userDeleteRequest:
      return { loading: true };
    case userDeleteSuccess:
      return { loading: false,success:true };
    case userDeleteFail:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
export const userUpdateReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case userUpdateRequest:
      return { loading: true };
    case userUpdateSuccess:
      return { loading: false,success:true };
    case userUpdateFail:
      return { loading: false, error: action.payload };
    case userUpdateReset:
      return {user: {}}

    default:
      return state;
  }
};
