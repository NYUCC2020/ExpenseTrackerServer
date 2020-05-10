import React from 'react';
import { Link } from 'react-router-dom';
import { Header } from './Header';
import { DeviceList } from './Devices/DeviceList';
import { AddDevice } from './Devices/AddDevice';

import { GlobalProvider } from '../context/GlobalState';

import '../App.css';

export const DevicePage = () => (
    <GlobalProvider>
        <Header />
            <div className="container">
                <DeviceList />
                <AddDevice />
                <Link to="/" className="btn btn-link">Transactions</Link>
            </div>
    </GlobalProvider>
)
