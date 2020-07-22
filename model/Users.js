const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = Schema({
  googleId: {
    type: String,
    required: true,
  },
  dispayname: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const UsersModel = mongoose.model('Users', UserSchema);

module.exports = UsersModel;
