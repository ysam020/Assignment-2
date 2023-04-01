import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <React.Fragment>
      <AppBar
        sx={{
          backgroundColor: "#fff !important",
          boxShadow: "0 2px 12px 0 rgb(36 50 66 / 8%)",
        }}
      >
        <Toolbar>
          <Link to="/">
            <Typography
              variant="h5"
              sx={{
                display: { xs: "flex" },
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "#000 !important",
                textTransform: "uppercase",
              }}
            >
              Assignment
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </React.Fragment>
  );
}
