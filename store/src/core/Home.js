import React from "react";
import PageLayout from "./Layout";
import { useSelector } from "react-redux";

function Home() {
  const productsList = useSelector(state => state.productsReducer);
  const categoryList = useSelector(state => state.categoryReducer);

  return (
    <PageLayout title="Home Page" description="This is home page">
      <ul>
        {productsList.map(product => (
          <li key={product._id}>{product.name}</li>
        ))}
      </ul>

      <ul>
        {categoryList.map(category => (
          <li key={category._id}>{category.name}</li>
        ))}
      </ul>
    </PageLayout>
  );
}

export default Home;
