const mongoose = require('mongoose'),
	  result = require('dotenv').config();
mongoose.set('debug',true);
const url = process.env.DB_URL || 'mongodb://localhost:27017/form_generator';
mongoose.connect(url,{
 	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: false,
	useUnifiedTopology: true
})
.then(()=>{
	console.log("Connect to DB");
})
.catch(err =>{
	console.log(err);
});

mongoose.Promise = Promise;

module.exports.Template = require('./templates');
module.exports.Element = require('./elements');
module.exports.User = require('./users');
module.exports.Form = require('./forms');