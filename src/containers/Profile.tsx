import React from "react";
import Column from "../components/Column";
import Row from "../components/Row";
import UserService from "../services/UserService";

type Props = {};
type State = {};

class Profile extends React.Component<Props, State> {

  async componentDidMount() {
    try {
      const { data } = await UserService.profile();
      console.log(data);
    } catch (e) {
      console.log(e.response.data);
    }
  }
  render() {
    return (
      <div className="container col-md-8">
        <h1 className="text-primary text-center display-5 fw-bold">User Details</h1>
        <div className="row ">
          <div className="col-md-5 p-5 bg-secondary">
            <div className="">
              <img src="./user.jpg " alt="img" className="rounded-circle  mx-auto" />
            </div>
          </div>
          <div className="col-md-7 p-5">
            <div>
              <h1>Name</h1>
              <h1>Email</h1>
            </div>
            <div className="">
              <h3>Product Name</h3>
              <h3>Product Quantity</h3>
              <h3>Total Amount</h3>
              <h3>Order Date</h3>
              <h3>Address</h3>
            </div>
          </div>
        </div>
      </div>

    );
  }
}

export default Profile;
