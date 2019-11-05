const db = require('../models');
const User = require('../models/users');
const Form = require('../models/forms');
const transporter = require('./mailSender')
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
		status: "Pending",
		elementValues: req.body.elementValues,
		submission_date: new Date()
	});
	db.Form.create(form)
		.then((newForm) => {
			newForm.author.id = ObjectID(user._id);
			newForm.author.username = req.body.userName;
			newForm.template.id = ObjectID(req.body.templateId);
			newForm.template.title = req.body.title;
			newForm.save();
			res.status(201).json(newForm);
		})
		.then(() => {
			let mailOptions = {
				from: "murdochformflow@gmail.com",
				to: req.body.email,
				subject: "Form Submission Confirmation",
				text: `You have submitted a form for Approval. Your form is being proceeded. You can find all your submitted forms here http://localhost:3000/forms/${req.body.userName}`
			};

			transporter.sendMail(mailOptions, function (error, info) {
				if (error) {
					console.log("Email error: " + error);
				} else {
					console.log("Email sent: " + info.response);
				}
			});
		})
		.catch((err) => {
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