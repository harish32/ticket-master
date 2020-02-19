const ticketsReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_TICKETS": {
      return action.payload;
    }
    case "ADD_TICKET": {
      return [...state, action.payload];
    }
    case "EDIT_TICKET": {
      return state.map(ele => {
        if (ele._id === action.payload.id) {
          return action.payload.ticket;
        }
        return ele;
      });
    }
    case "DELETE_TICKET": {
      return state.filter(ele => ele._id.toString() !== action.payload);
    }
    case "RESOLVE_TICKET": {
      return state.map(ele => {
        if (ele._id === action.payload.id) {
          return { ...ele, isDone: action.payload.status };
        }
        return ele;
      });
    }
    default: {
      return [...state];
    }
  }
};

export default ticketsReducer;
