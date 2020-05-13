const Friend = require('../users/user.model');

// @desc    Get all friends
// @route   GET /api/v1/users/:userId/friends
// @access  Public
exports.getFriends = async (req, res, _) => {
  try {
    const userId = req.user.sub;
    const friends = await Friend.find({userId});

    return res.status(200).json({
      success: true,
      count: friends.length,
      data: friends
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
}

// @desc    Add Friend
// @route   POST /api/v1/users/:userId/friends
// @access  Public
exports.addFriend = async (req, res, _) => {
  try {
    const userId = req.user.sub;
    const friendname = req.body.friendname;
    const friends = await Friend.find({userId, friendname});

    if (friends.length !== 0) {
      return res.status(400).json({
        success: false,
        error: 'You are already friends'
      });
    }

    const newfriend = await Friend.create({...req.body, userId});
    console.log(newfriend.friendname);
  
    return res.status(201).json({
      success: true,
      data: newfriend
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

// @desc    Delete friend
// @route   DELETE /api/v1/users/:userId/friends/:friendname
// @access  Public
exports.deleteFriend = async (req, res, _) => {
  try {
    const friend = await Friend.findById(req.params.friendname);

    if(!friend) {
      return res.status(404).json({
        success: false,
        error: 'No friend found'
      });
    }

    await friend.remove();

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
