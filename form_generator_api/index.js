const express = require('express'),
	  app = express(),
	  bodyParser = require('body-parser'),
	  result = require('dotenv').config(),
	  templateRoutes = require('./routes/templates'),
	  userRoutes = require('./routes/users'),
	  formRoutes = require('./routes/forms')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/public'));

//======================
//HOME PAGE
app.get('/', (req,res)=>{
	res.sendFile('index.html');
});


//=======================
//TEMPLATES ROUTES
app.use('/api/templates', templateRoutes);

//=======================
//USERS ROUTES
app.use('/api/users',userRoutes);

//=======================
//USERS ROUTES
app.use('/api/forms',formRoutes);

//=====================

//====================

app.listen(process.env.PORT || 8080,()=>{
    console.log('Server has started!');
});