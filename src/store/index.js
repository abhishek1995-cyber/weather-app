import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

const initValues = {
  data: {},
};

function reducer(state = initValues, action) {
  switch (action.type) {
    case "GET_WEATHER":
      return {
        ...state,
        data: { ...action.payload },
      };
    default:
      return state;
  }
}

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
