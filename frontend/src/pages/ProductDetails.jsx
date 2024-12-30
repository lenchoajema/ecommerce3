import React from "react";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams(); // Assuming product ID is passed via route

  return (
    <div>
      <h2>Product Details</h2>
      <p>Details for product with ID: {id}</p>
      {/* Fetch and display product details */}
    </div>
  );
};

export default ProductDetails;
