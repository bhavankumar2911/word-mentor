const reducer = (state, action) => {
  if (action.type == "INITIATE_DATA") return action.payload;

  if (action.type == "ADD_WORD") {
    const { id, word, meaning } = action.payload;
    return [...state, { id, word, meaning }];
  }

  if (action.type == "DELETE_WORD")
    return state.filter((word) => word.id !== action.payload);

  if (action.type == "UPDATE_WORD") {
    const { id, word, meaning } = action.payload;
    return state.map((item) => {
      if (item.id == id) return { id, word, meaning };
      return item;
    });
  }
  return state;
};

export default reducer;
