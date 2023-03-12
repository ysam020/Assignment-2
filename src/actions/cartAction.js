export const AddtoCart = (data) => {
  return {
    type: "ADD_TO_CART",
    payload: data,
  };
};

export const RemoveFromCart = (data) => {
  return {
    type: "REMOVE_FROM_CART",
    payload: data,
  };
};

export const UpdateCart = (data) => {
  return {
    type: "UPDATE_CART",
    payload: data,
  };
};
