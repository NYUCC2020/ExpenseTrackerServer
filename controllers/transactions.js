const Transaction = require('../models/Transaction');
const speech = require('@google-cloud/speech');
const client = new speech.SpeechClient();

// @desc    Get all transactions
// @route   GET /api/v1/users/:userId/transactions
// @access  Public
exports.getTransactions = async (req, res, next) => {
  try {
    const userId = req.user.sub;
    const transactions = await Transaction.find({userId});

    return res.status(200).json({
      success: true,
      count: transactions.length,
      data: transactions
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
}

// @desc    Add transaction
// @route   POST /api/v1/users/:userId/transactions
// @access  Public
exports.addTransaction = async (req, res, next) => {
  try {
    const userId = req.user.sub;
    const transaction = await Transaction.create({...req.body, userId});
  
    return res.status(201).json({
      success: true,
      data: transaction
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

// @desc    Delete transaction
// @route   DELETE /api/v1/users/:userId/transactions/:transactionId
// @access  Public
exports.deleteTransaction = async (req, res, next) => {
  try {
    const transaction = await Transaction.findById(req.params.transactionId);

    if(!transaction) {
      return res.status(404).json({
        success: false,
        error: 'No transaction found'
      });
    }

    await transaction.remove();

    return res.status(200).json({
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


exports.checkSpeechText = async (req, res, next) => {
  console.log(req.body)
  try {
  
    return res.status(201).json({
      success: true,
      data: transcription
    }); 
  } catch (err) {
    console.log(err)
  }
}