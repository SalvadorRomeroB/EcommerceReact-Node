import React from "react";
import styles from "../core/productCard/productCard.module.css";

const ShowImage = ({ item, url }) => (
  <div>
    <img
      src={`api/${url}/photo/${item._id}`}
      alt={item.name}
      className={styles.productImg}
    />
  </div>
);

export default ShowImage;
