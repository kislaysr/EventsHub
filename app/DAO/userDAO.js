var User = require("../models/user");

 function setUser(id,username, regno) {
	User.findOne({'_id': id},function(err,user){
		 if (err){
                console.log(err);
                return done(err);
            }
           if (!user) {
                return done(null, false, req.flash('profileMessage', 'That user does not exist.'));
            } else {
            	user.username = username;
            	user.registrationNumber =regno;
            	user.save();
            	console.log("Success");
            }
        });
}
function putUsers(callback){
    User.find({},function(err,users){
        callback(users);
    });
}
function getUser(id,callback){
   User.findOne({'_id':id},function(err,user){
        callback(user);
    });
}
function getMembers(memberIds,callback){
    User.find({'_id': {$in : memberIds}},function(err,users){
        callback(users);
    });
}
module.exports.setUser = setUser;
module.exports.putUsers = putUsers;
module.exports.getUser = getUser;
module.exports.getMembers = getMembers;