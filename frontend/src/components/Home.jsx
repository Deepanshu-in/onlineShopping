import React, { useState } from "react";
// import { useHistory } from "react-router-dom";
import { useGetAllProductsQuery } from "../features.js/productsApi";
import {useDispatch } from 'react-redux'
import { handleAddToCart} from "../features.js/cartSlice";
const Home = () => {
  const { data, error, isLoading } = useGetAllProductsQuery();
  // const history=useHistory();
  const dispatch=useDispatch()
  return (
    <div className="home-container">
      {isLoading ? (
        <p>Loading....</p>
      ) : error ? (
        <p>An error occured....</p>
      ) : (
        <>
          <div className="products">
            {data &&
              data?.map((product) => (
                <div key={product.id} className="product">
                  <h3>{product.name}</h3>
                  <img src={product.image} alt={product.name} />
                  <div className="details">
                    <span>{product.desc}</span>
                    <span className="price">₹ {product.price}</span>
                  </div>
                  <button onClick={() => {dispatch(handleAddToCart(product));}}>
                    Add to Cart
                  </button>
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
