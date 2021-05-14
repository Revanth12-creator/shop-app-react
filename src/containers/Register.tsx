import React, { SyntheticEvent, Fragment } from "react";
import Column from "../components/Column";
import { Redirect } from "react-router-dom";
import Row from "../components/Row";
import TextBox from "../components/TextBox";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { StoreType } from "../types";
import axios from 'axios';
import UserService from "../services/UserService";
import { Dispatch } from "redux";
import LoadingActions from "../store/actions/LoadingActions";
import UserActions from "../store/actions/UserActions";
import formatter from "../utils/formatter";
import LoadingWrapper from "../components/LoadingWrapper";

type RegisterProps = {
    registerError: (error: string) => void;
    errorMessage: string | null;
    showLoader: () => void;
    hideLoader: () => void;
} & RouteComponentProps;
type RegisterState = {
    name: string,
    email: string,
    password: string,
    redirect: boolean
};
class Register extends React.Component<RegisterProps> {
    state: RegisterState = { name: "", email: "", password: "", redirect: false };
    register = async (e: SyntheticEvent) => {
        try {
            e.preventDefault();
            const { name, email, password, } = this.state;
            const { data } = await UserService.register(name, email, password);
            this.props.showLoader();
            this.props.hideLoader();
            this.props.history.push('/login')
        } catch (e) {
            this.props.registerError(formatter.titlecase(e.message.toString()));
            this.props.hideLoader();
            console.log(e)
        }
    };
    render() {
        return (
            <LoadingWrapper>
                <Row>
                    <Column
                        size={4}
                        classes={
                            "offset-md-4 shadow-sm border p-4 text-center rounded mt-5"
                        }>
                        <h2>Register</h2>
                        <hr />
                        <small className="text-danger">{this.props.errorMessage}</small>
                        <form onSubmit={this.register}  >
                            <TextBox
                                placeholder={"Name"}
                                type={"text"}
                                textChange={(name) => this.setState({ name })}
                            />
                            <TextBox
                                placeholder={"Email"}
                                type={"email"}
                                textChange={(email) => this.setState({ email })}
                            />
                            <TextBox
                                placeholder={"Password"}
                                type={"password"}
                                textChange={(password) => this.setState({ password })}
                            />
                            <button className={"btn btn-success w-100 text-uppercase"}>
                                Register
                </button>
                        </form>
                    </Column>
                </Row>
            </LoadingWrapper>
        )
    }
}
const mapStoreDataToProps = (storeData: StoreType) => {
    return {
        errorMessage: storeData.userSession.error,
    };
};
const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        registerError: (err: string) => dispatch(UserActions.registerError(err)),
        hideLoader: () => dispatch(LoadingActions.hideLoader()),
        showLoader: () => dispatch(LoadingActions.showLoader()),
    };
};
export default connect(mapStoreDataToProps, mapDispatchToProps)(Register);
