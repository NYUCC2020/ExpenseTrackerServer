import React, {useState, useContext, useEffect} from 'react'
import { GlobalContext } from '../../context/GlobalState';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../context/_actions';

export const AddFriend = () => {
    const [inputs, setInputs] = useState({
        friendUsername: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const { friendUsername} = inputs;
    const users = useSelector(state => state.users);
    const user = useSelector(state => state.authentication.user);
    const { friends, getFriends, addFriend } = useContext(GlobalContext);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userActions.getAll());
    }, [dispatch]);


  function handleChange(e) {
        const { name, value } = e.target;
        setInputs(inputs => ({ ...inputs, [name]: value }));
    }

    const onSubmit = e => {
        e.preventDefault();

        setSubmitted(true);
        if (friendUsername) {
            // if(users.friends.find("username": friendUsername) != null){
            console.log(user.username);
            console.log(friendUsername);
            console.log(user.friends);
            console.log(users.items);

            const newfriend={
              friendname: friendUsername
            }

            //if friend not in friends yet and friendusername exists in users
            // const friendexists = users.
            // console.log(friendexists);
            // const hasfriend = findFriend(friendUsername);
            // if(!hasfriend && friendexists){
            addFriend(user.id, newfriend);
            // }  
            console.log(user.friends);
        }
    }

  return (
    <>
      <div className="col-10">
        <div className="form-group">

          <h3>Add A Friend By Entering Their Username Below </h3>
          <label>Friend's Username </label>
          <input type="text" name="friendUsername" value={friendUsername} onChange={handleChange} className={'form-control'} />
        </div>
        <div className="form-group">
          <button className="btn btn-primary" onClick={onSubmit}>
              Add
          </button>
        </div>
      </div>
    </>
  )
}
