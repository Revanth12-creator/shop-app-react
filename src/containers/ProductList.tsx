import React from "react";
import Column from "../components/Column";
import Product from "../components/Product";
import Row from "../components/Row";
import ProductService from "../services/ProductService";
import { ProductType, StoreType } from "../types";
import { RouteComponentProps } from "react-router-dom";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import CartActions from "../store/actions/CartActions";
import Paginate from "../components/Paginate";
import { Slider } from "@material-ui/core"
import classes from "../components/Filter.module.css";
type Props = {
  selectedCurrency: string;
  addItem: (product: ProductType) => void;
} & RouteComponentProps;
type State = { plist: ProductType[]; totalPages: number; pageNumber: number, value: any, };
class ProductList extends React.Component<Props, State> {
  state: State = { plist: [], totalPages: 0, pageNumber: 1, value: [0, 100000], };
  componentDidMount() {
    this.getData();
  }
  async getData() {
    try {
      const { data } = await ProductService.getProducts(this.state.pageNumber);
      this.setState({
        plist: data.data,
        totalPages: data.totalPages,
        pageNumber: data.currentPage,
      });
      // console.log("success", data);
    } catch (e) {
      console.log("error", e);
    }
  }

  addToCart(product: ProductType) {
    this.props.addItem(product); // add to cart logic
    this.props.history.push("/products"); // redirect to cart page
  }
  updateData = (page: number) =>
    this.setState({ pageNumber: page }, () => this.getData());


  rangeSelector = (event: any, newValue: any) => {
    this.setState({ value: newValue });
  };
  render() {
    return (
      <>
        <div className={classes.slidermain}>
          <Slider
            max={100000}
            value={this.state.value}
            onChange={this.rangeSelector}
            valueLabelDisplay="auto"
          />
          <h5 className="text-primary">
            {this.state.value[0]}-{this.state.value[1]}
          </h5>
        </div>
        <Row>


          {this.state.plist.map((val) => JSON.parse(val.productSalePrice) > this.state.value[0] &&
            JSON.parse(val.productSalePrice) < this.state.value[1] ? (
            <Column size={3} classes={"my-3"}>
              <Product
                btnClick={() => this.addToCart(val)}
                pdata={val}
                key={val.productId}
                currencyCode={this.props.selectedCurrency}
              />
            </Column>
          ) : null
          )}
          <Column size={12} classes={"text-center"}>
            <Paginate
              itemCountPerPage={10}
              totalPages={this.state.totalPages}
              currentPage={this.state.pageNumber}
              changePage={this.updateData}
            />
          </Column>
        </Row>
      </>
    );
  }
}
// connect(how to connect)(what to connect/component)
// store data can be accessed thru the props of the component
const mapStoreToProps = (store: StoreType) => {
  return {
    selectedCurrency: store.currency, // undefined => INR => USD
  };
};
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    addItem: (p: ProductType) => dispatch(CartActions.addToCart(p)),
  };
};
export default connect(mapStoreToProps, mapDispatchToProps)(ProductList);
