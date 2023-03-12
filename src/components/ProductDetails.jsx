import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { AddtoCart } from "../actions/cartAction";

export default function ProductDetails() {
  const dispatch = useDispatch();

  var params = useParams();
  var productId = params.productId;

  var [productData, setProductData] = useState({});

  async function getProductData(productId) {
    const response = await axios.get(
      `https://fakestoreapi.com/products/${productId}`
    );
    setProductData(response.data);
  }

  useEffect(() => {
    getProductData(productId);
  }, [productId]);

  return (
    <>
      <h1>Product Details</h1>
      <div className="card col-md-12 mb-5">
        <img
          src={productData.image}
          height="500px"
          className="card-img-top"
          alt="..."
        />
        <div className="card-body">
          <h5 className="card-title">{productData.title}</h5>
          <p className="card-text">{productData.description}</p>
          <h3>&#8377;{productData.price}</h3>
          <button
            className="btn btn-primary"
            onClick={() => {
              dispatch(
                AddtoCart({
                  id: productData.id,
                  price: productData.price,
                  title: productData.title,
                  image: productData.image,
                })
              );
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </>
  );
}
