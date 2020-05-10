import React from 'react';
import { Link } from 'react-router-dom';
import { Header } from './Header';
import { Balance } from './Balance';
import { IncomeExpenses } from './IncomeExpenses';
import { TransactionList } from './TransactionList';
import { AddTransaction } from './AddTransaction';

import { GlobalProvider } from '../context/GlobalState';

import '../App.css';

export const HomePage = () => (
    <GlobalProvider>
        <Header />
            <div className="container">
                <Balance />
                <IncomeExpenses />
                <TransactionList />
                <AddTransaction />
                <Link to="/devices" className="btn btn-link">Devices</Link>
                <Link to="/login" className="btn btn-link">Logout</Link>
            </div>
    </GlobalProvider>
)
