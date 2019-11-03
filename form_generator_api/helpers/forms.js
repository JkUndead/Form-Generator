const db = require('../models');
const User = require('../models/users');
const Form = require('../models/forms');
const ObjectID = require("mongodb").ObjectID;

//For all templates
exports.getForms = function (req, res) {
	db.Form.find()
		.then((foundForms) => {
			res.json(foundForms);
		}).catch((err) => {
			res.send(err);
		});
}


exports.createForm = function (req, res) {
	const user = new User({
		username: req.body.userName,
		email: req.body.email,
		role: req.body.role,
	});
	user.save();
	const form = new Form({
		template: ObjectID(req.body.templateId),
		status: "pending",
		elementValues: req.body.elementValues,
	});
	db.Form.create(form)
		.then((newForm) => {
			newForm.author.id = ObjectID(user._id);
			newForm.author.username = req.body.userName;
			newForm.save();
			res.status(201).json(newForm);
		}).catch((err) => {
			res.send(err);
		})
}

//For one form
exports.getForm = function (req, res) {
	db.Form.findById(req.params.formId).populate('elements').exec()
		.then(foundForm => {
			res.json(foundForm);
		}).catch(err => {
			res.send(err);
		});
}

exports.updateForm = function (req, res) {
	db.Form.findOneAndUpdate({ _id: req.params.formId }, req.body)
		.then(foundForm => {
			res.json(foundForm);
		}).catch(err => {
			res.send(err);
		});
}

exports.deleteForm = function (req, res) {
	db.Form.findById({ _id: req.params.formId })
		.then((foundForm) => {
			foundForm.remove();
			res.json({ message: 'It is gone!' });
		}).catch(err => {
			res.send(err);
		})
}

module.exports = exports;