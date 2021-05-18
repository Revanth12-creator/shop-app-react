import React, { SyntheticEvent, Fragment } from "react";
import { Redirect, RouteComponentProps } from "react-router";
import Column from "../components/Column";
import Row from "../components/Row";
import ProductService from "../services/ProductService";
import ErrorBoundary from "../components/ErrorBoundary";
import ImageWithFallback from "../components/ImageWithFallback";
import Container from "../components/Container";
import TextBox from "../components/TextBox";
import { NavLink } from "react-router-dom";
import UserService from "../services/UserService";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import LoadingActions from "../store/actions/LoadingActions";
import UserActions from "../store/actions/UserActions";
import formatter from "../utils/formatter";
import LoadingWrapper from "../components/LoadingWrapper";
import { StoreType } from "../types";

type RegisterProps = {
  //   addressError: (error: string) => void;
  //   errorMessage: string | null;
  //   showLoader: () => void;
  //   hideLoader: () => void;
} & RouteComponentProps;

class UploadeResume extends React.Component<RegisterProps> {
  submitFile = async (e: SyntheticEvent) => {
    try {
      e.preventDefault();
      //   const { data } = await UserService.addressPost();
      //   this.props.showLoader();
      //   this.props.hideLoader();
      this.props.history.push("/profile");
    } catch (e) {
      //   this.props.addressError(formatter.titlecase(e.message.toString()));
      //   this.props.hideLoader();
      console.log(e);
    }
  };
  render() {
    return (
      <Container>
        <Row>
          <Column size={5}>
            <div className="card mx-auto col-md-8">
              <h1 className="mx-auto fw-bold ">UpLoad Resume</h1>
              <form action="">
                <TextBox
                  placeholder={"Upload File"}
                  type={"file"}
                  textChange={() => this.setState({})}
                />
                <button className={"btn btn-dark w-100 text-uppercase"}>
                  Submit{" "}
                </button>
              </form>
            </div>
          </Column>
        </Row>
      </Container>
    );
  }
}
const mapStoreDataToProps = (storeData: StoreType) => {
  return {
    errorMessage: storeData.userSession.error,
  };
};
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    // addressError: (err: string) => dispatch(UserActions.addressError(err)),
    hideLoader: () => dispatch(LoadingActions.hideLoader()),
    showLoader: () => dispatch(LoadingActions.showLoader()),
  };
};
export default connect(mapStoreDataToProps, mapDispatchToProps)(UploadeResume);
