import classes from "*.module.css";
import React, { useState } from "react";

type Props = { source: string, classList: string };

const ImageWithFallback: React.FC<Props> = ({ source, classList }) => {
  let [imgSrc, setDefault] = useState(source);
  return (
    <img
      src={imgSrc}
      onError={() =>
        setDefault(
          "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/600px-No_image_available.svg.png"
        )
      }
      // className="img-thumbnail"
      className="{classList} img-thumbnail"
    />
  );
};
export default ImageWithFallback;




// <Container>
// <div className="row">
//     <Row>
//         <Column size={12}>
//             <div className="jumbotron text-center">
//                 <h1 className="display-5 fw-bold text-primary">CART LIST</h1>
//             </div>
//         </Column>
//     </Row>
//     <div className="col-md-8 ">
//         {this.props.cart.map((val) => (
//             <Column
//                 size={2}
//                 classes={
//                     "d-flex justify-content-between align-items-center mt-1 shadow-lg ms-4  w-75 mb-6"
//                 }
//             >
//                 <Link to={`/productdetail/${val.productId}`}>
//                     <ImageWithFallback
//                         source={val.productImage}
//                         classList={"w-75 h-75 img-thumbnail rounded float-start"}

//                     />
//                 </Link>
//                 <div className="d-flex  align-items-center flex-column ">
//                     <h5 className="my-5 mb-5 display-6 text-secondary text-center fw-bold " >
//                         {formatter.titlecase(val.productName)}
//                     </h5>

//                     <p className=" text-success  display-7 fw-bold">Sale Price:   <i className="fas fa-rupee-sign text-danger "></i> {val.productSalePrice}</p>
//                     <div className="d-flex ">
//                         <div >
//                             <p className=" display-6  my-3 pt-0 pb-0 fw-bold p-1 bg-success rounded">+</p>
//                         </div>
//                         <div className="m-3 ">
//                             <p className=" display-6 fw-bold"> 2</p>
//                         </div>
//                         <div>
//                             <p className=" display-6 my-3 ml-5  pt-0 pb-0 fw-bold p-1 bg-info  rounded">-</p>
//                         </div>
//                     </div>
//                     <p className=" text-danger  display-7 fw-bold">Total Prize:   <i className="fas fa-rupee-sign text-success "></i> {val.productPrice}</p>

//                 </div>
//                 <div className="btn d-flex align-items-center flex-column mt-5">
//                     <div className="my-5 p-2 pb-0 mt-5 bg-warning text-dark rounded">
//                         <p><i className="fas fa-trash display-7  "></i></p>

//                     </div>
//                 </div>
//             </Column>
//         ))}
//     </div>
//     <div className="col-md-4  ">
//         <div>ddddd</div>
//     </div>
// </div>
// </Container>