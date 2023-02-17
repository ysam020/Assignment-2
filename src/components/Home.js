import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../styles/home.css";

function Home(props) {
  return (
    <div className="home">
      <h2>Movies</h2>
      <Container className="list-container">
        <Row>
          {props.data.map((data, id) => {
            return (
              <Col xl={6} sm={12} key={id}>
                <div className="list-item-container">
                  <Link to={`/${data.show.id}`}>
                    <Row className="list-item">
                      <Col sm={12} md={2}>
                        {data.show.image && (
                          <img
                            src={data.show.image.original}
                            alt={data.show.name}
                            height="100px"
                          />
                        )}
                      </Col>
                      <Col sm={12} md={10}>
                        <h3>{data.show.name}</h3>
                        <span>{`Type: ${data.show.type} | Language: ${data.show.language} | Genres: ${data.show.genres}`}</span>
                        <button to={`/${data.show.id}`}>Show More</button>
                      </Col>
                    </Row>
                  </Link>
                </div>
              </Col>
            );
          })}
        </Row>
      </Container>
    </div>
  );
}

export default Home;
