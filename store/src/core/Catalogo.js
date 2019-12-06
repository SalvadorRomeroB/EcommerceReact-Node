import React from "react";
import PageLayout from "./Layout";
import { useSelector } from "react-redux";
import ProductCard from "../core/productCard/ProductCard";

function Catalogo() {
  let productsList = useSelector(state => state.productsReducer);

  return (
    <PageLayout title="Products" description="All the funkos you'll ever want">
      {productsList.map((product, i) => (
        <ProductCard key={i} product={product} />
      ))}
    </PageLayout>
  );
}

export default Catalogo;
