import axios from "axios";
import * as actionTypes from "./actionTypes";
import { setErrors } from "./errors";

export const addMessage = (channelID, m) => {
  return async dispatch => {
    try {
      const res = await axios.post(
        `https://api-chatr.herokuapp.com/channels/${channelID}/send/`,
        m
      );
      const message = res.data;
      dispatch(setErrors({}));
      dispatch({
        type: actionTypes.POST_MESSAGES,
        payload: message
      });
    } catch (error) {
      console.error(error);
      if (error.response) {
        dispatch({
          type: actionTypes.SET_ERRORS,
          payload: error.response.data
        });
      }
    }
  };
};

export const fetchMessages = channelID => {
  return async dispatch => {
    try {
      const res = await axios.get(
        `https://api-chatr.herokuapp.com/channels/${channelID}`
      );
      const messages = res.data;
      console.log(messages);
      dispatch({
        type: actionTypes.FETCH_MESSAGES,
        payload: messages
      });
    } catch (error) {
      console.error("Something went wrong");
      console.error(error);
    }
  };
};
