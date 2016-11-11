 var express = require('express');
 var router = express.Router();
 var groupDAO = require('../DAO/groupDAO');
 var userDAO = require('../DAO/userDAO');
 var groupRef = "";
 var routes = require('./routes');
 var async = require('async');
 var isLoggedIn = routes.isLoggedIn; 
 var putUsers = routes.putUsers;


 // shows All group where logged in user is admin
 router.get('/',isLoggedIn,putGroups, function(req,res,next){
    
     res.render('group.ejs',{
                                    groups: req.groups,
                                    user : req.user
                                    });
 }
 );



//recives request for group registration
    router.post('/registergroup',isLoggedIn,function(req,res,next){
        //console.log(req.body);
        //console.log(req.user._id);

        id = req.user.id;
        title = req.body.title;
        description = req.body.description; 
        email = req.body.email;
        type = req.body.type;
        var showgroupmembers;
        if(req.body.showgroupmembers){
            showgroupmembers= true;
            console.log(showgroupmembers);
        }else{
            showgroupmembers = false;
        }
        groupDAO.createGroup(id,title, description,email,type,showgroupmembers,function(err,message,group){
            
                if(err){
                    console.log(err);

                }
                else{
                    console.log("callback",message);
                    console.log("Group created::",group);
                    groupRef = group;
                    
                }
                next();

        });
      

    },function(req,res,next){
        res.redirect('/group');
    });

//Opens particular group for adding members or deletion
 router.get('/manage',isLoggedIn,putUsers,function(req,res,next){
        
        var id = req.query.id;
        
        console.log(req.members);

        groupDAO.getGroup(id,function(group){
            console.log("GroupId::",group," received");
            req.group = group;
            groupRef = group;
            members = group.members;
            console.log(members);
            userDAO.getMembers(members,function(users){
                
                req.members = users;
               
                next(); 
           });
         
            
             

        });        
 },function(req,res,next){
    res.render('groupManage.ejs',{
                members:req.members,
                group:req.group,
                users:req.users,
                user:req.user
            });
 });
 //Recieves userId and adds it to group 
 router.post('/addmember',isLoggedIn,function(req,res,next){

    userId = req.body.user;
    console.log("Adding members::",userId);
    console.log("To::",groupRef._id);
    id = groupRef._id;
    
   groupDAO.addMembers(id,userId,function(err,message,group){

            console.log(message);
            console.log("Added members:: ",group.members);
            next();       
        
    });

 },function(req,res,next){
    res.redirect('/group');
 });
router.get('/getGroups',isLoggedIn,putGroups,function(req,res,next){
    console.log("api ",req.groups);
    res.json(req.groups);

});
 // Form for creating the group
 router.get('/creategroup',isLoggedIn,function(req,res,next){
        
        var type = ["Technical","Fun","Both"];
        res.render('groupform.ejs',{message: req.flash('signupMessage') ,
                                type:type
                                        });
        
    });
 
function putGroups(req,res,next){
    id = req.user._id;
    groupDAO.getAllGroups(id,function(groups){
        console.log("Groups Added::-> req.groups");
        //console.log(groups);
        req.groups = groups;
        next();
    });
}
function getCurrentGroup(req,res,next){
    req.group = groupRef;
    next();
}
/*function putMembers(req,res,next){
    
           // console.log("group=",group);
           members = req.group.members;
           console.log(members);
           userDAO.getMembers(members,function(users){
                
                req.members = users;
                console.log("members::",req.members);
                next(); 
           });

}*/
module.exports.getCurrentGroup = getCurrentGroup;
 module.exports.router = router;   