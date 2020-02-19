const customersReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_CUSTOMERS": {
      return action.payload;
    }
    case "ADD_CUSTOMER": {
      return [...state, action.payload];
    }
    case "REMOVE_CUSTOMER": {
      return state.filter(ele => ele._id !== action.payload);
    }
    case "UPDATE_CUSTOMER": {
      return state.map(ele => {
        if (ele._id === action.payload.id) {
          return action.payload.customer;
        }
        return ele;
      });
    }
    default: {
      return [...state];
    }
  }
};

export default customersReducer;
