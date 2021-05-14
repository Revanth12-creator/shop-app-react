import React from "react";
import Column from "../components/Column";
import Row from "../components/Row";
import UserService from "../services/UserService";
import { Link, RouteComponentProps, NavLink } from "react-router-dom";

type Props = {};
type State = {
  userList: any,
  addr: any,
  deleteAddr: any
};

class Profile extends React.Component<Props, State> {
  state: State = { userList: [], addr: [], deleteAddr: [] };
  async componentDidMount() {
    try {
      const { data } = await UserService.profile();
      const address = await UserService.address();
      const deleteAddr = await UserService.deleteAddress();
      console.log(data);
      console.log("address list", address);
      this.setState({
        userList: data,
        addr: address,
        deleteAddr: deleteAddr
      })
    } catch (e) {
      // console.log(e.response.data);
    }
  }
  render() {
    console.log(this.state.userList)
    return (
      <div className="container col-md-8">
        <h2 className="text-primary text-center display-5 fw-bold">User Details</h2>
        <hr />
        <div className="row ">
          <div className="col-md-4 p-5 bg-secondary">
            <div className="">
              <img src="./user.jpg " alt="img" className="rounded-circle  mx-auto" />
            </div>
            <h2 className="fw-bold text-center">ID<h4 className="display-9 text-warning"> {this.state.userList.userId}</h4></h2>
            <NavLink to={"/cart"}>
              <button type="button" className="btn btn-info text-center rounded">My Orders</button>
            </NavLink>
          </div>
          <div className="col-md-8 p-5 ">
            <div>
              <h2 className="fw-bold text-info">NAME  : <span className="text-warning"> {this.state.userList.userName}</span></h2>
              <h2 className="fw-bold text-info">EMAIL : <span className="text-warning">{this.state.userList.userEmail} </span> </h2>
              <h2 className="mr-3">Address Details</h2>
              <hr />
              <h2 className="fw-bold text-info">Adderss1 : <span className="text-warning">{this.state.addr.line1} </span> </h2>
              <h2 className="fw-bold text-info">Adderss1 : <span className="text-warning">{this.state.addr.line2} </span> </h2>
              <h2 className="fw-bold text-info">City : <span className="text-warning">{this.state.addr.city} </span> </h2>
              <h2 className="fw-bold text-info">State : <span className="text-warning">{this.state.addr.state} </span> </h2>
              <h2 className="fw-bold text-info">Pincode : <span className="text-warning">{this.state.addr.pincode} </span> </h2>
              {/* <h3 className="fw-bold text-info "><u> Date </u></h3> */}
              <p className='fw-bold'>{this.state.addr.createdAt}</p>
              <div className="btn-group" >
                <NavLink to={"/add"}>
                  <button type="button" className="btn btn-success rounded">Add</button>
                </NavLink>
                <NavLink to={"/edit"}>
                  <button type="button" className="btn btn-warning rounded">Edit</button>
                </NavLink>
                <button type="button" className="btn btn-danger rounded" onClick={this.state.deleteAddr}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
