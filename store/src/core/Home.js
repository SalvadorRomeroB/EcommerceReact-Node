import React, { useState, useEffect } from "react";
import PageLayout from "./Layout";
import ProductCard from "../core/productCard/ProductCard";
import { getProducts } from "./apiCore";

const Home = () => {
  const [productsBySell, setProductsBySell] = useState([]);
  const [productsByArrival, setProductsByArrival] = useState([]);
  const [error, setError] = useState(false);

  const loadProductsBySell = () => {
    getProducts("sold").then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductsBySell(data);
      }
    });
  };

  const loadProductsByArrival = () => {
    getProducts("createdAt").then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductsByArrival(data);
      }
    });
  };

  useEffect(() => {
    loadProductsByArrival();
    loadProductsBySell();
  }, []);

  return (
    <PageLayout title="Home Page" description="This is home page">
      {productsByArrival.map((product, i) => (
        <ProductCard key={i} product={product} />
      ))}
    </PageLayout>
  );
};

export default Home;
