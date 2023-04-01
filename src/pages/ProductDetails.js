import React, { useEffect, useState } from "react";
import "../styles/product-details.css";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

function ProductDetails() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  const params = useParams();
  const productId = params.productId;

  async function getProductList() {
    await axios
      .get(`https://fakestoreapi.com/products/${productId}`)
      .then((response) => setData(response.data))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    getProductList();
    document.title = `${data?.title} - Depot`;
    // eslint-disable-next-line
  }, [data]);

  return (
    <>
      <Container className="product-details-page">
        {loading ? (
          <div
            className="loading"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CircularProgress />
          </div>
        ) : (
          <Row>
            <Col xs={12} lg={6} className="product-details-left-col">
              <img src={data?.image} alt="" width="100%" />
            </Col>
            <Col xs={12} lg={6} className="product-details-right-col">
              <h2>{data?.title}</h2>
              <h5>{`$ ${data?.price.toFixed(2)}`}</h5>

              <p className="product-short-description">{data?.description}</p>

              <p className="product-info">
                <span className="product-info-heading">CATEGORY:&nbsp;</span>
                {data?.category.toUpperCase()}
              </p>

              <br />

              <button aria-label="add-to-cart" className="add-to-cart">
                Add to Cart
              </button>
            </Col>
          </Row>
        )}
      </Container>
    </>
  );
}

export default ProductDetails;
