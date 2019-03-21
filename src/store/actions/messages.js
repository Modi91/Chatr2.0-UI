import axios from "axios";
import * as actionTypes from "./actionTypes";
import { setErrors } from "./errors";

export const addMessage = (channelID, m) => {
  return async dispatch => {
    try {
      await axios.post(
        `https://api-chatr.herokuapp.com/channels/${channelID}/send/`,
        { message: m.message }
      );
    } catch (error) {
      setErrors(error);
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
      dispatch({
        type: actionTypes.FETCH_MESSAGES,
        payload: messages
      });
    } catch (error) {
      setErrors(error);
    }
  };
};

export const fetchMessagesTS = (channelID, ts) => {
  console.log("[actions/messages.js] ts:", ts);

  return async dispatch => {
    try {
      const res = await axios.get(
        `https://api-chatr.herokuapp.com/channels/${channelID}/?latest=${ts}`
      );
      const message = res.data;

      dispatch({
        type: actionTypes.FETCH_MESSAGES_TS,
        payload: message
      });
    } catch (error) {
      setErrors(error);
    }
  };
};
