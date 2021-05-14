// import React, { Component } from "react";
// import { connect } from "react-redux";
// import { Link, RouteComponentProps, NavLink } from "react-router-dom";
// import Column from "../components/Column";
// import ImageWithFallback from "../components/ImageWithFallback";
// import Row from "../components/Row";

// import { CartType, StoreType } from "../types";
// import formatter from "../utils/formatter";
// import Container from "../components/Container";
// import { type } from "os";
// import { count } from "console";
// import { collapseTextChangeRangesAcrossMultipleVersions } from "typescript";
// type Props = {
//     cartItem: CartType[];
// } & RouteComponentProps;

// type State = {
//     count: number,
//     deleteCartData: any,
//     change: boolean
// }
// class Cart extends Component<Props, State> {
//     state: State = {
//         count: 0,
//         deleteCartData: this.props.cartItem,
//         change: false,
//     }

//     // mapQuantity = () => {
//     //     this.props.cartItem.map((val) => {
//     //         const pQty = val.productQty;
//     //         this.setState({
//     //             qty: (pQty)
//     //         })
//     //     })
//     // }
//     // incrementQty = () => {
//     //     this.setState({
//     //         count: (this.state.count + 1)
//     //     });
//     // }
//     // decrementQty = () => {
//     //     this.setState({
//     //         count: (this.state.count - 1)
//     //     })
//     // }

//     deleteItem = () => {
//         console.log(this.props.cartItem);
//         const delteData = this.props.cartItem;
//         delteData.pop();
//         this.setState({
//             deleteCartData: (delteData)
//         })
//     }

//     render() {
//         let allData: any = [];
//         const decrementQty = (e: any) => {
//             let dataForFilter = allData.map((data: any, index: number, arr: any) => {
//                 if (JSON.parse(e.target.value) === JSON.parse(data.productId)) {
//                     data.productQty = JSON.parse(data.productQty) - 1;
//                 }
//             });
//             this.setState({ change: true });
//         };

//         const incrementQty = (e: any) => {
//             allData.map((data: any, index: number, arr: any) => {
//                 if (JSON.parse(e.target.value) === JSON.parse(data.productId)) {
//                     data.productQty = JSON.parse(data.productQty) + 1;
//                 }
//             });
//             this.setState({ change: true });
//         };


//         return (
//             <Container>
//                 <Row>
//                     <Column size={8}>
//                         <div className="jumbotron text-center">
//                             <h1 className="display-5 fw-bold text-primary">CART LIST</h1>
//                         </div>
//                     </Column>
//                 </Row>
//                 <Row>
//                     <div className="col-md-8">
//                         {this.props.cartItem.map((data) => (
//                             <Column
//                                 size={4}
//                                 classes={
//                                     "d-flex justify-content-between align-items-center mt-1 shadow-lg ms-1  w-100 "
//                                 }
//                             >
//                                 <Link to={`/productdetail/${data.productId}`}>
//                                     <div className="col-md-8">
//                                         <ImageWithFallback
//                                             source={data.productImage}
//                                             classList={" img-thumbnail rounded float-start"}
//                                         />
//                                     </div>
//                                 </Link>
//                                 <div className="d-flex  align-items-center flex-column col-md-">
//                                     <h5 className="my-5 mb-5 display-6 text-center text-secondary fw-bold " >
//                                         {formatter.titlecase(data.productName)}
//                                     </h5>

//                                     <p className=" text-success  display-7 fw-bold">Sale Price:   <i className="fas fa-rupee-sign text-danger "></i> {data.productSalePrice}</p>
//                                     <div className="d-flex">
//                                         <div >

//                                             <button className="btn btn-primary  fw-bold" value={data.productId} onClick={incrementQty}>+</button>
//                                         </div>
//                                         <div className="m-2">
//                                             <p className="mb-5 display-7 fw-bold">  {data.productQty}</p>
//                                             {/* <p className="mb-5 display-7 fw-bold">intial {data.productQty}</p> */}
//                                         </div>
//                                         <div>

//                                             <button className="btn btn-info fw-bold" value={data.productId} onClick={decrementQty}>-</button>
//                                         </div>
//                                     </div>
//                                     <p className="mb-5 text-danger  display-6 ">Total Prize:   <i className="fas fa-rupee-sign text-success "></i> {data.productPrice}</p>
//                                 </div>

//                                 <div className="mt-5  pb-0 mb-1 bg-dark text-warning rounded ">
//                                     <button className="btn btn-info fw-bold" onClick={this.deleteItem}><i className="fas fa-trash display-7"></i></button>
//                                 </div>

//                                 <div className="btn d-flex align-items-start flex-column"></div>
//                                 {/* <NavLink to={"/payment"}>

//                                 <button className="btn btn-success p-3">Proced To Check Out</button>

//                             </NavLink> */}

//                             </Column>
//                         ))}
//                     </div>
//                 </Row>
//                 <NavLink to={"/payment"}>
//                     <div className='align-items-center'>
//                         <button className="btn btn-success p-3">Proced To Check Out</button>
//                     </div>
//                 </NavLink>
//             </Container>
//         );
//     }
// }

// const mapStoreDataToProps = (state: StoreType) => {
//     return {
//         cartItem: state.cart,
//     };
// };

// export default connect(mapStoreDataToProps)(Cart);

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

type Props = {
    cartItems: any,
    deleteCartData: any,
} & RouteComponentProps;
type State = {};

class Cart extends React.Component<Props, State> {
    state = { change: false, reRender: false, deleteCartData: this.props.cartItems };
    deleteItem = () => {
        console.log(this.props.cartItems);
        const delteData = this.props.cartItems;
        delteData.pop();
        this.setState({
            deleteCartData: (delteData)
        })
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
                return <Redirect to="/checkout" />;
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
                                                    <button className="btn btn-info fw-bold" onClick={this.deleteItem}><i className="fas fa-trash display-7"></i></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : null
                                )}
                            </tbody>
                        </table>
                        <div>
                            <p className={"totalProductPrice"}  >
                                Total Product Price <b>INR {allTotalAmount}</b>
                            </p>
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

export default connect(mapStoreToProps, null)(Cart);