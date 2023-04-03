import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { getWeatherDetails } from "../store/action";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";

function Weather() {
  const dispatch = useDispatch();
  const {
    location = {},
    current = {},
    error: { message = "" } = {},
  } = useSelector((state) => state.data);
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const city = searchParams.get("city");
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  useEffect(() => {
    if (city) {
      setLoading(true);
      dispatch(
        getWeatherDetails(city, (succed) => {
          if (succed) {
            setLoading(false);
          }
        })
      );
    }
  }, [city, dispatch]);

  useEffect(() => {
    if (lng && lat) {
      setLoading(true);
      const location = `${lat},${lng}`;
      dispatch(
        getWeatherDetails(location, (succed) => {
          if (succed) {
            setLoading(false);
          }
        })
      );
    }
  }, [lat, lng, dispatch]);

  return (
    <div className="app-bg">
      <div className="weather-card">
        <div className="header-weather">
          <Link to="/">
            <i className="fa-solid fa-arrow-left"></i>
          </Link>
          <h2>Weather App</h2>
        </div>
        <hr></hr>
        {loading ? (
          <div className="loader">
            <Loader />
          </div>
        ) : message ? (
          <div className="loader">
            <div>{message}</div>
          </div>
        ) : (
          <>
            <div className="display-weather">
              <figure>
                <img
                  src={current?.condition?.icon}
                  alt={current?.condition?.text}
                ></img>
              </figure>
              <h3>
                {current?.temp_c}
                <span>&#176;</span>C
              </h3>
              <p>{current?.condition?.text}</p>
              <div className="location">
                <i className="fa-sharp fa-solid fa-location-dot"></i>
                <p>
                  {location?.name},<span>{location?.country}</span>
                </p>
              </div>
            </div>
            {/* <hr></hr> */}
            <div className="footer-weather">
              <div className="feelslike center">
                <i className="fa-solid fa-temperature-three-quarters"></i>
                <p>
                  <strong>
                    {current?.feelslike_c}
                    <span>&#176;</span>C
                  </strong>
                  <br /> Feels like
                </p>
              </div>
              <div className="humidity center">
                <i className="fa-solid fa-droplet"></i>
                <p>
                  <strong>{current?.humidity}%</strong>
                  <br /> Humidity
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Weather;
