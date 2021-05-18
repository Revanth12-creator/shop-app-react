import React from "react";
import Column from "../components/Column";
import Row from "../components/Row";
import UserService from "../services/UserService";
import { Link, RouteComponentProps, NavLink } from "react-router-dom";
import StorageService from "../services/StorageService";
import axios from "axios";
import constants from "../constants";

type Props = {};
type State = {
  userList: any;
  addr: any;
  deleteAddr: any;
};

class Profile extends React.Component<Props, State> {
  state: State = { userList: [], addr: [], deleteAddr: [] };

  async componentDidMount() {
    try {
      const { data } = await UserService.profile();
      console.log("userData", data);
      this.setState({
        userList: data,
        addr: data.address,
      });
    } catch (e) {
      console.log(e);
    }
  }

  getData = async () => {
    try {
      const { data } = await UserService.profile();
      console.log(data.address);
      this.setState({ addr: data.address });
    } catch (e) {
      console.log(e.response.data);
    }
  };
  render() {
    console.log("user", this.state.userList);
    console.log("address", this.state.userList);

    const deleteAddress = async (e: any) => {
      let deleteAddressId = e.target.value;
      console.log("id", deleteAddressId);
      const url = `${constants.BASE_URL}/address/${deleteAddressId}`;
      return StorageService.getData("token").then((token) =>
        axios
          .delete(url, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then(() => {
            this.getData();
            console.log("data deleted");
          })
          .catch((err) => console.log(err))
      );
    };

    return (
      <div className="container col-md-8">
        <h2 className="text-primary text-center display-5 fw-bold">
          User Details
        </h2>
        <hr />
        <div className="row ">
          <div className="col-md-4 p-5 bg-secondary">
            <div className="">
              <img
                src="./user.jpg "
                alt="img"
                className="rounded-circle  mx-auto"
              />
            </div>

            <NavLink to={"/cart"}>
              <div className="mx-3">
                <button
                  type="button"
                  className="btn btn-info text-center rounded"
                >
                  My Orders
                </button>
              </div>
            </NavLink>

            <NavLink to={"/resume"}>
              <div className="mx-3">
                <button
                  type="button"
                  className="btn btn-dark  text-light rounded"
                >
                  Upload Resume
                </button>
              </div>
            </NavLink>
          </div>
          <div className="col-md-8 p-5 ">
            <div className="card">
              <h3 className="fw-bold text-info text-center">
                NAME :{" "}
                <span className="text-warning">
                  {" "}
                  {this.state.userList.userName}
                </span>
              </h3>
              <h3 className="fw-bold text-info text-center">
                EMAIL :{" "}
                <span className="text-warning">
                  {this.state.userList.userEmail}{" "}
                </span>{" "}
              </h3>
            </div>
            <div className="d-flex ">
              <div>
                <NavLink to={"/add"}>
                  <button type="button" className="btn btn-success rounded">
                    Add Address{" "}
                  </button>
                </NavLink>
              </div>
              <div className="mr-5">
                <h2>Address Details</h2>
              </div>
            </div>

            <hr />
            <div>
              <table className="table table-bordered">
                <thead className="text-light bg-dark">
                  <th>ID</th>
                  <th>Address1</th>
                  <th>Address2</th>
                  <th>City</th>
                  <th>State</th>
                  <th>Piincode </th>
                  <th>Action</th>
                </thead>
                <tbody>
                  {this.state.addr.map((address: any) => (
                    <tr>
                      <th>{address.id}</th>
                      <th>{address.line1}</th>
                      <th>{address.line2}</th>
                      <th>{address.city}</th>
                      <th>{address.state}</th>
                      <th>{address.pincode}</th>
                      <th>
                        <button
                          className="btn btn-danger"
                          value={address.id}
                          onClick={deleteAddress}
                        >
                          <i className="fas fa-trash display-7"></i>
                        </button>
                      </th>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
