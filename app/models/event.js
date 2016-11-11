var mongoose = require("mongoose");

var eventSchema = mongoose.Schema({
    title : {
        type: String,
        unique : true
    },
    groupMemberId :{
        type :mongoose.Schema.ObjectId,
        ref : "User"
            },
    groupId : {
         type :mongoose.Schema.ObjectId,
         ref: "Group"
    },   
    dateCreated : String,
    dateEnded  : String,
    expired : Boolean,
    views : Number,
    description : String,
    venue : String,
    aggregateRating : [{
        rating : ["5","4","3","2","1"],
        type : mongoose.Schema.ObjectId,
        ref : "User"
    }]
});

module.exports = mongoose.model("Event",eventSchema);




