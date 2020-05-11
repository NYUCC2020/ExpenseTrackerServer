import React from 'react';
import { useSelector } from 'react-redux';

import '../../App.css';

export const MessageList = () => {
    const messages = useSelector(state => state.message.messages);
    const selectedFriend = useSelector(state => state.message.selectedFriend);
    const user = useSelector(state => state.authentication.user);

    return (
        <div className="messageList">
            {messages.filter(msg => msg.sender === selectedFriend.username || msg.receiver === selectedFriend.username).map((msg, index) => <Message key={index} isMine={msg.sender === user.username} content={msg.content}/>)}
        </div>
    )
}

const Message = ({isMine, content}) => (
    <div className={[
        'message',
        `${isMine ? 'mine' : ''}`,
      ].join(' ')}>
        <div className="bubble-container">
          <div className="bubble">
            { content }
          </div>
        </div>
      </div>
)
