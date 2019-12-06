import React, { useState, useEffect } from "react";
import PageLayout from "./Layout";
import ProductCard from "../core/productCard/ProductCard";
import { getProducts } from "./apiCore";
import { Carousel } from "antd";

function Home() {
  const [productsBySell, setProductsBySell] = useState([]);
  const [productsByArrival, setProductsByArrival] = useState([]);
  const [error, setError] = useState(false);

  var newList = list =>
    list.slice(0, 4).map((product, i) => {
      return (
        <div key={i}>
          <ProductCard product={product} />
        </div>
      );
    });

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
        context.log(error);
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
    <PageLayout title="Nuevos Productos">
      <Carousel autoplay>{newList(productsByArrival)}</Carousel>
      <br />
      <hr />
      <br />
      <h1>Productos mas vendidos:</h1>
      <Carousel autoplay>{newList(productsBySell)}</Carousel>
    </PageLayout>
  );
}

export default Home;
