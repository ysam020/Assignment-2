import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import Badge from "@mui/material/Badge";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Login from "./Login";

const useStyles = makeStyles(() =>
  createStyles({
    cartIcon: {
      color: "#000",
      width: "30px !important",
      height: "30px !important",
    },
  })
);

export default function Navbar() {
  // MUI Styles
  const classes = useStyles();

  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  // Cart Data
  const data = useSelector((state) => state.cartReducer);

  // Login/Register Modal
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  return (
    <React.Fragment>
      <AppBar
        sx={{
          backgroundColor: "#fff !important",
          color: "#000 !important",
          boxShadow: "0 2px 12px 0 rgb(36 50 66 / 8%)",
          "& a:hover": { color: "#000 !important" },
        }}
      >
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="menu-appbar"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
                boxShadow: "0 2px 12px 0 rgb(36 50 66 / 8%) !important",
              }}
            >
              <IconButton aria-label="menu-cart">
                <Link to="/cart">
                  <Badge badgeContent={data.length} showZero color="primary">
                    <LocalMallIcon className={classes.cartIcon} />
                  </Badge>
                </Link>
              </IconButton>
            </Menu>
          </Box>

          <Link to="/">
            <Typography
              variant="h5"
              noWrap
              sx={{
                mr: 2,
                display: { md: "flex", xs: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              <img
                src={require("../assets/images/logo.png")}
                alt="logo"
                width={100}
              />
            </Typography>
          </Link>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "end",
              alignItems: "center",
              paddingRight: "20px",
            }}
          >
            <IconButton aria-label="menu-cart">
              <Link to="/cart">
                <Badge badgeContent={data.length} showZero color="primary">
                  <LocalMallIcon className={classes.cartIcon} />
                </Badge>
              </Link>
            </IconButton>
          </Box>

          <Link to="/">
            <Typography
              variant="h5"
              noWrap
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              <img
                src={require("../assets/images/logo.png")}
                alt="logo"
                width={100}
              />
            </Typography>
          </Link>

          <Box sx={{ flexGrow: 0 }}>
            <IconButton
              onClick={handleOpenModal}
              sx={{ p: 0 }}
              aria-label="menu-user"
            >
              <Avatar alt="" src="" />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Container>
        <Box sx={{ my: 2 }}></Box>
      </Container>

      <Login openModal={openModal} handleCloseModal={handleCloseModal} />
    </React.Fragment>
  );
}
