const ActionTypes = {
  SIGN_IN_SUCCESS: "[User] Login success",
  SIGN_IN_ERROR: "[User] Login error",
  Reg_ERROR: "[User] Register error",
  Address_ERROR: "[User] Register error",
  SIGN_OUT: "[User] Logout",
};

const loginSuccess = (user: object) => {
  return {
    type: ActionTypes.SIGN_IN_SUCCESS,
    user,
  };
};
const loginError = (error: string) => {
  return {
    type: ActionTypes.SIGN_IN_ERROR,
    error,
  };
};

const registerError = (error: string) => {
  return {
    type: ActionTypes.Reg_ERROR,
    error,
  };
};

const addressError = (error: string) => {
  return {
    type: ActionTypes.Address_ERROR,
    error,
  };
};

const logout = () => {
  return { type: ActionTypes.SIGN_OUT };
};

const UserActions = { loginError, loginSuccess, registerError, logout, addressError, ActionTypes };
export default UserActions;
