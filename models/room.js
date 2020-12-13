
// module.exports = (sequelize, Sequelize) => {
// 	const Room = sequelize.define('Room', {
// 		name: {
// 			type: Sequelize.STRING,
// 			allowNull: false 
// 		},
// 		room_Code: {
// 				type: Sequelize.STRING,
// 				allowNull: false 
// 		},
// 		people_Count:{
// 			type: Sequelize.INTEGER,
// 			value: 1
// 		}

// 	},
// 		{
// 			freezeTableName: true
// 	});
// 	Room.associate = function(models) {
// 	models.Room.belongsTo(models.User);
// };

// return Room;
// }


const mongoose = require('mongoose');
const Schema = mongoose.Schema
const Room = new Schema({
	name: String,
	room_Code: String,
	people_Count: String,
	role: String,
})
module.exports = mongoose.model('Room', Room);