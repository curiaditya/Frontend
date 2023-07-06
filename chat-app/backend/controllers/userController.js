const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const generateToken = require('../config/generateToken');
const bcrypt = require('bcryptjs');

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, image } = req.body;

  // Checking all values are defined or not
  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please enter all the mandatory fields');
  }

  //Checking User exists or not
  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(400).json({ errorMessage: 'Email already exists' });
  }

  let DefaultNameInitialsImage = image;

  if (!image) {
    DefaultNameInitialsImage = `https://eu.ui-avatars.com/api/?name=${name.replace(
      / /g,
      '+'
    )}&size=250`;
  }
  // Creating user
  //   const user = await User.create({
  //     name,
  //     email,
  //     password,
  //     image: DefaultNameInitialsImage,
  //   });

  //Another way of creating user
  const user = new User({
    name,
    email,
    password,
    image: DefaultNameInitialsImage,
  });

  await user.save();
  console.log("haello");
  // After creating user, sending response and also JWT token for authorization
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      image: user.image,
      // token: generateToken(user._id),
    });
  }
  // If something goes wrong then we throw error
  else {
    res.status(400);
    throw new Error('Internal Server Error: Failed to create user');
  }
});

const authUser = asyncHandler(async (req, res) => {
  // Destructure email and password from request body
  const { email, password } = req.body;

  // Find user with matching email in database
  const user = await User.findOne({ email });

  // If user not found, return error
  if (!user) return res.status(400).send('User not found');

  // Compare provided password with hashed password in database
  const isMatch = await bcrypt.compare(password, user.password);

  // If passwords don't match, return error
  if (!isMatch) return res.status(400).send('Invalid password');

  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    image: user.image,
    token: generateToken(user._id),
  });
});

const allUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
      $or: [
        { name: { $regex: req.query.search, $options: 'i' } },
        { email: { $regex: req.query.search, $options: 'i' } },
      ],
    }
    : {};

  console.log(keyword);

  const users = await User.find(keyword).select('-password').find({ _id: { $ne: req.user._id } });
  res.send(users);
});

module.exports = { registerUser, authUser, allUsers };
