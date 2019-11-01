const db = require('../models');

//for all user detail
exports.getUsers = function(req,res){
    db.User.find()
    .then((foundUser)=>{
        res.json(foundUser);
    }).catch((err)=>{
        res.send(err);
    });
}

//for user creation
exports.createUser = function(req,res){
    db.User.create(req.body)
    .then((newUser)=>{
        res.status(201).json(newUser);
    }).catch((err)=>{
        res.send(err);
    });
}
//get specific user detail
exports.getUser = function(req,res){
    db.User.findById(req.params.userId).exec()
    .then((foundUser)=>{
        res.json(foundUser);
    }).catch(err=>{
        res.send(err);
    });
}
//update user detail
exports.updateUser = function(req,res){
    db.User.findOneAndUpdate({_id: req.params.userId}, req.body, {new: true})
    .then(user=>{
        res.json(user);

    }).catch(err=>{
        res.send(err);
    });

}
//Delete user detail
exports.deleteUser = function(req,res){
    db.User.findById({_id: req.params.userId})
    .then((foundUser)=>{
        foundUser.remove();
        res.json({message: 'User has deleted'});

    }).catch(err=>{
        res.send(err);
    });
}

module.exports = exports;