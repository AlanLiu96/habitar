// HTML javascript functions
Template.home.events({
	'click #yoUser': function () {
		Meteor.call("yoUser", Meteor.user().yoUsername, function(error, result) {
		  	console.log('sent yo to user, ' + result);
		});
	}
});

Template.home.name = function () {
	return Meteor.user().profile.name;
};