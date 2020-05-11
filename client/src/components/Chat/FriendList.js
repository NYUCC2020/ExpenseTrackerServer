import React, { useContext, useEffect } from 'react';

import { GlobalContext } from '../../context/GlobalState';
import { useDispatch, useSelector } from 'react-redux';
import { messageConstants } from '../../context/_constants';

export const FriendList = () => {
  const { friends, getFriends } = useContext(GlobalContext);
  const selectedFriend = useSelector(state => state.message.selectedFriend);
  const user = useSelector(state => state.authentication.user);
  const dispatch = useDispatch();

  useEffect(() => {
    getFriends(user.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <ul className="list">
        {friends.filter(friend => friend.id !== user.id).map((friend, index) => (<li key={index} className={selectedFriend && friend.id === selectedFriend.id? 'plus':''} onClick={() => dispatch({ type: messageConstants.SELECT_FRIEND, friend: friend })}>{friend.username}</li>))}
      </ul>
    </>
  )
}
