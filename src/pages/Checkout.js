import React, { useEffect, useState } from "react";
import BillingForm from "../forms/BillingForm";
import "../styles/checkout.css";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { months } from "../assets/data/Months";
import { years } from "../assets/data/Years";
import { cardNumberField } from "../assets/utils/CardNumberField";

function Checkout() {
  const navigate = useNavigate();
  const [cardNumber, setCardNumber] = useState([]);
  const [cardHolder, setCardHolder] = useState();
  const [month, setMonth] = useState(
    new Date().toLocaleDateString().split("/")[1]
  );
  const [year, setYear] = useState(
    new Date().toLocaleDateString().split("/")[2]
  );
  const [cvv, setCvv] = useState();
  const [toggleBackCard, setToggleBackCard] = useState(false);
  const [billingFormSubmitted, setBillingFormSubmitted] = useState(false);

  const cartData = useSelector((state) => state.cartReducer);
  const total_price = cartData.reduce((accumeletor, item) => {
    return accumeletor + item.price * item.qty;
  }, 0);

  useEffect(() => {
    if (cartData.length === 0) {
      navigate("/");
    }
    window.scrollTo(0, 0);
    document.title = "Checkout - Depot";

    // eslint-disable-next-line
  }, [cartData.length]);

  useEffect(() => {
    cardNumberField();
  });

  const handleCardFlip = (e) => {
    if (
      e.target.className !== "card-number__part" &&
      e.target.className !== "cardholder-name" &&
      e.target.className !== "front-card-select" &&
      e.target.className !== "back-card-cvv"
    ) {
      setToggleBackCard(!toggleBackCard);
    }
  };

  const handleCardDetails = (e) => {
    e.preventDefault();
    const cardDetails = {
      cardNumber: cardNumber,
      cardHolder: cardHolder,
      month: month,
      year: year,
      cvv: cvv,
    };

    console.log(cardDetails);
  };

  return (
    <div className="checkout-page">
      <Container className="checkout-form">
        <Row>
          <Col xs={12} md={6}>
            <BillingForm setBillingFormSubmitted={setBillingFormSubmitted} />
          </Col>
          <Col>
            <div
              className={`${
                billingFormSubmitted
                  ? "checkout-cardDetails"
                  : "checkout-cardDetails disabled"
              } `}
            >
              <form action="submit" onSubmit={handleCardDetails}>
                <div
                  className={`checkout-card-container ${
                    toggleBackCard ? "isFlipped" : ""
                  }`}
                  onClick={handleCardFlip}
                >
                  <div className="front-card">
                    <div className="header">
                      <div className="logo">
                        <img
                          src={require("../assets/images/logo_white.png")}
                          alt="card-logo"
                          width={100}
                        />
                      </div>
                      <div className="card-type">
                        <svg
                          viewBox="0 0 48 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M44.688 0.814198H41.684C40.751 0.814198 40.057 1.0682 39.647 1.9982L33.874 15.0722H37.957C37.957 15.0722 38.623 13.3142 38.774 12.9292C39.221 12.9292 43.188 12.9352 43.753 12.9352C43.869 13.4332 44.227 15.0722 44.227 15.0722H47.834L44.688 0.814198ZM39.893 10.0102C40.213 9.1912 41.442 6.0232 41.442 6.0232C41.421 6.0622 41.759 5.1982 41.96 4.6612L42.222 5.8912C42.222 5.8912 42.967 9.2972 43.123 10.0102H39.893ZM34.146 10.4042C34.118 13.3672 31.462 15.2792 27.375 15.2792C25.632 15.2612 23.953 14.9182 23.043 14.5192L23.59 11.3262L24.091 11.5542C25.368 12.0862 26.195 12.3012 27.752 12.3012C28.869 12.3012 30.065 11.8632 30.077 10.9082C30.084 10.2832 29.576 9.8382 28.061 9.1382C26.585 8.4552 24.631 7.3112 24.656 5.2622C24.677 2.4892 27.385 0.554199 31.227 0.554199C32.733 0.554199 33.94 0.864198 34.71 1.1532L34.184 4.2452L33.833 4.0802C33.117 3.7922 32.195 3.5142 30.923 3.5342C29.401 3.5342 28.695 4.1682 28.695 4.7612C28.687 5.4292 29.519 5.8692 30.879 6.5312C33.126 7.5462 34.163 8.7832 34.146 10.4042ZM0 0.962198L0.05 0.676199H6.078C6.891 0.707199 7.546 0.966197 7.772 1.8352L9.083 8.1392C7.795 4.8422 4.691 2.0992 0 0.962198ZM17.581 0.812199L11.458 15.0512L7.344 15.0582L3.862 3.1612C6.365 4.7632 8.497 7.3052 9.248 9.0752L9.654 10.5442L13.462 0.815199L17.581 0.812199ZM19.153 0.800198H23.043L20.61 15.0662H16.722L19.153 0.800198Z"
                            fill="#22010A"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="card-content">
                      <div className="card-number">
                        <p>Card Number</p>
                        <fieldset
                          className="card-number-field"
                          onChange={(e) =>
                            e.target.value.length === 4
                              ? setCardNumber([...cardNumber, e.target.value])
                              : ""
                          }
                        >
                          <input
                            type="tel"
                            className="card-number__part"
                            maxLength="4"
                          />
                          <input
                            type="tel"
                            className="card-number__part"
                            maxLength="4"
                          />
                          <input
                            type="tel"
                            className="card-number__part"
                            maxLength="4"
                          />
                          <input
                            type="tel"
                            className="card-number__part"
                            maxLength="4"
                          />
                        </fieldset>
                      </div>
                      <div className="card-details">
                        <div className="card-holder">
                          <p>Card Holder</p>
                          <div className="card-holder-name">
                            <input
                              type="text"
                              onChange={(e) => setCardHolder(e.target.value)}
                              className="cardholder-name"
                            />
                          </div>
                        </div>
                        <div className="validity">
                          <p>Expires</p>

                          <select
                            name="month"
                            onChange={(e) => setMonth(e.target.value)}
                            className="front-card-select"
                          >
                            {months
                              .slice(
                                +new Date().toLocaleDateString().split("/")[1] -
                                  1,
                                12
                              )
                              .map((val) => {
                                return (
                                  <option key={val.id}>{val.option}</option>
                                );
                              })}
                          </select>

                          <select
                            name="year"
                            onChange={(e) => setYear(e.target.value)}
                            className="front-card-select"
                          >
                            {years.map((val) => {
                              return <option key={val.id}>{val.option}</option>;
                            })}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="back-card">
                    <div className="mag-strip"></div>
                    <div className="cvv-container">
                      <p>CVV</p>
                      <div className="cvv">
                        <input
                          type="text"
                          maxLength={3}
                          onChange={(e) => setCvv(e.target.value)}
                          className="back-card-cvv"
                        />
                      </div>
                      <div className="card-type">
                        <svg
                          viewBox="0 0 48 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M44.688 0.814198H41.684C40.751 0.814198 40.057 1.0682 39.647 1.9982L33.874 15.0722H37.957C37.957 15.0722 38.623 13.3142 38.774 12.9292C39.221 12.9292 43.188 12.9352 43.753 12.9352C43.869 13.4332 44.227 15.0722 44.227 15.0722H47.834L44.688 0.814198ZM39.893 10.0102C40.213 9.1912 41.442 6.0232 41.442 6.0232C41.421 6.0622 41.759 5.1982 41.96 4.6612L42.222 5.8912C42.222 5.8912 42.967 9.2972 43.123 10.0102H39.893ZM34.146 10.4042C34.118 13.3672 31.462 15.2792 27.375 15.2792C25.632 15.2612 23.953 14.9182 23.043 14.5192L23.59 11.3262L24.091 11.5542C25.368 12.0862 26.195 12.3012 27.752 12.3012C28.869 12.3012 30.065 11.8632 30.077 10.9082C30.084 10.2832 29.576 9.8382 28.061 9.1382C26.585 8.4552 24.631 7.3112 24.656 5.2622C24.677 2.4892 27.385 0.554199 31.227 0.554199C32.733 0.554199 33.94 0.864198 34.71 1.1532L34.184 4.2452L33.833 4.0802C33.117 3.7922 32.195 3.5142 30.923 3.5342C29.401 3.5342 28.695 4.1682 28.695 4.7612C28.687 5.4292 29.519 5.8692 30.879 6.5312C33.126 7.5462 34.163 8.7832 34.146 10.4042ZM0 0.962198L0.05 0.676199H6.078C6.891 0.707199 7.546 0.966197 7.772 1.8352L9.083 8.1392C7.795 4.8422 4.691 2.0992 0 0.962198ZM17.581 0.812199L11.458 15.0512L7.344 15.0582L3.862 3.1612C6.365 4.7632 8.497 7.3052 9.248 9.0752L9.654 10.5442L13.462 0.815199L17.581 0.812199ZM19.153 0.800198H23.043L20.61 15.0662H16.722L19.153 0.800198Z"
                            fill="#22010A"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="card-message">Click the card to flip</p>
                <button type="submit" className="submit-card-details">
                  Submit
                </button>
              </form>
            </div>
          </Col>
        </Row>
      </Container>

      <Container className="order-details">
        <Row className="order-details-row">
          <Col sm={8}>
            <h6>Product</h6>
          </Col>
          <Col>
            <h6>Subtotal</h6>
          </Col>
        </Row>
        {cartData.map((product, id) => {
          return (
            <Row key={id} className="order-details-row">
              <Col sm={8}>
                <p>{product.title}</p>
              </Col>
              <Col>{product.price}</Col>
            </Row>
          );
        })}
        <Row className="order-details-row">
          <Col sm={8}>
            <p>Total</p>
          </Col>
          <Col>
            <p>{total_price.toFixed(2)}</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Checkout;
