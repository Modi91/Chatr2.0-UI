import axios from "axios";
import * as actionTypes from "./actionTypes";
import { setErrors } from "./errors";

export const addChannel = newChannel => {
  return async dispatch => {
    try {
      const res = await axios.post(
        "https://api-chatr.herokuapp.com/channels/create/",
        newChannel
      );
      const channel = res.data;
      dispatch(setErrors());
      dispatch({
        type: actionTypes.POST_CHANNEL,
        payload: channel
      });
    } catch (error) {
      dispatch({
        type: actionTypes.SET_ERRORS,
        payload: error.response.data
      });
    }
  };
};

export const fetchChannels = () => {
  return async dispatch => {
    try {
      const res = await axios.get("https://api-chatr.herokuapp.com/channels/");
      const channels = res.data;
      dispatch({
        type: actionTypes.FETCH_CHANNELS,
        payload: channels
      });
    } catch (error) {
      console.error("Something went wrong");
      console.error(error);
    }
  };
};
