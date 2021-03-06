const mongoose = require('mongoose');
const Template = require('./templates')

const elementSchema = new mongoose.Schema({
	type: {
		type: String,
		required: "Type can not be blank"
	},
	name: {
		type: String,
		required: "Name can not be blank"
	}
});

elementSchema.pre('remove', function(next) { 
	//const arr = this.model('Template').findOne({elements:{}})
	this.model('Template').updateOne(
		{
			elements: [
				{_id: this._id}
			]
		},
		{
			"$pullAll" : { elements : [{_id: this._id}]},

		}
	)
	.then(() => {
		console.log('ok');
	}).catch(err =>{
		console.log(err)
	})
	next();
});

const Element = mongoose.model('Element', elementSchema);

module.exports = Element;