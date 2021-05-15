
import axios from "axios";
import React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import Column from "../components/Column";
import StorageService from "../services/StorageService";
import { CartType } from "../types";
import { BrowserRouter, NavLink, Redirect, useHistory } from "react-router-dom";
import Container from "../components/Container";
import Row from "../components/Row";
import { Dispatch } from "redux";
import CartActions from "../store/actions/CartActions";

type Props = {
    cartItems: any,
    //deleteCartData: any,
    btnClick: () => void;
    deleteCartData: (id: number) => void;
} & RouteComponentProps;
type State = {};

class Cart extends React.Component<Props, State> {
    state = { change: false, reRender: false, deleteCartData: this.props.cartItems };
    // deleteItem = () => {
    //     console.log(this.props.cartItems);
    //     const delteData = this.props.cartItems;
    //     delteData.pop();
    //     this.setState({
    //         deleteCartData: (delteData)
    //     })
    // }
    removeFormCart(id: number) {
        this.props.deleteCartData(id); // add to cart logic
        //this.props.history.push("/cart"); // redirect to cart page
    }

    render() {
        const AllproductId: any = [];
        let allDataList: any = [];
        const datas = this.props.cartItems.cart;
        let finaldata = datas.map((data: any, index: number, arr: any) => {
            if (AllproductId.includes(data.productId) === false) {
                allDataList.push(data);
                AllproductId.push(data.productId);
            }
        });

        const decrementQty = (e: any) => {
            let dataFilter = allDataList.map((data: any, index: number, arr: any) => {
                if (JSON.parse(e.target.value) === JSON.parse(data.productId)) {
                    data.productQty = JSON.parse(data.productQty) - 1;
                }
            });
            this.setState({ change: true });
        };

        const incrementQty = (e: any) => {
            allDataList.map((data: any, index: number, arr: any) => {
                if (JSON.parse(e.target.value) === JSON.parse(data.productId)) {
                    data.productQty = JSON.parse(data.productQty) + 1;
                }
            });
            this.setState({ change: true });
        };

        const submit = (e: any) => {
            e.preventDefault();

            const orderData = allDataList.filter((data: any) => data.productQty >= 1);

            const dataPass = {
                productData: JSON.stringify(orderData),
                totalAmount: allTotalAmount,
            };

            return StorageService.getData("token").then((token) =>
                axios
                    .post("http://localhost:5000/order", dataPass, {
                        headers: { Authorization: `Bearer ${token}` },
                    })
                    .then((res) =>
                        res.status === 201
                            ? this.setState({ reRender: true })
                            : this.setState({ reRender: false })
                    )
            );
        };
        const redirecting = () => {
            if (this.state.reRender === true) {
                return <Redirect to="/payment" />;
            }
        };

        let allTotalAmount: number = 0;
        return (
            <Container>
                <Row>
                    <Column size={8}>
                        <div className="jumbotron text-center">
                        </div>
                    </Column>
                </Row>

                <Column size={12}>
                    <div className="container col-md-8">
                        {redirecting()}
                        <h1 className="display-5 fw-bold text-primary text-center ">CART LIST</h1>

                        <table className="table">
                            <thead>
                                <tr>
                                    <th className="text-warning">NO</th>
                                    <th className="text-warning"> ID</th>
                                    <th className="text-warning"> NAME</th>
                                    <th className="text-warning"> PRIZE</th>
                                    <th className="text-warning"> QUANTITY</th>
                                    <th className="text-warning">TOTAL PRIZE</th>
                                    <th className="text-warning">PRODUCT IMAGE</th>
                                    <th className="text-warning">ACTION</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allDataList.map((data: any, index: number) =>
                                    data.productQty > 0 ? (
                                        <tr key={data.productId}>
                                            <th className="fw-bold display-7" scope="row">{index + 1}</th>
                                            <td className="fw-bold display-7">{data.productId}</td>
                                            <td className="fw-bold display-7">{data.productName}</td>
                                            <td className="fw-bold display-7">INR {data.productSalePrice}</td>
                                            <td>

                                                <button
                                                    className="btn btn-success m-2"
                                                    onClick={incrementQty}
                                                    value={data.productId}
                                                >
                                                    +
                                                  </button>
                                                {data.productQty}
                                                <button
                                                    className="btn btn-warning m-2"
                                                    onClick={decrementQty}
                                                    value={data.productId}
                                                >
                                                    -
                                                </button>


                                            </td>
                                            <td className="fw-bold display-7">
                                                INR {data.productSalePrice * data.productQty}
                                                <p style={{ display: "none" }}>
                                                    {
                                                        (allTotalAmount =
                                                            allTotalAmount +
                                                            data.productSalePrice * data.productQty)
                                                    }
                                                </p>
                                            </td>
                                            <div className="">
                                                <td><img src={data.productImage} className="col-md-3" alt="img" /></td>
                                            </div >
                                            <td>
                                                <div className="mt-5  pb-0 mb-1  rounded ">
                                                    {/* click={() => this.props.deleteCartData(data.productId)} */}
                                                    <button className="btn btn-info fw-bold" ><i className="fas fa-trash display-7"></i></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : null
                                )}
                            </tbody>
                        </table>
                        <div>
                            <h2 className={"totalProductPrice"}   >
                                Total Product Price <b>INR {allTotalAmount}</b>
                            </h2>
                        </div>



                        <NavLink to={"/payment"}>
                            <div className='align-items-center'>
                                <button className="btn btn-success p-3" >Proced To Check Out</button>
                            </div>
                        </NavLink>
                    </div>
                </Column>
            </Container>
        );
    }
}

const mapStoreToProps = (store: CartType) => {
    return {
        cartItems: store,
    };
};
const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        deleteCartData: (id: number) => dispatch(CartActions.removeItem(id)),
    };
};
export default connect(mapStoreToProps, mapDispatchToProps)(Cart);