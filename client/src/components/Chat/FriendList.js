import React, { useContext, useEffect } from 'react';

import { GlobalContext } from '../../context/GlobalState';
import { useDispatch, useSelector } from 'react-redux';
import { messageConstants } from '../../context/_constants';

export const FriendList = () => {
  const { friends, getFriends } = useContext(GlobalContext);
  const selectedFriend = useSelector(state => state.message.selectedFriend);
  const user = useSelector(state => state.authentication.user);
  const onlineFriends = useSelector(state => state.message.onlineFriends);
  const dispatch = useDispatch();

  useEffect(() => {
    getFriends(user.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dispalyFriends = friends.filter(friend => friend.id !== user.id);

  return (
    <>
      <ul className="list">
        {dispalyFriends.map((friend, index) => (
          <li 
            key={index}
            className={[
              selectedFriend && friend.id === selectedFriend.id ? 'selected' : '',
              onlineFriends.includes(friend.username) ? 'plus' : '',
            ].join(" ")}
            onClick={() => dispatch({ type: messageConstants.SELECT_FRIEND, friend: friend })}>
            {friend.username}
          </li>
        ))}
      </ul>
    </>
  )
}