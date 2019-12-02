import React from "react";
import PageLayout from "./Layout";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { listProducts } from "../storeRedux/actions/index";

function Home() {
  const [products, setProducts] = React.useState(null);
  const [categories, setCategories] = React.useState(null);
  const productsList = useSelector(state => state.productsReducer);

  const dispatch = useDispatch();
  const fetchData = async (link, hook) => {
    const result = await axios(link);
    hook(result.data);
  };

  React.useEffect(() => {
    fetchData("/api/products", setProducts);
  }, []);

  const productsInStore = () => {
    dispatch(listProducts(products));
  };

  productsInStore();

  return (
    <PageLayout title="Home Page" description="This is home page">
      <ul>
        {productsList.map(product => (
          <li key={product._id}>{product.name}</li>
        ))}
      </ul>
    </PageLayout>
  );
}

export default Home;
