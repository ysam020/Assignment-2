import { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import "../styles/form-modal.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function FormModal(props) {
  const [userData, setUserData] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("userdata", JSON.stringify(userData));
  };
  return (
    <>
      {props.selectedData && (
        <div>
          <Modal
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className="form-modal"
          >
            <Box sx={style}>
              <h3>{props.selectedData[0].show.name}</h3>
              <div className="form-container">
                <form action="submit" onSubmit={handleSubmit}>
                  <TextField
                    id="outlined-basic"
                    label="First Name"
                    variant="outlined"
                    type="text"
                    required={true}
                    onChange={(e) =>
                      setUserData({ ...userData, firstName: e.target.value })
                    }
                  />
                  <TextField
                    id="outlined-basic"
                    label="Last Name"
                    variant="outlined"
                    type="text"
                    required={true}
                    onChange={(e) =>
                      setUserData({ ...userData, lastName: e.target.value })
                    }
                  />
                  <TextField
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                    type="email"
                    required={true}
                    onChange={(e) =>
                      setUserData({ ...userData, email: e.target.value })
                    }
                  />
                  <TextField
                    id="outlined-basic"
                    label="Mobile"
                    variant="outlined"
                    type="text"
                    required={true}
                    onChange={(e) =>
                      setUserData({ ...userData, mobile: e.target.value })
                    }
                  />
                  <button type="submit">Submit</button>
                </form>
              </div>
            </Box>
          </Modal>
        </div>
      )}
    </>
  );
}
