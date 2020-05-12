import React from 'react';
import { useSelector } from 'react-redux';
import { MessageInput } from './MessageInput';
import { MessageList } from './MessageList';

export const ChatWindow = () => {
    const selectedFriend = useSelector(state => state.message.selectedFriend);
    const onlineFriends = useSelector(state => state.message.onlineFriends);

    return (
        selectedFriend ? (
            onlineFriends.includes(selectedFriend.username) ? (
                <div className="card">
                    <div className="card-header">
                        {selectedFriend.username}
                    </div>
                    <div className="card-body">
                        <MessageList />
                    </div>
                    <div className="card-footer text-muted">
                        <MessageInput />
                    </div>
                </div>)
                : (<div className="alert alert-primary" role="alert"> {selectedFriend.username} is offline now </div>)
        ) : (<div className="alert alert-primary" role="alert"> Select a friend to start chatting </div>)
    )
}
