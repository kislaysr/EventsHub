var Group = require("../models/group");
//express handle bar
 function createGroup(id,title, description,email,type,showgroupmembers,callback ){
    Group.findOne({'title': title},function(err,group){
         if (err){
                console.log(err);
                return callback(err,null,null);
            }
           if (group) {
                return callback(null,'groupMessageThat Group already exists.',null);
            } else {
                var group = new Group();
                group.title = title;
                group.description =description;
                group.emailId = email;
                group.type = type;
                group.showgroupmembers = showgroupmembers;
                console.log(id);
                group.adminId = id;
                group.save();

                    /*function(err) {
                    if (err)
                        throw err;
                    return callback(null,null,group);
                });*/
                return callback(null,"Success",group);
                
            }
        });
}
function addMembers(id,userId,callback){
    Group.findOne({'_id':id},function(err,group){
        if(err){
            console.log("Error");
            callback(err,null,null);
        }
        if(!group){
            callback(null,"Group does not exists",null);
        }
        else{
            group.members = userId;
            group.save();
            callback(null,"Success",group);
        }
    });
}


function getAllGroups(id,callback){
    Group.find({'adminId':id},function(err,groups){
        callback(groups);
    });
}
function getGroup(id,callback){
    Group.findOne({'_id':id},function(err,group){
        callback(group);
    });
}


module.exports.createGroup = createGroup;
module.exports.getAllGroups = getAllGroups;
module.exports.getGroup = getGroup;
module.exports.addMembers = addMembers;
