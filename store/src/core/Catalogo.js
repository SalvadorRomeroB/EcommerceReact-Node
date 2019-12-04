import React from "react";
import PageLayout from "./Layout";
import { useSelector } from "react-redux";
import ProductCard from "../core/productCard/ProductCard";

function Catalogo() {
  let productsList = useSelector(state => state.productsReducer);

  return (
    <PageLayout title="Home Page" description="This is home page">
      {productsList.map((product, i) => (
        <ProductCard key={i} product={product} />
      ))}
    </PageLayout>
  );
}

export default Catalogo;
