const express = require('express');
const router = express.Router();
const { getDevices, addDevice, deleteDevice } = require('../controllers/devices');

router
  .route('/')
  .get(getDevices)
  .post(addDevice);

router
  .route('/:deviceId')
  .delete(deleteDevice);

module.exports = router;