import React from "react";
import Home from "./Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "../style.scss";
import Weather from "./Weather";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/weather" exact element={<Weather />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
