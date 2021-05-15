import React from "react";
import { Route, Switch } from "react-router-dom";
import Add from "./components/Add";
import Container from "./components/Container";
import ErrorPage from "./components/ErrorPage";
import PrivateRoute from './components/PrivateRoute';
import Cart from "./containers/Cart";
import Checkout from "./containers/Checkout";
import Login from "./containers/Login";
import { Payment } from "./containers/Payment";
import ProductDetail from "./containers/ProductDetail";
import ProductList from "./containers/ProductList";
import Register from "./containers/Register";
import Demo from "./Demo";
//import Profile from './containers/Profile';

const LazyProfile = React.lazy(() => import("./containers/Profile"));
const AppRouter: React.FC = (props) => {
  return (
    <main>
      <Container fluid>
        <React.Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route path={"/"} component={Demo} exact />
            <Route path={"/products"} component={ProductList} />
            <Route path={"/login"} component={Login} />
            <PrivateRoute path={"/profile"} component={LazyProfile} />
            <Route path={"/productdetail/:id"} component={ProductDetail} />
            <Route path={"/cart"} component={Cart} />
            <Route path={"/register"} component={Register} />
            <Route path={"/payment"} component={Payment} />
            <Route path={"/add"} component={Add} />
            <Route path={"/checkout"} component={Checkout} />
            {/* 404 Route */}
            <Route component={ErrorPage} />
          </Switch>
        </React.Suspense>
      </Container>
    </main>
  );
};
export default AppRouter;
