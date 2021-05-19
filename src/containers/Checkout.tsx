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
import UserService from "../services/UserService";
import TextBox from "../components/TextBox";
import CartActions from "../store/actions/CartActions";

type Props = {
  cartItems: CartType[];
  deleteCartData: (id: number) => void;
  increamentQty: (id: number) => void;
  decrementQty: (id: number) => void;
  resetCart: () => void;
} & RouteComponentProps;
type State = {
  reRender: boolean;
  cardUName: string;
  cardNo: any;
  // expiration: string;
  cvv: any;
  userList: any;
  addressData: any;
};

class Checkout extends React.Component<Props, State> {
  state: State = {
    reRender: false,
    cardUName: "",
    cardNo: "",
    // expiration: "",
    cvv: "",
    userList: [],
    addressData: [],
  };

  async componentDidMount() {
    try {
      const { data } = await UserService.profile();
      const orderproduct = await UserService.orderPost();
      console.log("userData", data);
      this.setState({
        userList: data,
        addressData: data.address,
      });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    console.log();
    const submit = async (e: any) => {
      e.preventDefault();
      this.props.resetCart();
      alert("Payment Done Successfully ");
      const { cardUName, cardNo, cvv } = this.state;
      const payment = await UserService.paymentPost(
        cardUName,
        cardNo,
        // expiration,
        cvv
      );

      this.setState({
        reRender: true,
        cardUName: this.state.cardUName,
        cardNo: this.state.cardNo,
        // expiration: this.state.expiration,
        cvv: this.state.cvv,
        userList: data,
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
        return <Redirect to="/products" />;
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
                  <div className="mx-auto my-3">
                    <img src="./card1.jpg" alt="" className="w-25" />
                  </div>
                  <h1 className="text-center fw-bold">Payment</h1>
                  <form action="" onSubmit={submit}>
                    {redirecting()}
                    <TextBox
                      placeholder={"CardName"}
                      type={"text"}
                      textChange={(cardUName) => this.setState({ cardUName })}
                    />
                    <TextBox
                      placeholder={"CardNo"}
                      type={"number"}
                      textChange={(cardNo) => this.setState({ cardNo })}
                    />
                    {/* <TextBox
                    placeholder={"Expiration"}
                    type={"text"}
                    textChange={(expiration) => this.setState({ expiration })}
                  /> */}
                    <TextBox
                      placeholder={"CVV"}
                      type={"number"}
                      textChange={(cvv) => this.setState({ cvv })}
                    />
                    <button className={"btn btn-dark w-100 text-uppercase"}>
                      CheckOut{" "}
                    </button>
                  </form>
                </Column>
                <Column size={4} classes="offset-md-3 mt-5">
                  <div className="card border border-3 shadow-lg">
                    <h3 className="fw-bold text-dark ">
                      Name :{" "}
                      <span className="text-warning">
                        {" "}
                        {this.state.userList.userName}
                      </span>
                    </h3>
                    <h3 className="fw-bold text-dark">
                      Email :{" "}
                      <span className="text-warning">
                        {this.state.userList.userEmail}{" "}
                      </span>{" "}
                    </h3>
                    {this.state.addressData.map((addr: any) => (
                      <div>
                        <h3 className="fw-bold text-dark">
                          Address1 :{" "}
                          <span className="text-warning">{addr.line1} </span>{" "}
                        </h3>
                        <h3 className="fw-bold text-dark">
                          Address2 :{" "}
                          <span className="text-warning">{addr.line1} </span>{" "}
                        </h3>
                        <h3 className="fw-bold text-dark">
                          Address1 :{" "}
                          <span className="text-warning">{addr.line2} </span>{" "}
                        </h3>
                        <h3 className="fw-bold text-dark">
                          City :{" "}
                          <span className="text-warning">{addr.city} </span>{" "}
                        </h3>
                        <h3 className="fw-bold text-dark">
                          State :{" "}
                          <span className="text-warning">{addr.state} </span>{" "}
                        </h3>
                        <h3 className="fw-bold text-dark">
                          Pinocode :{" "}
                          <span className="text-warning">{addr.pincode} </span>{" "}
                        </h3>
                      </div>
                    ))}
                    <div>
                      <h2 className="fw-bold"> Total Amount:{finalData}</h2>
                    </div>
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
    resetCart: () => dispatch(CartActions.resetCart()),
  };
};
export default connect(mapStoreToProps, mapDispatchToProps)(Checkout);
