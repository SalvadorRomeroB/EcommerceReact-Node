import React, { useState, useEffect } from "react";
import PageLayout from "./Layout";
import ProductCard from "../core/productCard/ProductCard";
import { getProducts } from "./apiCore";
import { Carousel } from "antd";

function Home() {
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
      <h1>Nuevos Productos:</h1>
      <Carousel autoplay>
        {productsByArrival.map((product, i) => (
          <div key={i}>
            <ProductCard product={product} />
          </div>
        ))}
      </Carousel>
      <br />
      <hr />
      <br />
      <h1>Productos mas vendidos:</h1>
      <Carousel autoplay>
        {productsBySell.map((product, i) => (
          <div key={i}>
            <ProductCard product={product} />
          </div>
        ))}
      </Carousel>

      {/* {productsByArrival.map((product, i) => (
        <ProductCard key={i} product={product} />
      ))} */}
      {/* <hr></hr>

      {productsBySell.map((product, i) => (
        <ProductCard key={i} product={product} />
      ))} */}
    </PageLayout>
  );
}

export default Home;
