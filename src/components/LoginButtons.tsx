import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import StorageService from "../services/StorageService";
import UserActions from "../store/actions/UserActions";
import { StoreType } from "../types";
import CartButton from "./CartButton";

const LoginButtons: React.FC = (props) => {
  // const store = useStore<StoreType>();
  const auth = useSelector((store: StoreType) => !!store.userSession.user);
  const dispatch = useDispatch();
  const history = useHistory();
  if (auth) {
    return (
      <Fragment>
        <CartButton />
        <Link className="btn btn-link" to={"/profile"}>
          Profile
        </Link>
        <button
          className="btn btn-sm btn-outline-primary mx-2"
          onClick={() => {
            StorageService.clearAll();
            dispatch(UserActions.logout());
            history.push("/"); // redirect
          }}
        >
          Logout
        </button>
      </Fragment>
    );
  }
  return (
    <div>
      <Link className="btn btn-sm btn-outline-primary mx-2" to={"/register"}>
        Register
    </Link>
      <Link className="btn btn-sm btn-outline-primary mx-2" to={"/login"}>
        Login
    </Link>
    </div>

  );
};
export default LoginButtons;
