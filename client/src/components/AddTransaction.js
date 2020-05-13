import React, {useState, useContext} from 'react'
import { GlobalContext } from '../context/GlobalState';
import { useSelector } from 'react-redux';

import Recorder from 'js-audio-recorder';
let recorder = null;


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


  const rec = () => {
    recorder = new Recorder({
      sampleBits: 16,
      sampleRate: 16000,
      numChannels: 1,
      compiling: false,
    });
    recorder.start();
  }
  const rec_stop = () => {
    recorder && recorder.stop();
    const config = {
      encoding: "LINEAR16",
      sampleRateHertz: 16000,
      languageCode: "en_US",
    };
    var reader = new FileReader();
    reader.readAsDataURL(recorder.getWAVBlob());
    reader.onload = function (e) {
      const audio = {
        content: e.target.result.slice(22),
      };
      const request = {
        config: config,
        audio: audio,
      };
      fetch("http://localhost:9000", {
        method: "POST",
        body: JSON.stringify(request) 
    }).then(res => res.text()).then(res => {
      setText(res)
      console.log(res)
    })
    }

  }


  return (
    <>
      <h3>Add new transaction</h3>
      <form onSubmit={onSubmit}> 
        <div className="formControl">
          <label htmlFor="text">Text</label>
          <input type="text" id="text" className="formControl" value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter text..." />
          <button onMouseDown={ rec } onMouseUp={ rec_stop }>Speak</button>
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
