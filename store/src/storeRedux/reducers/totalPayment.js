const totalPaymentReducer = (state = 0, action) => {
  switch (action.type) {
    case "ADDTOPAYMENT":
      return state + action.data;
    case "REMOVEINPAYMENT":
      return state - action.data;
    default:
      return state;
  }
};

export default totalPaymentReducer;
