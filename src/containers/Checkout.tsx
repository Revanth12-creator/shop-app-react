import axios from "axios";
import React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import Column from "../components/Column";
import { CartType, StoreType } from "../types";
import { Redirect } from "react-router-dom";
import Container from "../components/Container";
import Row from "../components/Row";
import LoadingActions from "../store/actions/LoadingActions";
import UserActions from "../store/actions/UserActions";

type Props = {
  cartItems: CartType[];
  deleteCartData: (id: number) => void;
  increamentQty: (id: number) => void;
  decrementQty: (id: number) => void;
} & RouteComponentProps;
type State = {
  reRender: boolean;
  name: string;
  email: string;
  phone: number;
  line1: string;
  line2: string;
  city: string;
  state: string;
  pincode: number;
  cardUName: string;
  cardNo: number;
  expiration: string;
  cvv: number;
  formData: any;
};

class Checkout extends React.Component<Props, State> {
  state: State = {
    reRender: false,
    name: "",
    email: "",
    phone: 0,
    line1: "",
    line2: "",
    city: "",
    state: "",
    pincode: 0,
    cardUName: "",
    cardNo: 0,
    expiration: "",
    cvv: 0,
    formData: [],
  };
  render() {
    const submit = (e: any) => {
      e.preventDefault();

      this.setState({
        reRender: true,
        formData: this.state,
      });
    };
    let finalData: number = 0;
    const data = this.props.cartItems.map((val: any) => {
      {
        finalData = finalData + val.productSalePrice * val.productQty;
      }
    });

    const redirecting = () => {
      if (this.state.reRender === true) {
        return <Redirect to="/" />;
      }
    };
    return (
      <>
        <Container>
          <Row>
            <Column size={12}>
              <h2 className="  text-dark fw-bold fs-3 p-2 text-center   mb-3">
                Billing Details
              </h2>
              <Row>
                <Column size={5} classes="bg-light">
                  {redirecting}
                  <form
                    onSubmit={submit}
                    className="needs-validation border  p-4 shadow-lg  rounded "
                    noValidate
                  >
                    Name:
                    <input type="text" className="form-control" required />
                    Email Id:
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email"
                      required
                    />
                    Phone No.:
                    <input type="number" className="form-control" required />
                    Address Line 1:
                    <input type="text" className="form-control" required />
                    Address Line 2
                    <input type="text" className="form-control" required />{" "}
                    <br />
                    <div className="">
                      city:
                      <input
                        type="text"
                        className="form-control"
                        required
                      />{" "}
                      state:
                      <input type="text" className="form-control" required />
                      pin:
                      <input type="number" className="form-control" required />
                    </div>
                    <hr className="border border-5 bg-gradient" />
                    Name on Card
                    <input type="text" className="form-control" required />
                    Debit/Credit Card Number
                    <input type="number" className="form-control" required />
                    <br />
                    <div className="">
                      <label htmlFor="">Expiration:</label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="MM/YYYY"
                        required
                      />
                      <label htmlFor="">CVV:</label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="XXX"
                        required
                      />
                    </div>{" "}
                    <br />
                    <button
                      id="btn"
                      className="btn btn-dark  active display-6 "
                      type="submit"
                    >
                      Continue to checkout
                    </button>
                  </form>
                </Column>
                <Column size={3} classes="offset-md-3 mt-5">
                  <div className="mx-auto my-3">
                    <img src="./card1.jpg" alt="" className="" />
                  </div>
                  <div className="card border border-3 fw-bold shadow-lg">
                    <h2> Total Amount:{finalData}</h2>
                  </div>
                </Column>
              </Row>
            </Column>
          </Row>
        </Container>
      </>
    );
  }
}

const mapStoreToProps = (state: StoreType) => {
  return {
    cartItems: state.cart,
  };
};
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    addressError: (err: string) => dispatch(UserActions.addressError(err)),
    hideLoader: () => dispatch(LoadingActions.hideLoader()),
    showLoader: () => dispatch(LoadingActions.showLoader()),
  };
};

export default connect(mapStoreToProps, mapDispatchToProps)(Checkout);
