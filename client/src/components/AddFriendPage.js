import React, { useContext, useState, useEffect} from 'react';
import { GlobalProvider, GlobalContext } from '../context/GlobalState';
import { FriendList } from './Chat/FriendList';
import { Link } from 'react-router-dom';
import { userActions } from '../context/_actions';
import { useDispatch, useSelector } from 'react-redux';

export const AddFriendPage = () => {
	
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

    function findFriend(friendusername){
    	for(let i=0; i<user.friends.length; i++){
    		if(user.friends[i].username === friendusername){
    			return false;
    			break;
    		}
    	}
    	return true;

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

            //if friend not in friends yet and friendusername exists in users
            const friendexists = users.items.find(item => item.username === friendUsername); 
            const hasfriend = findFriend(friendUsername);
            if(hasfriend && friendexists){
            	addFriend(user.id, friendUsername);
            }  
            console.log(user.friends);
        }
    }



    return(
    	<GlobalProvider>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to="/">Expense Tracker</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    <Link className="nav-item nav-link" to="/">Transactions</Link>
                    <Link className="nav-item nav-link" to="/transfer">Transfer</Link>
                    <Link className="nav-item nav-link" to="/devices">Devices</Link>
                    <Link className="nav-item nav-link active" to="/chat">Chat</Link>
                    <Link className="nav-item nav-link" to="/addfriend">Add Friend</Link>
                </div>
            </div>
            <a className="btn btn-primary" href="/login" role="button">Logout</a>
        </nav>
       	<div className="container">
            <h3>Add Friend</h3>
            <div className="row">
                <div className="col-2">
                	<h5>Your FriendList</h5>
                    <FriendList />
                </div>
                <div className="col-10">
                	<div className="form-group">

	                	<h3>Add A Friend By Entering Their Username Below </h3>
	                	<label>Friend's Username </label>
	               		<input type="text" name="friendUsername" value={friendUsername} onChange={handleChange} className={'form-control'} />
	               	</div>
	               	<div className="form-group">
                        <button className="btn btn-primary" onClick={onSubmit}>
                            
                        </button>
                    </div>
                </div>

            </div>
        </div>
     </GlobalProvider>
    );

}


 // + (submitted && !amount ? ' is-invalid' : '')