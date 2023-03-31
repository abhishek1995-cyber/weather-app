import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function FormCard() {
  const navigate = useNavigate();
  const [city, setCity] = useState("");
  const [status, setStatus] = useState("");
  const [err, setErr] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const cityName = city.trim();
    const regex = /^[a-zA-Z ]*$/;
    if (!regex.test(cityName)) {
      setErr("Enter a valid input");
      return;
    }
    navigate(`/weather?city=${cityName}`);
  };

  const getLocation = () => {
    if (!navigator.geolocation) {
      setStatus("Geolocation is not supported by your browser");
    } else {
      setStatus("Locating...");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setStatus(null);
          navigate(
            `/weather?lat=${position.coords.latitude}&lng=${position.coords.longitude}`
          );
        },
        () => {
          setStatus("Unable to retrieve your location");
        }
      );
    }
  };

  return (
    <div className="form-card">
      <div className="header-form">
        <h2>Weather App</h2>
      </div>
      <hr></hr>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter city name"
          required
          onInput={(e) => setCity(e.target.value)}
        />
        {err && <p className="err">{err}</p>}
      </form>
      <div className="median-line">
        <div className="line"></div>
        <span>or</span>
        <div className="line"></div>
      </div>
      <div className="btn-form">
        <button onClick={getLocation} className="btn">
          Get Device Location
        </button>
        {status && <div className="err">{status}</div>}
      </div>
    </div>
  );
}

export default FormCard;
