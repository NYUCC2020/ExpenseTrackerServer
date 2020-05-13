const express = require('express');
const router = express.Router();
const { getFriends, addFriend, deleteFriend } = require('../controllers/friends');

router
  .route('/')
  .get(getFriends)
  .post(addFriend);

router
  .route('/:friendname')
  .delete(deleteFriend);

module.exports = router;