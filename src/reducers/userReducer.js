import { SET_USER } from "../actions/actionsType";

const INITIAL_STATE = {
  user: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_USER: //case of setting the new user 
      return {
        ...state, // return the state and the new user as the setting the user 
        user: action.user,
      };
    default:
      return state;
  }
};

export default userReducer;