import React from 'react';
import { DeviceList } from './Devices/DeviceList';
import { AddDevice } from './Devices/AddDevice';

import { GlobalProvider } from '../context/GlobalState';

import '../App.css';

export const DevicePage = () => (
    <GlobalProvider>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to="/">Expense Tracker</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                <div className="navbar-nav">
                    <Link className="nav-item nav-link" to="/">Transactions</Link>
                    <Link className="nav-item nav-link" to="/transfer">Transfer</Link>
                    <Link className="nav-item nav-link active" to="/devices">Devices</Link>
                    <Link className="nav-item nav-link" to="/chat">Chat</Link>
                </div>
                </div>
            </div>
            <a className="btn btn-primary" href="/login" role="button">Logout</a>
        </nav>
        <div className="container">
            <DeviceList />
            <AddDevice />
        </div>
    </GlobalProvider>
)
