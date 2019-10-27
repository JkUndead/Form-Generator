const express = require('express'),
	  app = express(),
	  bodyParser = require('body-parser'),
	  result = require('dotenv').config(),
	  templateRoutes = require('./routes/templates');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/public'));

//======================
//HOME PAGE
app.get('/', (req,res)=>{
	res.sendFile('index.html');
});

//======================
//HOME PAGE
app.get('/login', (req,res)=>{
	res.sendFile('login.html');
});

//=======================
//INDEX PAGE
//show all the templates
app.use('/api/templates', templateRoutes);




//=====================

//====================

app.listen(process.env.PORT || 8080,()=>{
    console.log('Server has started!');
});