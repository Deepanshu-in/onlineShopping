import React, { useState } from "react";
import { useGetAllProductsQuery } from "../features.js/productsApi";
const Home = () => {
  const { data, error, isLoading } = useGetAllProductsQuery();
  // const [cartData,setCartData]=useState([]);
  // const handleAddToCart=(product)=>{
  //   setCartData((prev)=>[{...prev},product]);
  // }
  return (
    <div className="home-container">
      {isLoading ? (
        <p>Lodaing....</p>
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
                  <button onClick={() => handleAddToCart(product)}>
                    Add To Cart
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
