const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://admin123:admin123@ds249818.mlab.com:49818/houston_api', {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        });
        console.log("mongoDB connected...");
    } catch (err) {
        console.error(err.message);
        //Exit process with failure
        process.exit(1);
    }
};

module.exports = connectDB;