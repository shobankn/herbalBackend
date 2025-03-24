const mongoose = require('mongoose');



const DataBaseConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log(" mongodb connection is conntect")
  } catch (err) {
   
    console.log(err);
  }
};

module.exports = DataBaseConnection;

