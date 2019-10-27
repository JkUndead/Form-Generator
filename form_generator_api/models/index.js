const mongoose = require('mongoose'),
	  result = require('dotenv').config();
mongoose.set('debug',true);
const url = process.env.DB_URL;
mongoose.connect(url,{
 	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: false
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