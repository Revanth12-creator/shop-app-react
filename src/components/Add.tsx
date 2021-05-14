import React, { SyntheticEvent, Fragment } from "react";
import { RouteComponentProps } from "react-router";
import Column from "../components/Column";
import Row from "../components/Row";
import ProductService from "../services/ProductService";
import ErrorBoundary from '../components/ErrorBoundary';
import ImageWithFallback from "../components/ImageWithFallback";
import Container from "./Container";
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
    addressError: (error: string) => void;
    errorMessage: string | null;
    showLoader: () => void;
    hideLoader: () => void;
} & RouteComponentProps;
type RegisterState = {
    address1: string,
    address2: string,
    city: string,
    state1: string,
    pincode: any
};
class Add extends React.Component<RegisterProps> {
    state: RegisterState = { address1: "", address2: "", city: "", state1: "", pincode: '' };
    submitData = async (e: SyntheticEvent) => {
        try {
            e.preventDefault();
            const { address1, address2, city, state1, pincode } = this.state;
            const { data } = await UserService.addressPost(address1, address2, city, state1, pincode);
            this.props.showLoader();
            this.props.hideLoader();
            this.props.history.push('/profile')
        } catch (e) {
            this.props.addressError(formatter.titlecase(e.message.toString()));
            this.props.hideLoader();
            console.log(e)
        }
    };
    render() {
        console.log(this.props.errorMessage)
        return (
            <Container>
                <Row>
                    <Column size={12}>
                        <div className="card col-md-6 mx-auto">
                            <h1 className="text-center">Add Address</h1>
                            <small className="text-danger">{this.props.errorMessage}</small>
                            <div className="card-body">
                                <form onSubmit={this.submitData}>
                                    <TextBox
                                        placeholder={"Address1"}
                                        type={"text"}
                                        textChange={(name) => this.setState({})}
                                    />
                                    <TextBox
                                        placeholder={"Address2"}
                                        type={"text"}
                                        textChange={(email) => this.setState({})}
                                    />
                                    <TextBox
                                        placeholder={"city"}
                                        type={"text"}
                                        textChange={(password) => this.setState({ password })}
                                    />
                                    <TextBox
                                        placeholder={"State"}
                                        type={"text"}
                                        textChange={(password) => this.setState({ password })}
                                    />
                                    <TextBox
                                        placeholder={"Pincode"}
                                        type={"text"}
                                        textChange={(password) => this.setState({ password })}
                                    />
                                    {/* <NavLink to={"/profile"}> */}
                                    <button className={"btn btn-dark w-100 text-uppercase"}>
                                        Add  </button>
                                    {/* </NavLink> */}
                                </form>
                            </div>
                        </div>
                    </Column>
                </Row>
            </Container >
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
        addressError: (err: string) => dispatch(UserActions.addressError(err)),
        hideLoader: () => dispatch(LoadingActions.hideLoader()),
        showLoader: () => dispatch(LoadingActions.showLoader()),
    };
};
export default connect(mapStoreDataToProps, mapDispatchToProps)(Add);

