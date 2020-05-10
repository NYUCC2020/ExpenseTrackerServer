import React, {useState, useContext} from 'react'
import { GlobalContext } from '../context/GlobalState';
import { useSelector } from 'react-redux';

export const AddTransaction = () => {
  const [text, setText] = useState('');
  const [amount, setAmount] = useState(0);

  const { addTransaction } = useContext(GlobalContext);
  const user = useSelector(state => state.authentication.user);

  const onSubmit = e => {
    e.preventDefault();

    const newTransaction = {
      text,
      amount: +amount
    }

    addTransaction(user.id, newTransaction);
  }

  return (
    <>
      <h3>Add new transaction</h3>
      <form>
        <div className="formControl">
          <label htmlFor="text">Text</label>
          <input type="text" id="text" className="formControl" value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter text..." />
        </div>
        <div className="formControl">
          <label htmlFor="amount">Amount <br />
            (negative - expense, positive - income)</label>
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Enter amount..." />
        </div>
        <button onClick={onSubmit} type="button" className="btn btn-primary btn-block">Add transaction</button>
      </form>
    </>
  )
}
