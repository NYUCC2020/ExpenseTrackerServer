import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';
import axios from 'axios';
import { authHeader } from './_helpers';

// Initial state
const initialState = {
  transactions: [],
  error: null,
  loading: true
}

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Actions
  async function getTransactions(userId) {
    const requestOptions = {
      method: 'GET',
      headers: authHeader()
    };

    try {
      const res = await axios.get(`/api/v1/users/${userId}/transactions`, requestOptions);

      dispatch({
        type: 'GET_TRANSACTIONS',
        payload: res.data.data
      });
    } catch (err) {
      dispatch({
        type: 'TRANSACTION_ERROR',
        payload: err.response.data.error
      });
    }
  }

  async function deleteTransaction(userId, transactionId) {
    const requestOptions = {
      method: 'GET',
      headers: authHeader()
    };

    try {
      await axios.delete(`/api/v1/users/${userId}/transactions/${transactionId}`, requestOptions);

      dispatch({
        type: 'DELETE_TRANSACTION',
        payload: transactionId
      });
    } catch (err) {
      dispatch({
        type: 'TRANSACTION_ERROR',
        payload: err.response.data.error
      });
    }
  }

  async function addTransaction(userId, transaction) {
    const requestOptions = {
      method: 'GET',
      headers: {
        ...authHeader(),
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post(`/api/v1/users/${userId}/transactions`, transaction, requestOptions);

      dispatch({
        type: 'ADD_TRANSACTION',
        payload: res.data.data
      });
    } catch (err) {
      dispatch({
        type: 'TRANSACTION_ERROR',
        payload: err.response.data.error
      });
    }
  }

  return (<GlobalContext.Provider value={{
    transactions: state.transactions,
    error: state.error,
    loading: state.loading,
    getTransactions,
    deleteTransaction,
    addTransaction
  }}>
    {children}
  </GlobalContext.Provider>);
}