import React from "react";
import { CartType, StoreType } from "../types";
import { RouteComponentProps } from "react-router";

type Props = {
  cartItems: CartType[];
} & RouteComponentProps;
class CartDesign extends React.Component<Props> {
  render() {
    return (
      <div>
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
        </table>
      </div>
    );
  }
}
const mapStoreToProps = (state: StoreType) => {
  return {
    cartItems: state.cart,
  };
};
export default CartDesign;
