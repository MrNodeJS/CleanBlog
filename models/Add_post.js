const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const AddPostSchema = new Schema({
	title      : String,
	description: String,
	dateCreated: {
		type   : Date,
		default: Date.now()
	}
});

const AddPost = mongoose.model('AddPost', AddPostSchema);

module.exports = AddPost;