import React from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Rating from "@mui/material/Rating";
import "../styles/screen-two.css";
import FormModal from "./FormModal";

function ScreenTwo(props) {
  const { url } = useParams();

  if (props.data.length !== 0) {
    var selectedData = props.data.filter((val) => {
      return val.show.id === +url;
    });
  }

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      {selectedData ? (
        <div style={{ padding: "80px" }}>
          {selectedData[0].show && (
            <Container fluid>
              <Row>
                <Col lg={4}>
                  <img
                    src={selectedData[0].show.image.original}
                    alt=""
                    width="100%"
                  />
                </Col>
                <Col lg={5} className="screen-two-text-col">
                  <h2>{selectedData[0].show.name}</h2>
                  <span>{`Type: ${selectedData[0].show.type} | Language: ${selectedData[0].show.language} | Genres: ${selectedData[0].show.genres}`}</span>
                  <span>{`Premiered: ${selectedData[0].show.premiered}`}</span>
                  <Rating
                    name="read-only"
                    value={selectedData[0].show.rating.average / 2}
                    readOnly
                  />
                  <p>{selectedData[0].show.summary}</p>
                  <button onClick={handleOpen}>Book Now</button>
                </Col>
              </Row>
            </Container>
          )}
        </div>
      ) : (
        ""
      )}
      <FormModal
        open={open}
        handleOpen={handleOpen}
        handleClose={handleClose}
        selectedData={selectedData}
      />
    </>
  );
}

export default ScreenTwo;
