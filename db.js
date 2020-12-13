const mongoose = require("mongoose");
const url = 'mongodb+srv://admin:admin@cluster0.aqsuv.mongodb.net/shareone?retryWrites=true&w=majority'
const connectDB = async () => {
	try {
		await mongoose.connect(url, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useFindAndModify: false,
			useUnifiedTopology: true
		});
		console.log("mongoDB connected...");
	} catch (err) {
		console.error('*********', err.message);
		//Exit process with failure
		process.exit(1);
	}
};

module.exports = connectDB;