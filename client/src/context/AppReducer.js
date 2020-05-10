export default (state, action) => {
  switch (action.type) {
    case 'GET_TRANSACTIONS':
      return {
        ...state,
        loading: false,
        transactions: action.payload
      }
    case 'DELETE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.filter(transaction => transaction._id !== action.payload)
      }
    case 'ADD_TRANSACTION':
      return {
        ...state,
        transactions: [...state.transactions, action.payload]
      }
    case 'TRANSACTION_ERROR':
      return {
        ...state,
        error: action.payload
      }
    case 'GET_DEVICES':
      return {
        ...state,
        loading: false,
        devices: action.payload
      }
    case 'ADD_DEVICE':
      return {
        ...state,
        devices: [...state.devices, action.payload]
      }
    case 'DELETE_DEVICE':
      return {
        ...state,
        devices: state.devices.filter(device => device._id !== action.payload)
      }
    case 'DEVICE_ERROR':
      return {
        ...state,
        error: action.payload
      }
    default:
      return state;
  }
}