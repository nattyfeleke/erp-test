const mongoose = require('mongoose');
require('dotenv').config();

// const { countDownDays } = require('../cronjob/zelela/jobs');

const dbAtlas = process.env.atlasMongoURI;
const dbLocal = process.env.localMongoURI;

const connectDB = async () => {
  try {
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    //   useCreateIndex: true,
    };
    await mongoose.connect(dbLocal, options);

    console.log(`MongoDB connected`);

  } catch (err) {
    console.error(err.message);
    //Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB ;
