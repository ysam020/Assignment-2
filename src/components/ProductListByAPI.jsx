import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../actions/productAction";

export default function ProductListByAPI() {
  const dispatch = useDispatch();
  const dataTest = useSelector((state) => state.productReducer);

  //   eslint-disable-next-line
  var [data, setData] = useState([]);

  useEffect(() => {
    dispatch(fetchProducts);
    //   eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="row">
        {data.map((product, index) => {
          return (
            <div className="card col-md-4 mb-5" key={index}>
              <img
                src={product.image}
                height="300px"
                className="card-img-top"
                alt="..."
              />
              <div className="card-body">
                <h5 className="card-title">{product.title.slice(0, 60)}</h5>
                <p className="card-text">{product.description.slice(0, 100)}</p>
                <h3>&#8377;{product.price}</h3>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
