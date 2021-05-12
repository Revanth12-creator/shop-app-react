import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, RouteComponentProps } from "react-router-dom";
import Column from "../components/Column";
import ImageWithFallback from "../components/ImageWithFallback";
import Row from "../components/Row";

import { CartType, StoreType } from "../types";
import formatter from "../utils/formatter";
import Container from "../components/Container";
type Props = {
    cartItem: CartType[];
} & RouteComponentProps;
class Cart extends Component<Props> {
    render() {
        return (
            <Container>
                <Row>
                    <Column size={12}>
                        <div className="jumbotron text-center">
                            <h1 className="display-5 fw-bold text-primary">CART LIST</h1>
                        </div>
                    </Column>
                </Row>
                <div>
                    {this.props.cartItem.map((val) => (
                        <Column
                            size={2}
                            classes={
                                "d-flex justify-content-between align-items-center mt-1 shadow-lg ms-1 h-75 w-75 mb-6"
                            }
                        >
                            <Link to={`/productdetail/${val.productId}`}>
                                <ImageWithFallback
                                    source={val.productImage}
                                    classList={"w-75 h-75 img-thumbnail rounded float-start"}

                                />
                            </Link>
                            <div className="d-flex  align-items-center flex-column col-md-">
                                <h5 className="my-5 mb-5 display-6 text-center text-secondary fw-bold " >
                                    {formatter.titlecase(val.productName)}
                                </h5>

                                <p className=" text-success  display-7 fw-bold">Sale Price:   <i className="fas fa-rupee-sign text-danger "></i> {val.productSalePrice}</p>
                                <div className="d-flex">
                                    <div >
                                        <p className=" display-5 my-5 pt-0 pb-0 fw-bold p-1 bg-success rounded">+</p>
                                    </div>
                                    <div className="m-5">
                                        <p className="mb-5 display-6 fw-bold"> 2</p>
                                    </div>
                                    <div>
                                        <p className=" display-5 ml-5 my-5 pt-0 pb-0 fw-bold p-1 bg-info  rounded">-</p>
                                    </div>
                                </div>
                                <p className="mb-5 text-danger  display-6 ">Total Prize:   <i className="fas fa-rupee-sign text-success "></i> {val.productPrice}</p>

                            </div>
                            <div className="btn d-flex align-items-start flex-column">
                                <div className="my-5 p-2 pb-0 mb-1 bg-dark text-warning rounded">
                                    <p><i className="fas fa-trash display-6  "></i></p>

                                </div>
                            </div>
                        </Column>
                    ))}

                </div>

            </Container>
        );
    }
}

const mapStoreDataToProps = (state: StoreType) => {
    return {
        cartItem: state.cart,
    };
};

export default connect(mapStoreDataToProps)(Cart);