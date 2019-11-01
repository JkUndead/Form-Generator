const mongoose = require('mongoose');
const Element = require('./elements');
const User = require('./users');

const templateSchema = new mongoose.Schema({
	title: {
		type: String,
		required: 'Title cannot be blank'
	},
	owner: {
		type: String,
		required: 'Owner cannot be blank'
	},
	description: {
		type: String,
		required: 'Description cannot be blank'
	},
	duration: {
		type: String,
		required: 'Duration cannot be blank'
	},
	confirmation_status: {
		type: Boolean,
		default: false
	},
	elements: [
		{	
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Element'	
		}
	],
	author: {
		id:{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		},
	},
	managers: [
		{
			id:{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'User'
			},
			managerName: String
		}
	],
});

//cascading delete
templateSchema.pre('remove', async function() {
	await Element.deleteMany({
		"_id": {
			$in: this.elements
		}
	});
});

const Template = mongoose.model('Template', templateSchema);

module.exports = Template;