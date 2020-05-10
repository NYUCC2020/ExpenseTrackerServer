import React, {useState, useContext} from 'react'
import { GlobalContext } from '../../context/GlobalState';
import { useSelector } from 'react-redux';

export const AddDevice = () => {
  const [name, setName] = useState('');
  const [power, setPower] = useState(0);

  const { addDevice } = useContext(GlobalContext);
  const user = useSelector(state => state.authentication.user);

  const onSubmit = e => {
    e.preventDefault();

    const newDevice = {
      deviceName: name,
      power,
    }

    addDevice(user.id, newDevice);
  }

  return (
    <>
      <h3>Add new device</h3>
      <form>
        <div className="formControl">
          <label htmlFor="name">Device Name</label>
          <input type="text" id="name" className="formControl" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter name..." />
        </div>
        <div className="formControl">
          <label htmlFor="power">Device Power in Watt</label>
          <input type="number" value={power} onChange={(e) => setPower(e.target.value)} placeholder="Enter power..." />
        </div>
        <button onClick={onSubmit} type="button" className="btn btn-primary btn-block">Add device</button>
      </form>
    </>
  )
}
