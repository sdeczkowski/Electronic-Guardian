
const initialState = {
    authToken: null,
    type: null,
    email: null,
    _id: null,
  }
  
  export default (state = initialState, action) => {
    switch(action.type) {
      case 'LOGIN':
        return {
          ...state, 
          authToken: action.token,
          type: action.type,
          email: action.email,
          _id: action._id,
        }
      case 'LOGOUT':
        return {
          authToken: null,
          type: null,
          email: null,
          _id: null,
        }
      default:
        return state;
    }
  }