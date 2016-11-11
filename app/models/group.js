var mongoose = require("mongoose");

var groupSchema = mongoose.Schema({
	title : String,
	type : ["Technical","Fun","Both"],
 	verified : Boolean,
    description : String,
	link : String,
	emailId : String,
	adminId : {
		type :mongoose.Schema.ObjectId,
		ref : "User"
	},
	showGroupMembers : Boolean,
	members : [{
		type : mongoose.Schema.ObjectId,
		ref : "User"
	}]


});

module.exports = mongoose.model("Group",groupSchema);