import "./App.css";
import { useState, useEffect } from "react";
import Home from "./components/Home";
import { Routes, Route } from "react-router-dom";
import ScreenTwo from "./components/ScreenTwo";
import NavbarComponent from "./components/Navbar";

function App() {
  const [data, setData] = useState([]);

  const API = "https://api.tvmaze.com/search/shows?q=all";

  const fetchApiData = async (url) => {
    try {
      const res = await fetch(url);
      const apiData = await res.json();
      setData(apiData);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchApiData(API);
  }, []);
  return (
    <div className="App">
      <NavbarComponent />
      <Routes>
        <Route exact path="/" element={<Home data={data} />} />
        <Route exact path="/:url" element={<ScreenTwo data={data} />}></Route>
      </Routes>
    </div>
  );
}

export default App;
