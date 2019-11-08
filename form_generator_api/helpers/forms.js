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
	const  newAuthor = {
		id: ObjectID(user._id), 
		username: req.body.userName 
	}
	const newTemplate = {
		id: ObjectID(req.body.templateId),
		title: req.body.title
	}
	const form = new Form({
		status: "Pending",
		elementValues: req.body.elementValues,
		submission_date: new Date(),
		author: newAuthor,
		template: newTemplate
	});
	db.Form.create(form)
		.then((newForm) => {
			res.status(201).json(newForm);
		})
		.then(() => {
			let mailOptions = {
				from: "murdochformflow@gmail.com",
				to: req.body.email,
				subject: "Form Submission Confirmation",
				html: '<h1>You have submitted a form for approval.</h1><p> The current status is set to <b style="color:green;">PENDING</b></p>'
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
			let mailOptions = {
				from: "murdochformflow@gmail.com",
				to: req.body.email,
				subject: `Submitted Form Result`,
				html: `<h2>Your Form: </h2><h1>${foundForm.template.title}</h1><br></br>
				<p>Your submitted form has been <b>${req.body.status}</b></p>`
			};

			transporter.sendMail(mailOptions, function (error, info) {
				if (error) {
					console.log("Email error: " + error);
				} else {
					console.log("Email sent: " + info.response);
				}
			});
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