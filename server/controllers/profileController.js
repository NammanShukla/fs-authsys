const User = require('../models/user');

const uploadAvatar = async (req, res) => {
  const user = await User.findById(req.user._id);
  user.avatar = req.file.filename;
  await user.save();
  res.json({ message: 'Profile picture updated', avatar: req.file.filename });
};

module.exports = {
  uploadAvatar,
};
