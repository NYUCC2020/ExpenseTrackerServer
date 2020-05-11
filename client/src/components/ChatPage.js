import React from 'react';
import { GlobalProvider } from '../context/GlobalState';
import { FriendList } from './Chat/FriendList';
import { ChatWindow } from './Chat/ChatWindow';
import { Link } from 'react-router-dom';

export const ChatPage = () => (
    <GlobalProvider>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to="/">Expense Tracker</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    <Link className="nav-item nav-link" to="/">Transactions</Link>
                    <Link className="nav-item nav-link" to="/transfer">Transfer</Link>
                    <Link className="nav-item nav-link" to="/devices">Devices</Link>
                    <Link className="nav-item nav-link active" to="/chat">Chat</Link>
                </div>
            </div>
            <a className="btn btn-primary" href="/login" role="button">Logout</a>
        </nav>
        <div className="container">
            <h3>Chat</h3>
            <div className="row">
                <div className="col-2">
                    <FriendList />
                </div>
                <div className="col-10">
                    <ChatWindow />
                </div>
            </div>
        </div>
    </GlobalProvider>
);
