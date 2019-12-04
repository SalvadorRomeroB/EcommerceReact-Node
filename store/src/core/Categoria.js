import React from "react";
import { Redirect } from "react-router-dom";
import PageLayout from "./Layout";
import { useSelector } from "react-redux";
import ProductCard from "../core/productCard/ProductCard";

function Catalogo({
  match: {
    params: { name }
  }
}) {
  //   let categoryList = useSelector(state => state.categoryReducer);
  let productsList = useSelector(state => state.productsReducer);

  //   if (correctCategory()) {
  //     return (
  //       <Redirect
  //         to={{
  //           path: "/"
  //         }}
  //       />
  //     );
  //   }

  return (
    <PageLayout title="Home Page" description="This is home page">
      {productsList.map((product, i) => {
        return product.category !== null && product.category.name === name ? (
          <ProductCard key={i} product={product} />
        ) : null;
      })}
    </PageLayout>
  );
}
export default Catalogo;
