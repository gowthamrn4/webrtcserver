var express = require('express');
var router = express.Router();
var Room = require('../models/room');

router.post('/create', function (req, res) {
	console.log('Helloooo')
	Room.create({
		name: req.body.name,
		room_Code: makeid(10),
		people_Count: 1,
		UserId: req.body.creatorId
	})
		.then(function (room) {
			res.status(200).json({ status: 'OK', code: 200, data: { message: 'Room was created!', roomCode: room.room_Code } });
		})
		.catch((error) => {
			res.status(400).json({ status: 'Bad Request', code: 400, data: { message: 'Error Occured: ' + error } });
		});
});

router.delete('delete/:roomId', function (req, res) {
	let roomNo = req.params.roomId;
	Room.destroy({
		where: {
			id: roomNo
		}
	}).then(() => {
		res.status(200).json({ status: 'OK', code: 200, data: { message: 'Room was Deleted!' } });
	}).catch((error) => {
		res.status(400).json({ status: 'Bad Request', code: 400, data: { message: 'Error Deleting Room' } })
	});
})


router.get('/join/:room_Code', function (req, res) {
	let recievedCode = req.params.room_Code;
	Room.findOne({ room_Code: recievedCode })
		.then(theRoom => {
			console.log('the room', theRoom)
			let number = theRoom.people_Count;
			let room_name = theRoom.name;
			res.status(200).json({ status: 'OK', code: 200, data: { message: 'Room joined successfully', room_name: room_name } })

		})
		.catch((error) => {
			res.status(400).json({ status: 'Bad Request', code: 400, data: { message: 'Error joining room!' + error } })
		})

});

function makeid(length) {
	var result = '';
	var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	var charactersLength = characters.length;
	for (var i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
}



router.get('/', function (req, res, next) {
	Room.findAll().then(Rooms => {
		console.log(Rooms)
		res.json("rooms retreived");
	})
		.catch((error) => {
			res.status(400).json({ status: 'Bad Request', code: 400, data: { message: 'Rooms Error' } })
		});
});

module.exports = router;