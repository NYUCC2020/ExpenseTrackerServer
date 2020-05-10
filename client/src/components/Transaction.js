import React, {useContext} from 'react';
import { GlobalContext } from '../context/GlobalState';
import { numberWithCommas } from '../utils/format';
import { useSelector } from 'react-redux';

export const Transaction = ({ transaction }) => {
  const { deleteTransaction } = useContext(GlobalContext);
  const user = useSelector(state => state.authentication.user);

  const sign = transaction.amount < 0 ? '-' : '+';

  return (
    <li className={transaction.amount < 0 ? 'minus' : 'plus'}>
      {transaction.text} <span>{sign}${numberWithCommas(Math.abs(transaction.amount))}</span><button onClick={() => deleteTransaction(user.id, transaction._id)} className="delete-btn">x</button>
    </li>
  )
}
