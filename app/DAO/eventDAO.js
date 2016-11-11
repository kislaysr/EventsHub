var Event = require("../models/event");

 function createEvent(userId,groupId,title,description,venue,datecreated,datends,callback ){
    Event.findOne({'title': title},function(err,event){

            if (err){
                console.log(err);
                return callback(err,null,null);
            }
            if (event) {
                return callback(null,'Event already exists.',null);
            } else {
                var event = new Event();
                event.title = title;
                event.description = description;
                event.venue = venue;
                event.dateCreated = datecreated;
                event.dateEnded = datends;
                event.expired  = false;
                event.groupMemberId = userId;
                event.groupId = groupId;
                //console.log(id);
                event.save();

                    /*function(err) {
                    if (err)
                        throw err;
                    return callback(null,null,group);
                });*/
                return callback(null,"Success",event);
                
            }
        });
}
function getEvents(callback){
    Event.find({},function(err,events){
        if(err){
            console.log(err);
        }
        else{
            return callback(events);
        }
    });
}

/*
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
*/

module.exports.createEvent = createEvent;
module.exports.getEvents = getEvents;
/*module.exports.getAllGroups = getAllGroups;
module.exports.getGroup = getGroup;
module.exports.addMembers = addMembers;
*/