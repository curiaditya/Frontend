const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: {
      type: String,
      default: 'https://eu.ui-avatars.com/api/?name=John+Doe&size=250',
    },
  },
  {
    timestamps: true,
  }
);

// Hash the password if it has been modified
userSchema.pre('save', async function(next) {
  // Get the current user
  const user = this;

  // Only hash the password if it has been modified
  if (!user.isModified('password')) {
    return next();
  }

  // Generate a random salt
  const salt = await bcrypt.genSalt(10);

  // Hash the password using the salt
  const hash = await bcrypt.hash(user.password, salt);

  // Replace the cleartext password with the hashed password
  user.password = hash;

  // Continue the execution of the Mongoose save process
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
