const db = require('../models');
const ObjectID = require('mongodb').ObjectID;

//For all templates
exports.getTemplates = function (req, res) {
	db.Template.find()
		.then((foundTemplates) => {
			res.json(foundTemplates);
		}).catch((err) => {
			res.send(err);
		});
}

exports.createTemplates = function(req,res){
	db.Template.create(req.body)
	.then((newTemplate)=>{
		const date = new Date();
		newTemplate.submission_date = date;
		newTemplate.save();
		res.status(201).json(newTemplate);
	}).catch((err)=>{
		res.send(err);
	})
}

//======================//
//For one specific template
exports.getTemplate = function (req, res) {
	db.Template.findById(req.params.templateId).populate('elements').exec()
		.then(foundTemplate => {
			res.json(foundTemplate);
		}).catch(err => {
			res.send(err);
		});
}

exports.updateTemplate = function (req, res) {
	db.Template.findOneAndUpdate({ _id: req.params.templateId }, req.body)
		.then(template => {
			res.json(template);
		}).catch(err => {
			res.send(err);
		});
}

exports.deleteTemplate = function (req, res) {
	db.Template.findById({ _id: req.params.templateId })
		.then((foundTemplate) => {
			foundTemplate.remove();
			res.json({ message: 'It is gone!' });
		}).catch(err => {
			res.send(err);
		})
}

module.exports = exports;
