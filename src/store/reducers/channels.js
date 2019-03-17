import * as actionTypes from "../actions/actionTypes";

const initialState = {
  channels: []
};
const channels = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.POST_CHANNEL:
      return {
        ...state,
        channels: [...state.channels, action.payload]
      };

    default:
      return state;
  }
};

export default channels;
