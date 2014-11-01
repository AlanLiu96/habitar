// HTML javascript functions
Template.home.events({
	'click #yoUser': function () {
		Meteor.call("yoUser", Meteor.user().yoUsername);
		console.log("should be yoing user");
	}
});

Template.home.name = function () {
	return Meteor.user().profile.name;
};