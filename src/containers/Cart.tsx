import axios from "axios";
import React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import Column from "../components/Column";
import StorageService from "../services/StorageService";
import { CartType, StoreType } from "../types";
import { BrowserRouter, NavLink, Redirect, useHistory } from "react-router-dom";
import Container from "../components/Container";
import Row from "../components/Row";
import { Dispatch } from "redux";
import CartActions from "../store/actions/CartActions";

type Props = {
  cartItems: CartType[];
  deleteCartData: (id: number) => void;
  increamentQty: (id: number) => void;
  decrementQty: (id: number) => void;
} & RouteComponentProps;
type State = {
  reRender: boolean;
  totalAmo: number;
};

class Cart extends React.Component<Props, State> {
  state: State = { reRender: false, totalAmo: 0 };

  render() {
    console.log("total", this.state.totalAmo);
    const submit = (e: any) => {
      e.preventDefault();
      this.setState({
        reRender: true,
      });
    };
    const redirecting = () => {
      if (this.state.reRender === true) {
        return <Redirect to="/checkout" />;
      }
    };

    let TotalAmount: number = 0;
    return (
      <Container>
        <Row>
          <Column size={8}>
            <div className="jumbotron text-center"></div>
          </Column>
        </Row>

        <Column size={12}>
          <div className="container card col-md-8">
            {redirecting()}
            <h1 className="display-5 fw-bold text-primary text-center ">
              CART LIST
            </h1>

            <table className="table">
              <thead>
                <tr>
                  <th className="text-warning">PRODUCT IMAGE</th>
                  <th className="text-warning">NO</th>
                  <th className="text-warning"> ID</th>
                  <th className="text-warning"> NAME</th>
                  <th className="text-warning"> PRIZE</th>
                  <th className="text-warning"> QUANTITY</th>
                  <th className="text-warning">TOTAL PRIZE</th>

                  <th className="text-warning">ACTION</th>
                </tr>
              </thead>
              <tbody>
                {this.props.cartItems.map((data: any, index: number) =>
                  data.productQty > 0 ? (
                    <tr key={data.productId}>
                      <div className="">
                        <td>
                          <img
                            src={data.productImage}
                            className="col-md-3"
                            alt="img"
                          />
                        </td>
                      </div>
                      <th className="fw-bold display-7" scope="row">
                        {index + 1}
                      </th>
                      <td className="fw-bold display-7">{data.productId}</td>
                      <td className="fw-bold display-7">{data.productName}</td>
                      <td className="fw-bold display-7">
                        INR {data.productSalePrice}
                      </td>
                      <td>
                        <button
                          className="btn btn-success m-1"
                          onClick={() =>
                            this.props.increamentQty(data.productId)
                          }
                        >
                          +
                        </button>
                        {data.productQty}
                        <button
                          className="btn btn-danger m-1"
                          onClick={() =>
                            this.props.decrementQty(data.productId)
                          }
                        >
                          -
                        </button>
                      </td>
                      <td className="fw-bold display-7">
                        INR {data.productSalePrice * data.productQty}
                        <p style={{ display: "none" }}>
                          {
                            (TotalAmount =
                              TotalAmount +
                              data.productSalePrice * data.productQty)
                          }
                        </p>
                      </td>

                      <td>
                        <div className="mt-5  pb-0 mb-1  rounded ">
                          <button
                            className="btn btn-info fw-bold"
                            onClick={() => {
                              this.props.deleteCartData(data.productId);
                            }}
                          >
                            <i className="fas fa-trash display-7"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ) : null
                )}
              </tbody>
            </table>
            <div>
              <h2 className={"totalProductPrice"}>
                Total Product Price <b>INR {TotalAmount}</b>
              </h2>
            </div>

            <div className="align-items-center">
              <button className="btn btn-success p-3" onClick={submit}>
                {" "}
                Check Out
              </button>
            </div>
          </div>
        </Column>
      </Container>
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
    deleteCartData: (id: number) => dispatch(CartActions.removeItem(id)),
    increamentQty: (id: number) => dispatch(CartActions.increaseQty(id)),
    decrementQty: (id: number) => dispatch(CartActions.decrementQty(id)),
  };
};
export default connect(mapStoreToProps, mapDispatchToProps)(Cart);
