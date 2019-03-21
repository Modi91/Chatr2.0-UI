import * as actionTypes from "../actions/actionTypes";

const initialState = {
  messages: []
};
const messages = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.POST_MESSAGES:
      return {
        ...state
        // messages: [...state.messages, action.payload]
      };
    case actionTypes.FETCH_MESSAGES:
      return {
        ...state,
        messages: action.payload
      };
    case actionTypes.FETCH_MESSAGES_TS:
      if (action.payload.length === 0) {
        //if(empty array), do not change the state
        return { ...state };
      } else {
        return {
          ...state,
          messages: state.messages.concat(action.payload)
        };
      }

    default:
      return state;
  }
};

export default messages;
