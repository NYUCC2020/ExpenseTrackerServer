const express = require('express');
const router = express.Router();
const { getTransactions, addTransaction, deleteTransaction, checkSpeechText} = require('../controllers/transactions');

router
  .route('/getText')
  .post(checkSpeechText)

router
  .route('/')
  .get(getTransactions)
  .post(addTransaction);

router
  .route('/:transactionId')
  .delete(deleteTransaction);

module.exports = router;