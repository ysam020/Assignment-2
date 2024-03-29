import React, { useState, useEffect } from "react";
import "../styles/home.css";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import Lottie from "lottie-react";
import homeBannerLottie from "../assets/lottie-files/home-banner.json";
import CircularProgress from "@mui/material/CircularProgress";
import ReactPaginate from "react-paginate";
import { Link, useNavigate } from "react-router-dom";
import { Tooltip } from "@material-ui/core";
import Rating from "@mui/material/Rating";
import FilterAltRoundedIcon from "@mui/icons-material/FilterAltRounded";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { IconButton } from "@material-ui/core";
import { productCategories } from "../assets/data/ProductCategories";

const useStyles = makeStyles((theme) =>
  createStyles({
    icon: {
      color: "#8696A0 !important",
      backgroundColor: "transparent !important",
      margin: "0 !important",
    },
  })
);

function Home() {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [loading, setloading] = useState(true);
  const [filterCategory, setFilterCategory] = useState("");
  const navigate = useNavigate();

  async function getProductList() {
    await axios
      .get("https://fakestoreapi.com/products")
      .then((response) => {
        if (filterCategory === "") {
          setData(response.data);
        } else {
          const products = response.data;
          setData(
            products.filter(
              (item) => item.category === filterCategory.toLowerCase()
            )
          );
        }
      })
      .catch((error) => console.error(error))
      .finally(() => setloading(false));
  }

  useEffect(() => {
    getProductList();

    document.title = "Home - Depot";
    // eslint-disable-next-line
  }, [filterCategory]);

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

            <button onClick={() => navigate(`/product/${id}`)}>View</button>
          </div>
        </Col>
      );
    });

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
                <a href="/#home-shop">Shop Now</a>
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
        <Row>
          <Col className="filters">
            <div className="filters-text">
              <span>Filters</span>
              <IconButton className={classes.icon}>
                <FilterAltRoundedIcon />
              </IconButton>
            </div>
            <select
              name="filters"
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option value="">Filter by category</option>
              {productCategories.map((option) => {
                return (
                  <option key={option.id} value={option.category}>
                    {option.category}
                  </option>
                );
              })}
            </select>
          </Col>
        </Row>

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
    </div>
  );
}

export default Home;
