export const getWeatherDetails = (city, cb) => {
  return (dispatch) => {
    fetch(
      `https://api.weatherapi.com/v1/current.json?key=534894d8e121422a9b4111532233003&q=${city}&days=7`
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
