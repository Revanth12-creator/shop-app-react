import React from "react";
import { RouteComponentProps } from "react-router";
import Column from "../components/Column";
import Row from "../components/Row";
import ProductService from "../services/ProductService";
import ErrorBoundary from "../components/ErrorBoundary";
import ImageWithFallback from "../components/ImageWithFallback";

type Props = {};
type State = {
  productList: any;
};

class ProductDetail extends React.Component<RouteComponentProps> {
  state: State = { productList: [] };
  async componentDidMount() {
    try {
      const params: any = this.props.match.params;
      const { data } = await ProductService.getProductById(params.id);
      console.log("success", data);
      this.setState({
        productList: data,
      });
    } catch (e) {
      console.log("error", e);
    }
  }
  render() {
    return (
      <ErrorBoundary>
        <Row>
          <Column size={12}>
            <div className="container ">
              <h2 className=" bg-danger text-light fw-bold fs-1 p-1 text-center  mb-3">
                ORDER DETAILS
              </h2>
              <div className="row ">
                <div className="col-md-4">
                  <div className="">
                    <img
                      src={this.state.productList.productImage}
                      alt="img"
                      className="rounded-circle  mx-auto"
                    />
                  </div>
                  {/* <ImageWithFallback
                    // source={this.state.productList.productImage}
                    source="https://icons-for-free.com/iconfiles/png/512/avatar+human+people+profile+user+icon-1320168139431219590.png"
                    classList={" img-thumbnail rounded float-start"}
                  /> */}
                </div>
                <div className="col-md-8 p-5 ">
                  <div>
                    <h1 className="fw-bold ">
                      ID :{" "}
                      <span className="text-success">
                        {" "}
                        {this.state.productList.productId}
                      </span>
                    </h1>
                    <h1 className="fw-bold ">
                      Name :{" "}
                      <span className="text-success">
                        {this.state.productList.productName}{" "}
                      </span>
                    </h1>
                    <h1 className="fw-bold ">
                      Prize: <i className="fas fa-rupee-sign text-success "></i>
                      <span className="text-success">
                        {this.state.productList.productPrice}
                      </span>{" "}
                    </h1>
                    <h1 className="fw-bold ">
                      Sale-Prize:{" "}
                      <i className="fas fa-rupee-sign text-success "></i>
                      <span className="text-success">
                        {this.state.productList.productSalePrice}
                      </span>{" "}
                    </h1>
                    <h1 className="fw-bold ">
                      Stock:{" "}
                      <span className="text-success">
                        {this.state.productList.productStock}
                      </span>{" "}
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </Column>
        </Row>
      </ErrorBoundary>
    );
  }
}
export default ProductDetail;
