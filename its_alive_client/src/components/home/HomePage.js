import React, { useEffect, useState, useRef } from "react";
import ProductList from "../product/ProductList";



const HomePage = props => {
  const [products, setProducts] = useState([]);

  const getTwentyProducts = () => {
    fetch("http://localhost:8000/products?limit=20", {
      method: "GET",
      headers: {
        Accept: "application/json"
      }
    })
      .then(res => res.json())
      .then(setProducts);
  }

  useEffect(() => {
    getTwentyProducts()}, [])

  return (
    <>
      <main className="explorer">
        <h4><ProductList {...props} products={products} /></h4>
      </main>
    </>
  );
};

export default HomePage;
