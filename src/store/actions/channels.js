import axios from "axios";
import * as actionTypes from "./actionTypes";
import { setErrors } from "./errors";

export const addChannel = newChannel => {
  return async dispatch => {
    try {
      const res = await axios.post(
        "https://api-chatr.herokuapp.com/channels/",
        newChannel
      );
      const channel = res.data;
      dispatch(setErrors());
      dispatch({
        type: actionTypes.POST_CHANNEL,
        payload: channel
      });
    } catch (err) {
      dispatch({
        type: actionTypes.SET_ERRORS,
        payload: err.response.data
      });
    }
  };
};
