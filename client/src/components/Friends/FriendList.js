import React, { useContext, useEffect } from 'react';
import { GlobalContext } from '../../context/GlobalState';
import { useDispatch, useSelector } from 'react-redux';

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
      <h3>Your Friends</h3>
      <ul className="list">
        {friends.map((friend, index) => (<li key={index} >{friend}</li>))}
      </ul>
    </>
  )
}


// selectedFriend && friend.id === selectedFriend.id? 'plus':''