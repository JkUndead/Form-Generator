const db = require('../models');

//For all templates
exports.getTemplates = function(req,res){
	db.Template.find()
	.then((foundTemplates)=>{
		res.json(foundTemplates);
	}).catch((err)=>{
		res.send(err);
	});
}

exports.createTemplates = function(req,res){
	db.Template.create(req.body)
	.then((newTemplate)=>{
		res.status(201).json(newTemplate);
	}).catch((err)=>{
		res.send(err);
	})
}

//======================//
//For one specific template
exports.getTemplate = function(req,res){
	db.Template.findById(req.params.templateId)
	.then(foundTemplate =>{
		res.json(foundTemplate);
	}).catch(err=>{
		res.send(err);
	});
}

exports.updateTemplate = function(req,res){
	db.Template.findOneAndUpdate({_id: req.params.templateId}, req.body, {new: true})
	.then(template=>{
		res.json(template);
	}).catch(err=>{
		res.send(err);
	});
}

exports.deleteTemplate = function(req,res){
	db.Template.deleteOne({_id: req.params.templateId})
	.then(()=>{
		res.json({message: 'It is gone!'});
	}).catch(err=>{
		res.send(err);
	})
}

module.exports = exports;
