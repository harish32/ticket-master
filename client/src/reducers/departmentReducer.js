const departmentReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_DEPARTMENTS": {
      return action.payload;
    }
    case "UPDATE_DEPARTMENT": {
      return state.map(ele => {
        if (ele._id === action.payload.id) {
          return { ...ele, name: action.payload.name };
        }
        return ele;
      });
    }
    case "REMOVE_DEPARTMENT": {
      return state.filter(ele => ele._id !== action.payload);
    }
    case "ADD_DEPARTMENT": {
      return [...state, action.payload];
    }
    case "ADD_EMPLOYEE": {
      return state.map(ele => {
        if (ele._id === action.payload.id) {
          return {
            ...ele,
            employees: [...ele.employees, action.payload.employee]
          };
        }
        return ele;
      });
    }
    case "UPDATE_EMPLOYEE": {
      return state.map(ele => {
        if (ele._id === action.payload.depid) {
          return {
            ...ele,
            employees: ele.employees.map(el => {
              if (el._id === action.payload.empid) {
                return action.payload.employee;
              }
              return el;
            })
          };
        }
        return ele;
      });
    }
    case "REMOVE_EMPLOYEE": {
      console.log("inside");
      return state.map(ele => {
        if (ele._id === action.payload.depid) {
          return {
            ...ele,
            employees: ele.employees.filter(
              ele => ele._id !== action.payload.empid
            )
          };
        }
        return ele;
      });
    }
    default: {
      return [...state];
    }
  }
};

export default departmentReducer;
