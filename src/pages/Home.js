import React, { useState, useEffect } from "react";
import "../styles/home.css";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import Lottie from "lottie-react";
import homeBannerLottie from "../assets/lottie-files/home-banner.json";
import { useDispatch, useSelector } from "react-redux";
import { AddtoCart } from "../actions/cartAction";
// import { productCategories } from "../assets/data/ProductCategories";
// import { productSorting } from "../assets/data/ProductSorting";
import CircularProgress from "@mui/material/CircularProgress";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import { Tooltip } from "@material-ui/core";
import Snackbar from "@mui/material/Snackbar";
import Rating from "@mui/material/Rating";

function Home() {
  const [data, setData] = useState([]);
  const [loading, setloading] = useState(true);

  const dispatch = useDispatch();
  const cartData = useSelector((state) => state.cartReducer);

  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const handleOpenSnackbar = () => {
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  async function getProductList() {
    await axios
      .get("https://fakestoreapi.com/products")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => console.error(error))
      .finally(() => setloading(false));
  }

  useEffect(() => {
    getProductList();

    window.scrollTo(0, 0);
    document.title = "Home - Depot";
    // eslint-disable-next-line
  }, []);

  // Pagination
  const [pageNumber, setPageNumber] = useState(0);
  const productsPerPage = 8;
  const pagesVisited = pageNumber * productsPerPage;
  const pageCount = Math.ceil(data.length / productsPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  const displayProducts = data
    .slice(pagesVisited, pagesVisited + productsPerPage)
    .map((products) => {
      const { id, title, price, image, rating } = products;

      return (
        <Col lg={3} sm={6} xs={12} key={id} className="product-col">
          <Link to={`/product/${id}`}>
            <div className="product-img">
              <img src={image} alt="product-img" width="80%" />
            </div>
          </Link>
          <div className="product-details">
            <Tooltip title={title}>
              <h5>{title}</h5>
            </Tooltip>
            <p>{`$ ${price}`}</p>
            <Rating
              name="read-only"
              value={rating.rate}
              readOnly
              className="product-rating"
            />
            {cartData.some((product) => product.id === products.id) ? (
              <Link to="/cart">Go to Cart</Link>
            ) : (
              <button
                onClick={() => {
                  dispatch(
                    AddtoCart({
                      id: products.id,
                      price: products.price,
                      title: products.title,
                      image: products.image,
                      qty: 1,
                    })
                  );
                  handleOpenSnackbar();
                }}
              >
                Add to Cart
              </button>
            )}
          </div>
        </Col>
      );
    });

  // const filterProducts = () => {};

  return (
    <div className="homepage">
      {/* Home Banner */}
      <Container fluid className="home-banner">
        <Container className="hero-content">
          <Row>
            <Col lg={6} className="hero-content-col-left">
              <div className="hero-content-col-left-content">
                <h3>Lorem ipsum</h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Assumenda ex error corrupti velit incidunt neque, officia
                  voluptas. Ea corporis molestiae cum. Libero fugiat, accusamus
                  modi dignissimos quae dolorum voluptatibus reprehenderit.
                </p>
                <a href="/#home-shop" className="home-banner-btn">
                  Shop Now
                </a>
              </div>
            </Col>
            <Col lg={6} className="hero-content-col-right">
              <div className="home-banner-lottie">
                <Lottie loop={true} animationData={homeBannerLottie}></Lottie>
              </div>
            </Col>
          </Row>
        </Container>
      </Container>

      {/* Home Shop Section */}
      <Container className="home-shop" id="home-shop">
        {/* <Row>
          <Col sx={12} className="manage-products">
            <div className="categories">
              category:
              {productCategories.map((item) => {
                return (
                  <span
                    key={item.id}
                    onClick={() => filterProducts(item.category)}
                  >
                    {item.category}
                  </span>
                );
              })}
            </div>
          </Col>
          <Col xs={12} className="manage-products">
            <div className="sorting">
              sort by:
              {productSorting.map((item) => {
                return <span key={item.id}>{item.sortBy}</span>;
              })}
            </div>
          </Col>
        </Row> */}
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
            {displayProducts}

            <ReactPaginate
              previousLabel={"Prev"}
              nextLabel={"Next"}
              pageCount={pageCount}
              onPageChange={changePage}
              containerClassName={`paginationBttns page-count-${pageCount}`}
              previousLinkClassName={"previousBttn"}
              nextLinkClassName={"nextBttn"}
              disabledClassName={"paginationDisabled"}
              activeClassName={"paginationActive"}
            />
          </Row>
        )}
      </Container>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        message="Added to cart"
      />
    </div>
  );
}

export default Home;
