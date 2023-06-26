export const getWeatherDetails = (city, cb) => {
  return (dispatch) => {
    fetch(
      `https://api.weatherapi.com/v1/current.json?key=1ea76d0da3ca4c80928175217232506&q=${city}&days=7`
    )
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: "GET_WEATHER",
          payload: data,
        });
        cb(true);
      });
  };
};
