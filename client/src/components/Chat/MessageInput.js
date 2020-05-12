import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { messageConstants } from '../../context/_constants/message.constants'
import { createMessage } from '../../utils/messageUtils'

export const MessageInput = () => {
    const bugout = useSelector(state => state.message.bugout);
    const user = useSelector(state => state.authentication.user);
    const selectedFriend = useSelector(state => state.message.selectedFriend);
    const [message, setMessage] = useState('');

    const onMessageSend = ev => {
        if (ev.keyCode === 13) {
            if (message !== '' && bugout.lastwirecount) {
                const msg = createMessage(messageConstants.MESSAGE_TYPE.TEXT, user.username, selectedFriend.username, message);
                bugout.send(msg);
                setMessage('');
            }
            ev.preventDefault();
        }
    }

    return (
        <input type="text" id="message" value={message} onChange={(e) => setMessage(e.target.value)} onKeyDown={onMessageSend} placeholder="Enter message..." />
    );
}
