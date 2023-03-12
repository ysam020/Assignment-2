import React, { useEffect } from "react";
import "../styles/cart.css";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { RemoveFromCart } from "../actions/cartAction";
import { UpdateCart } from "../actions/cartAction";
import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EmptyCart from "../components/EmptyCart";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { Tooltip } from "@material-ui/core";

const useStyles = makeStyles((theme) =>
  createStyles({
    deleteIcon: {
      color: "#F15C6D !important",
    },
  })
);

function Cart() {
  // MUI Styles
  const classes = useStyles();

  const dispatch = useDispatch();

  const cartData = useSelector((state) => state.cartReducer);

  const total_price = cartData.reduce((accumeletor, item) => {
    return accumeletor + item.price * item.qty;
  }, 0);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Cart - Depot";
    // eslint-disable-next-line
  }, []);

  return (
    <Container className="cart">
      {cartData.length === 0 ? (
        <EmptyCart />
      ) : (
        <Row>
          <Col xs={12} lg={7}>
            <Row className="cart-list">
              <Col xs={5 }>
                <h5>items</h5>
              </Col>
              <Col xs={2}>
                <h5>price</h5>
              </Col>
              <Col xs={3}>
                <h5>Quantity</h5>
              </Col>
              <Col xs={2}></Col>
            </Row>
            {cartData.map((product, id) => {
              return (
                <Row key={id} className="cart-list">
                  <Col xs={1}>
                    <img src={product.image} alt="product-img" />
                  </Col>
                  <Col xs={4}>
                    <p>{product.title}</p>
                  </Col>
                  <Col xs={2}>
                    <p>{product.price}</p>
                  </Col>
                  <Col xs={3}>
                    <select
                      name=""
                      id=""
                      onChange={(e) =>
                        dispatch(
                          UpdateCart({
                            id: product.id,
                            price: product.price,
                            title: product.title,
                            image: product.image,
                            qty: e.target.value,
                          })
                        )
                      }
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                  </Col>
                  <Col xs={2}>
                    <Tooltip title="Remove from cart">
                      <IconButton
                        onClick={() =>
                          dispatch(RemoveFromCart({ id: product.id }))
                        }
                        className={classes.deleteIcon}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </Col>
                </Row>
              );
            })}
          </Col>
          <Col>
            <div className="cart-totals">
              <h3>Cart Totals</h3>
              <p>Total:&nbsp; {`$ ${total_price.toFixed("2")}`}</p>
              <hr />
              <Link to="/checkout">
                <div className="checkout">Proceed to Checkout</div>
              </Link>
            </div>
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default Cart;
