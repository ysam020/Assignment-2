export default function cartReducer(state = [], action) {
  switch (action.type) {
    case "ADD_TO_CART":
      return [...state, action.payload];

    case "REMOVE_FROM_CART":
      return state.filter((element) => element.id !== action.payload.id);

    case "UPDATE_CART":
      return [
        ...state.filter((c) => c.id !== action.payload.id),
        action.payload,
      ];

    default:
      return state;
  }
}
