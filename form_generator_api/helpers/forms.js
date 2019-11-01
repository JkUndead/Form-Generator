const db = require('../models');

//For all templates
exports.getForms = function(req,res){
	db.Form.find()
	.then((foundForms)=>{
		res.json(foundForms);
	}).catch((err)=>{
		res.send(err);
	});
}


exports.createForm = function(req,res){
    db.Form.create(req.body)
    .then((newForm)=>{
		res.status(201).json(newForm);
	}).catch((err)=>{
		res.send(err);
	})
} 

//For oen form
exports.getForm = function(req,res){
	db.Form.findById(req.params.formId).populate('elements').exec()
	.then(foundForm =>{
		res.json(foundForm);
	}).catch(err=>{
		res.send(err);
	});
}

exports.updateForm = function(req,res){
    db.Form.findOneAndUpdate({_id: req.params.formId}, req.body)
    .then(foundForm=>{
		res.json(foundForm);
	}).catch(err=>{
		res.send(err);
	});
}

exports.deleteForm = function(req,res){
    db.Form.findById({_id: req.params.formId})
	.then((foundForm)=>{
		foundForm.remove();
		res.json({message: 'It is gone!'});
	}).catch(err=>{
		res.send(err);
	})
}

module.exports = exports;