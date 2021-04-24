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
    case "VENDOR_LOCATION":
      return {
        ...state,
        Vendorlocation: action.data,
      };
    case "USER_LOCATION":
      return {
        ...state,
        Userlocation: action.data,
      };
    case "CENTRES_FOUND":
      return {
        ...state,
        availableCentres: action.data,
      };
    case "TOGGLE_LOADING":
      return {
        ...state,
        showLoading: !state.showLoading,
      };
    default:
      return state;
  }
};
export default reducer;
