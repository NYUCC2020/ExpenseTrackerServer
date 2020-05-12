import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Balance } from './Balance';
import { IncomeExpenses } from './IncomeExpenses';
import { TransactionList } from './TransactionList';
import { AddTransaction } from './AddTransaction';

import { GlobalProvider } from '../context/GlobalState';
import { messageConstants } from '../context/_constants';

import '../App.css';
import { Link } from 'react-router-dom';

export const HomePage = () => {
    const dispatch = useDispatch();
    const bugout = useSelector(state => state.message.bugout);
    const user = useSelector(state => state.authentication.user);
    const hasOnMessageHandler = useSelector(state => state.message.hasOnMessageHandler);

    if (bugout && !hasOnMessageHandler) {
        bugout.on("message", function (address, message) {
            const msgJson = JSON.parse(message);
            if (msgJson.receiver === user.username || msgJson.sender === user.username) {
                dispatch({ type: messageConstants.RECEIVE, message: msgJson });
            }
        });
    }

    useEffect(() => {
        if (!bugout) {
            dispatch({ type: messageConstants.CREATE_BUGOUT });
        }
    }, [dispatch, bugout]);

    return (<GlobalProvider>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to="/">Expense Tracker</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    <Link className="nav-item nav-link active" to="/">Transactions</Link>
                    <Link className="nav-item nav-link" to="/transfer">Transfer</Link>
                    <Link className="nav-item nav-link" to="/devices">Devices</Link>
                    <Link className="nav-item nav-link" to="/chat">Chat</Link>
                </div>
            </div>
            <a className="btn btn-primary" href="/login" role="button">Logout</a>
        </nav>
        <div className="container">
            <Balance />
            <IncomeExpenses />
            <TransactionList />
            <AddTransaction />
        </div>
    </GlobalProvider>
    )
}
