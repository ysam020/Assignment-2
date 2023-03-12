export default function productReducer(state = [], action) {
  // console.warn("reducer+++",action);
  switch (action.type) {
    case "FETCH_PRODUCT_LIST":
      return action.payload;

    default:
      return state;
  }
}
