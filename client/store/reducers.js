
const initialState = {
    authToken: null,
    type: null,
    email: null,
  }
  
  export default (state = initialState, action) => {
    switch(action.type) {
      case 'LOGIN':
        return {
          ...state, 
          authToken: action.token,
          type: action.type,
          email: action.email,
        }
      case 'LOGOUT':
        return {
          authToken: null,
          type: null,
          email: null,
        }
      default:
        return state;
    }
  }