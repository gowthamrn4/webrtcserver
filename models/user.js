// const express   = require('express');
// const Sequelize = require('sequelize');

// module.exports = (sequelize) => {
// 	//Users Model Schema
// 	let user = sequelize.define('User', {
// 		username: {
// 			type: Sequelize.STRING,
// 			allowNull: false
// 		},
// 		email: {
// 			type: Sequelize.STRING,
// 			allowNull: false
// 		},
// 		password: {
// 			type: Sequelize.STRING,
// 			allowNull: false
// 		},
// 	},{
// 		freezeTableName: true
// 	});
// 	return user;
// }


const mongoose = require('mongoose');
const Schema = mongoose.Schema
const User = new Schema({
	username: String,
	email: String,
	password: String,
})
module.exports = mongoose.model('User', User);