const mongoose = require('mongoose');

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
	]
});

//cascading delete
templateSchema.pre('remove', async function() {
	await Element.remove({
		_id: {
			$in: this.elements
		}
	});
});

const Template = mongoose.model('Template', templateSchema);

module.exports = Template;