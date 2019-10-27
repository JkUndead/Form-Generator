const db = require('../models');

//For all elements
exports.getElements = function(req,res){
	db.Element.find()
	.then((foundElements)=>{
		res.json(foundElements);
	}).catch((err)=>{
		res.send(err);
	});
}

exports.createElements = function(req,res){
	db.Element.create(req.body)
	.then((newElement)=>{
		res.status(201).json(newElement);
	}).catch((err)=>{
		res.send(err);
	})
}

//======================//
//For one specific element
exports.getElement = function(req,res){
	db.Element.findById(req.params.ElementId)
	.then(foundElement =>{
		res.json(foundElement);
	}).catch(err=>{
		res.send(err);
	});
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
