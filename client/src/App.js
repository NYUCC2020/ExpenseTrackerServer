import React, { useEffect } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { history } from './context/_helpers';
import { alertActions } from './context/_actions';
import { ChatPage, DevicePage, HomePage, PrivateRoute, LoginPage, RegisterPage, TransferPage } from './components'
import { messageConstants } from './context/_constants';
import { createMessage, onConnect, broadcastLeave } from './utils/messageUtils'

function App() {
    const alert = useSelector(state => state.alert);
    const loggedIn = useSelector(state => state.authentication.loggedIn);
    const dispatch = useDispatch();
    const bugout = useSelector(state => state.message.bugout);
    const user = useSelector(state => state.authentication.user);
    const hasOnMessageHandler = useSelector(state => state.message.hasOnMessageHandler);

    if (loggedIn && bugout && !hasOnMessageHandler) {
        bugout.on("message", function (address, message) {
            const msgJson = JSON.parse(message);
            if (msgJson.receiver == messageConstants.BROADCAST_RECEIVER || msgJson.receiver === user.username || msgJson.sender === user.username) {
                switch (msgJson.type) {
                    case messageConstants.MESSAGE_TYPE.TEXT:
                        dispatch({ type: messageConstants.RECEIVE, message: msgJson });
                        break;
                    case messageConstants.MESSAGE_TYPE.JOIN:
                        dispatch({ type: messageConstants.PEER_JOIN, message: msgJson });
                        const joinAckMsg = createMessage(messageConstants.MESSAGE_TYPE.JOIN_ACK, user.username);
                        bugout.send(joinAckMsg);
                        break;
                    case messageConstants.MESSAGE_TYPE.JOIN_ACK:
                        dispatch({ type: messageConstants.PEER_JOIN_ACK, message: msgJson });
                        break;
                    case messageConstants.MESSAGE_TYPE.LEAVE:
                        dispatch({ type: messageConstants.PEER_LEAVE, message: msgJson });
                        break;
                    default:
                        console.log(`Unknown message: ${message}`)
                }
            }
        });
        dispatch({ type: messageConstants.SET_BUGOUT_ON_MESSAGE_STATUS });
        onConnect(bugout, () => {
            const joinMsg = createMessage(messageConstants.MESSAGE_TYPE.JOIN, user.username);
            bugout.send(joinMsg);
        })
        window.addEventListener("beforeunload", (ev) => {
            ev.preventDefault();
            broadcastLeave(bugout, user);
        });
    }

    useEffect(() => {
        if (!bugout) {
            dispatch({ type: messageConstants.CREATE_BUGOUT });
        }
    }, [dispatch, bugout]);

    useEffect(() => {
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }, [dispatch]);

    return (
        <div className="container">
            <div className="col-md-10 offset-md-1">
                {alert.message &&
                    <div className={`alert ${alert.type}`}>{alert.message}</div>
                }
                <Router history={history}>
                    <Switch>
                        <PrivateRoute exact path="/" component={HomePage} />
                        <Route path="/login" component={LoginPage} />
                        <Route path="/register" component={RegisterPage} />
                        <Route path="/devices" component={DevicePage} />
                        <Route path="/transfer" component={TransferPage} />
                        <Route path="/chat" component={ChatPage} />
                        <Redirect from="*" to="/" />
                    </Switch>
                </Router>
            </div>
        </div>
    );
}

export default App;
