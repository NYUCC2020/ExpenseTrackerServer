import React, { useContext, useEffect } from 'react';
import { Device } from './Device';

import { GlobalContext } from '../../context/GlobalState';
import { useSelector } from 'react-redux';

export const DeviceList = () => {
  const { devices, getDevices } = useContext(GlobalContext);
  const user = useSelector(state => state.authentication.user);

  useEffect(() => {
    getDevices(user.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <h3>Devices</h3>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Power(Watt)</th>
            <th scope="col">Usage(Hour)</th>
            <th scope="col">Estimated Cost</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {devices.map((device, index) => (<Device key={device._id} device={device} index={index} />))}
        </tbody>
      </table>
    </>
  )
}
