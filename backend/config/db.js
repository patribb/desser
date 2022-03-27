const mongoose = require('mongoose');
const env = require('./envConfig');

const connect = async () => {
  try {
      await mongoose.connect(env.MONGODB_URI);
      console.log('MongoDB connected!👾');
  } catch (error) {
      console.log(error.message);
      process.exit;
  }
}

module.exports = connect;