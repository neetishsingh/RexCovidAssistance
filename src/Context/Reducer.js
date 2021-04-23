const reducer = (state, action) => {
    switch (action.type) {
      case "ADD_USER":
        return {
          ...state,
          user: action.data,
        };
      case "REMOVE_USER":
        return {
          ...state,
          user: undefined,
        };
      case "ACTIVATE_TOKEN":
        return{
          ...state,
          user:{access: action.data},
        }
      default:
        return state;
    }
  };
  export default reducer;
  