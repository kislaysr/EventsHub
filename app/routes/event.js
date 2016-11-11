var express = require('express');
var router = express.Router();
//DAOs
var groupDAO = require('../DAO/groupDAO');
var userDAO = require('../DAO/userDAO');
var eventDAO = require('../DAO/eventDAO');
//routes
var routes = require('./routes');
var group = require('./group');
//isLoggedIn
var isLoggedIn = routes.isLoggedIn; 
//getCurrentGroup
 var getCurrentGroup = group.getCurrentGroup;
//createEvent
router.get('/createEvent',isLoggedIn,getCurrentGroup,/*isGroupMember,*/function (req,res,next) {
	console.log("body",req.body);
	res.render('createEvent.ejs',{
		username:req.user.username
	});
});
router.post('/submitEvent',isLoggedIn,getCurrentGroup,/*isGroupMember*/function(req,res,next){
	title = req.body.title;
	description = req.body.description;
	venue = req.body.venue; 
	datecreated = req.body.datecreated;
	datends = req.body.datends;
	userId= req.user._id;
	groupId = req.group._id;
	console.log("groupid=",groupId);
	console.log("id = ",id);
	eventDAO.createEvent(userId,groupId,title,description,venue,datecreated,datends,function(err,message,event){
		if(err){
			console.log("error: ",err);
		}
		else{
			console.log(message);
			console.log(event);
		}
	});
	next();
},function(req,res,next){
	res.redirect('/event/events');
});
router.get('/events',isLoggedIn,function(req,res,next){
	res.render('events.ejs',{
		username:req.user.username
	});
});
router.get('/getEvents',isLoggedIn,putEvents,function(req,res,next){
	console.log(req.events);
	
		res.json(req.events);
});
router.get('/rating/:value',isLoggedIn,putEvents,function(req,res,next){
	console.log(req.body.params.value);
	
		res.redirect('/event/events');
});
function putEvents(req,res,next){
	console.log("calling putEvents");
	eventDAO.getEvents(function(events){
		req.events = events;
		next();
	});

}
module.exports = router;