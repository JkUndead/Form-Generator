const mongoose = require('mongoose');

const elementSchema = mongoose.Schema({
	type: {
		type: String,
		required: "Type can not be blank"
	},
	name: {
		type: String,
		required: "Name can not be blank"
	}
});

const Element = mongoose.model('Element', elementSchema);

module.exports = Element;