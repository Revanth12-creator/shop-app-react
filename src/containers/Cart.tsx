import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, RouteComponentProps, NavLink } from "react-router-dom";
import Column from "../components/Column";
import ImageWithFallback from "../components/ImageWithFallback";
import Row from "../components/Row";

import { CartType, StoreType } from "../types";
import formatter from "../utils/formatter";
import Container from "../components/Container";
import { type } from "os";
import { count } from "console";
import { collapseTextChangeRangesAcrossMultipleVersions } from "typescript";
type Props = {
    cartItem: CartType[];
} & RouteComponentProps;

type State = {
    count: number,
    deleteCartData: any,
    qty: any
}
class Cart extends Component<Props, State> {
    state: State = {
        count: 0,
        deleteCartData: this.props.cartItem,
        qty: 0
    }

    mapQuantity = () => {
        this.props.cartItem.map((val) => {
            const pQty = val.productQty;
            this.setState({
                qty: (pQty)
            })
        })
    }
    // incrementQty = () => {
    //     this.setState({
    //         qty: (this.state.qty + 1)
    //     });
    // }
    decrementQty = () => {
        this.setState({
            count: (this.state.count - 1)
        })
    }

    deleteItem = () => {
        console.log(this.props.cartItem);
        const delteData = this.props.cartItem;
        delteData.pop();
        this.setState({
            deleteCartData: (delteData)
        })
    }

    render() {
        console.log("initial", this.state.qty)
        return (
            <Container>
                <Row>
                    <Column size={12}>
                        <div className="jumbotron text-center">
                            <h1 className="display-5 fw-bold text-primary">CART LIST</h1>
                        </div>
                    </Column>
                </Row>
                <Row>
                    {this.props.cartItem.map((data) => (
                        <Column
                            size={4}
                            classes={
                                "d-flex justify-content-between align-items-center mt-1 shadow-lg ms-1  w-100 "
                            }
                        >
                            <Link to={`/productdetail/${data.productId}`}>
                                <ImageWithFallback
                                    source={data.productImage}
                                    classList={" img-thumbnail rounded float-start"}
                                />
                            </Link>
                            <div className="d-flex  align-items-center flex-column col-md-">
                                <h5 className="my-5 mb-5 display-6 text-center text-secondary fw-bold " >
                                    {formatter.titlecase(data.productName)}
                                </h5>

                                <p className=" text-success  display-7 fw-bold">Sale Price:   <i className="fas fa-rupee-sign text-danger "></i> {data.productSalePrice}</p>
                                <div className="d-flex">
                                    <div >

                                        <button className="btn btn-primary  fw-bold" onClick={this.mapQuantity}>+</button>
                                    </div>
                                    <div className="m-2">
                                        <p className="mb-5 display-7 fw-bold"> {this.state.qty}</p>
                                        {/* <p className="mb-5 display-7 fw-bold">intial {data.productQty}</p> */}
                                    </div>
                                    <div>

                                        <button className="btn btn-info fw-bold" onClick={this.decrementQty}>-</button>
                                    </div>
                                </div>
                                <p className="mb-5 text-danger  display-6 ">Total Prize:   <i className="fas fa-rupee-sign text-success "></i> {data.productPrice}</p>
                            </div>

                            <div className="mt-5  pb-0 mb-1 bg-dark text-warning rounded ">
                                <button className="btn btn-info fw-bold" onClick={this.deleteItem}><i className="fas fa-trash display-7"></i></button>
                            </div>

                            <div className="btn d-flex align-items-start flex-column"></div>
                            {/* <NavLink to={"/payment"}>

                                <button className="btn btn-success p-3">Proced To Check Out</button>

                            </NavLink> */}

                        </Column>
                    ))}

                </Row>
                <div className='align-items-center'>
                    <button className="btn btn-success p-3">Proced To Check Out</button>
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