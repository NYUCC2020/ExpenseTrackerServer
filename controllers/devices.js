const Device = require('../models/Device');

// @desc    Get all devices
// @route   GET /api/v1/users/:userId/devices
// @access  Public
exports.getDevices = async (req, res, _) => {
  try {
    const userId = req.user.sub;
    const devices = await Device.find({userId});

    return res.status(200).json({
      success: true,
      count: devices.length,
      data: devices
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
}

// @desc    Add device
// @route   POST /api/v1/users/:userId/devices
// @access  Public
exports.addDevice = async (req, res, _) => {
  try {
    const userId = req.user.sub;
    const deviceName = req.body.deviceName;
    const devices = await Device.find({userId, deviceName});

    if (devices.length !== 0) {
      return res.status(400).json({
        success: false,
        error: 'Device name already existed'
      });
    }

    const device = await Device.create({...req.body, userId});
  
    return res.status(201).json({
      success: true,
      data: device
    }); 
  } catch (err) {
    if(err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);

      return res.status(400).json({
        success: false,
        error: messages
      });
    } else {
      return res.status(500).json({
        success: false,
        error: 'Server Error'
      });
    }
  }
}

// @desc    Delete device
// @route   DELETE /api/v1/users/:userId/devices/:deviceId
// @access  Public
exports.deleteDevice = async (req, res, _) => {
  try {
    const device = await Device.findById(req.params.deviceId);

    if(!device) {
      return res.status(404).json({
        success: false,
        error: 'No device found'
      });
    }

    await device.remove();

    return res.status(204).json({
      success: true,
      data: {}
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
}
