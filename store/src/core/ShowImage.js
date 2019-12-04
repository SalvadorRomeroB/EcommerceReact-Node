import React from "react";
import styles from "./styles.module.css";

const ShowImage = ({ item, url }) => (
  <div className="contain">
    <img
      src={`/api/${url}/photo/${item._id}`}
      alt={item.name}
      className={styles.productImg}
    />
  </div>
);

export default ShowImage;
