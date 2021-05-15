
import { type } from "os";
import React, { SyntheticEvent } from "react";
import Column from "../components/Column";
import Container from "../components/Container";
import Row from "../components/Row";
import ErrorBoundary from "../components/ErrorBoundary";
export class Payment extends React.Component {
    register = async (e: SyntheticEvent) => {
        try {
            e.preventDefault();
        } catch (e) {
            console.log(e)
        }
    };
    render() {
        return (
            <ErrorBoundary>
                <Container>
                    <Row>
                        <Column size={12}>
                            <h2 className="  text-dark fw-bold fs-3 p-2 text-center   mb-3">
                                Billing Details
                            </h2>
                            <Row>
                                <Column size={5} classes="bg-light">
                                    <form onSubmit={this.register}
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
                                         <input
                                            type="text"
                                            className="form-control"
                                            required
                                        />{" "}
                                        <br />
                                        <div className="d-flex">
                                            city:
                                           <input
                                                type="text"
                                                className="form-control"
                                                required
                                            />{" "}
                                           state:
                                        <input type="text" className="form-control" required />
                                                 pin:
                                              <input
                                                type="number"
                                                className="form-control"
                                                required
                                            />
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
                                    <div className="card display-6 border border-3 fw-bold shadow-lg">

                                        Total Amount:
                                      </div>
                                </Column>
                            </Row>
                        </Column>
                    </Row>
                </Container>
            </ErrorBoundary>
        );
    }
}
export default Payment;