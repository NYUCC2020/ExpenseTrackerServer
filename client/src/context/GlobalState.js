import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';
import axios from 'axios';
import { authHeader } from './_helpers';

// Initial state
const initialState = {
  transactions: [],
  devices: [],
  friends: [],
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

  async function getDevices(userId) {
    const requestOptions = {
      method: 'GET',
      headers: authHeader()
    };

    try {
      const res = await axios.get(`/api/v1/users/${userId}/devices`, requestOptions);

      dispatch({
        type: 'GET_DEVICES',
        payload: res.data.data
      });
    } catch (err) {
      dispatch({
        type: 'DEVICE_ERROR',
        payload: err.response.data.error
      });
    }
  }

  async function addDevice(userId, device) {
    const requestOptions = {
      method: 'GET',
      headers: {
        ...authHeader(),
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post(`/api/v1/users/${userId}/devices`, device, requestOptions);

      dispatch({
        type: 'ADD_DEVICE',
        payload: res.data.data
      });
    } catch (err) {
      dispatch({
        type: 'DEVICE_ERROR',
        payload: err.response.data.error
      });
    }
  }

  async function deleteDevice(userId, deviceId) {
    const requestOptions = {
      method: 'GET',
      headers: authHeader()
    };

    try {
      await axios.delete(`/api/v1/users/${userId}/devices/${deviceId}`, requestOptions);

      dispatch({
        type: 'DELETE_DEVICE',
        payload: deviceId
      });
    } catch (err) {
      dispatch({
        type: 'DEVICE_ERROR',
        payload: err.response.data.error
      });
    }
  }

  async function getFriends(userId) {
    const requestOptions = {
      method: 'GET',
      headers: authHeader()
    };

    try {
      const res = await axios.get(`/api/v1/users`, requestOptions);

      dispatch({
        type: 'GET_FRIENDS',
        payload: res.data
      });
    } catch (err) {
      console.log(err);
      dispatch({
        type: 'FRIEND_ERROR',
        payload: err.response.data.error
      });
    }
  }

  async function addFriend(userId, friend) {
    const requestOptions = {
      method: 'GET',
      headers: {
        ...authHeader(),
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post(`/api/v1/users${userId}/friends`, friend, requestOptions);

      dispatch({
        type: 'ADD_FRIEND',
        payload: res.data.data
      });
    } catch (err) {
      console.log(err);
      dispatch({
        type: 'FRIEND_ERROR',
        payload: err.response.data.error
      });
    }
  }

  return (<GlobalContext.Provider value={{
    friends: state.friends,
    devices: state.devices,
    transactions: state.transactions,
    error: state.error,
    loading: state.loading,
    getTransactions,
    deleteTransaction,
    addTransaction,
    getDevices,
    addDevice,
    deleteDevice,
    getFriends,
    addFriend
  }}>
    {children}
  </GlobalContext.Provider>);
}