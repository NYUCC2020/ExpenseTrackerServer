import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Web3 from 'web3';
import { Link } from 'react-router-dom';
import { userActions } from '../context/_actions';
import { GlobalProvider } from '../context/GlobalState';
import ExpenseTracker from '../abis/ExpenseTracker.json'

import '../App.css';

function TransferPage() {

    const [inputs, setInputs] = useState({
        recipientUsername: '',
        amount: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const { recipientUsername, amount } = inputs;
    const users = useSelector(state => state.users);
    const user = useSelector(state => state.authentication.user);
    var windowWeb3 = {};
    var expenseTracker = {};
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userActions.getAll());
    }, [dispatch]);

    function loadWeb3() {
        if (typeof window.web3 != 'undefined') {
            console.log("Using web3 detected from external source like Metamask");
            windowWeb3 = new Web3(window.web3.currentProvider);
        } else {
            console.log("No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
        }

        console.log(windowWeb3);
    }

    async function loadBlockchainData() {
        const web3 = windowWeb3;
        const networkId = await web3.eth.net.getId();
        const networkData = ExpenseTracker.networks[networkId];
        if (networkData) {
            expenseTracker = new web3.eth.Contract(ExpenseTracker.abi, networkData.address);
        } else {
            window.alert('ExpenseTracker contract not deployed to detected network.')
        }
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setInputs(inputs => ({ ...inputs, [name]: value }));
    }

    async function handleSubmit(e) {
        e.preventDefault();

        setSubmitted(true);
        loadWeb3();
        await loadBlockchainData();
        if (recipientUsername && amount) {
            let recipient = users.items.find(item => item.username === recipientUsername);
            console.log(recipient);
            console.log(recipient.walletAddress);
            console.log(user.walletAddress);
            expenseTracker.methods.sendMoney(recipient.walletAddress)
                .send({ from: user.walletAddress, value: window.web3.toWei(amount.toString(), 'Ether')})
                .once('receipt', (receipt) => {
                    console.log(receipt);
                });
            // dispatch(userActions.login(username, password));
        }
    }

    return (
        <GlobalProvider>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="/">Expense Tracker</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <Link className="nav-item nav-link" to="/">Transactions</Link>
                        <Link className="nav-item nav-link" to="/transfer">Transfer</Link>
                        <Link className="nav-item nav-link active" to="/devices">Devices</Link>
                        <Link className="nav-item nav-link" to="/chat">Chat</Link>
                        <Link className="nav-item nav-link" to="/friends">Friends</Link>
                    </div>
                </div>
                <a className="btn btn-primary" href="/login" role="button">Logout</a>
            </nav>
            <div className="col-lg-8 offset-lg-2">
                <form name="form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Username</label>
                        <input type="text" name="recipientUsername" value={recipientUsername} onChange={handleChange} className={'form-control' + (submitted && !recipientUsername ? ' is-invalid' : '')} />
                        {submitted && !recipientUsername &&
                            <div className="invalid-feedback">Username is required</div>
                        }
                    </div>
                    <div className="form-group">
                        <label>Amount</label>
                        <input type="text" name="amount" value={amount} onChange={handleChange} className={'form-control' + (submitted && !amount ? ' is-invalid' : '')} />
                        {submitted && !amount &&
                            <div className="invalid-feedback">Amount is required</div>
                        }
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary">
                            Transfer
                        </button>
                    </div>
                </form>
            </div>
        </GlobalProvider>
    );
}

export { TransferPage };
