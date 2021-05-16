import React from "react";
import { Link } from "react-router-dom";
import { ProductType } from "../types";
import formatter from "../utils/formatter";
import ImageWithFallback from "./ImageWithFallback";
import ProductPrice from "./ProductPrice";

type ProductProps = {
  pdata: ProductType;
  wishlist?: boolean;
  currencyCode: string;
  btnClick: () => void;
};
class Product extends React.Component<ProductProps> {
  renderStock(stock: number) {
    if (stock <= 0) {
      return (
        <button disabled className="btn btn-sm w-100 btn-danger text-uppercase">
          <i className="far fa-frown"></i>Out of stock
        </button>
      );
    }
    return (
      <button
        onClick={() => this.props.btnClick()}
        className="btn btn-sm w-100 btn-primary text-uppercase"
      >
        <i className="fab fa-opencart"></i> Add to Cart
      </button>
    );
  }
  render() {
    const { pdata, wishlist, currencyCode } = this.props;
    let salePrice: any = pdata.productPrice;
    let totalSaleprice: any = pdata.productSalePrice;
    return (
      <div className="p-4 shadow-sm text-center">
        <Link to={`/productdetail/${pdata.productId}`}>
          <ImageWithFallback classList={""} source={pdata.productImage} />
        </Link>
        <h5 className={"mt-4"}>{formatter.titlecase(pdata.productName)}</h5>
        <ProductPrice
          {...(currencyCode === "EUR"
            ? ((salePrice = JSON.parse(pdata.productPrice) / 90),
              (totalSaleprice = JSON.parse(pdata.productSalePrice) / 90))
            : currencyCode === "USD"
            ? ((salePrice = JSON.parse(pdata.productPrice) / 73),
              (totalSaleprice = JSON.parse(pdata.productSalePrice) / 73))
            : currencyCode === "CAD"
            ? ((salePrice = JSON.parse(pdata.productPrice) / 60),
              (totalSaleprice = JSON.parse(pdata.productSalePrice) / 60))
            : currencyCode === "GBP"
            ? ((salePrice = JSON.parse(pdata.productPrice) / 103),
              (totalSaleprice = JSON.parse(pdata.productSalePrice) / 103))
            : null)}
          price={salePrice}
          salePrice={totalSaleprice}
          code={currencyCode}
        />
        {/* <button>Add to {wishlist ? "Wishlist" : "Cart"}</button> */}
        {this.renderStock(pdata.productStock)}
      </div>
    );
  }
}
export default Product;
