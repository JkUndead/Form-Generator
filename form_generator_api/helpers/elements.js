const db = require('../models');

//For all elements
exports.createElement = function(req,res,next){
	db.Template.findById(req.params.templateId)
	.then(template => {
		db.Element.create(req.body)
			.then(newElement => {
				template.elements.push(newElement);
				template.save();
				res.status(201).json(newElement);
			}).catch(err => {
				res.send(err);
			})
	}).catch(next);
	
}

//======================//
//For one specific element
exports.getElement = function(req,res){
	db.Template.findById(req.params.id)
	.then(() => {
		db.Element.findById(req.params.elementId)
		.then(foundElement =>{
			res.json(foundElement);
		}).catch(err=>{
			res.send(err);
		});
	}).catch(err => {
		res.send(err);
	})
	
}

exports.updateElement = function(req,res){
	db.Element.findOneAndUpdate({_id: req.params.elementId}, req.body, {new: true})
	.then(element =>{
		res.json(element);
	}).catch(err=>{
		res.send(err);
	});
}

exports.deleteElement = function(req,res){
	db.Element.remove({_id: req.params.elementId})
	.then(()=>{
		res.json({message: 'It is gone!'});
	}).catch(err=>{
		res.send(err);
	})
}

module.exports = exports;
