import React from 'react';
import { Link } from 'react-router-dom';
import { DeviceList } from './Devices/DeviceList';
import { AddDevice } from './Devices/AddDevice';

import { GlobalProvider } from '../context/GlobalState';

import '../App.css';

export const DevicePage = () => (
    <GlobalProvider>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to="/">Expense Tracker</Link>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="navbar-nav">
                <div class="navbar-nav">
                    <Link className="nav-item nav-link" to="/">Transactions</Link>
                    <Link className="nav-item nav-link" to="/transfer">Transfer</Link>
                    <Link className="nav-item nav-link active" to="/devices">Devices</Link>
                    <Link className="nav-item nav-link" to="/chat">Chat</Link>
                </div>
                </div>
            </div>
            <a class="btn btn-primary" href="/login" role="button">Logout</a>
        </nav>
        <div className="container">
            <DeviceList />
            <AddDevice />
        </div>
    </GlobalProvider>
)
