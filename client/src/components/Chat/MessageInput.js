import React, { useState } from 'react';
import { useSelector } from 'react-redux';

export const MessageInput = () => {
    const bugout = useSelector(state => state.message.bugout);
    const user = useSelector(state => state.authentication.user);
    const selectedFriend = useSelector(state => state.message.selectedFriend);
    const [message, setMessage] = useState('');

    const onMessageSend = ev => {
        if (ev.keyCode === 13) {
            if (message !== '' && bugout.lastwirecount) {
                bugout.send(JSON.stringify({ content: message, sender:  user.username, receiver: selectedFriend.username}));
                setMessage('');
            }
            ev.preventDefault();
        }
    }

    return (
        <input type="text" id="message" value={message} onChange={(e) => setMessage(e.target.value)} onKeyDown={onMessageSend} placeholder="Enter message..." />
    );
}
