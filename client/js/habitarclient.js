// HTML javascript functions
Template.home.events({

});

// In your JavaScript
Template.home.helpers({
	name: function() {
		return Meteor.user().profile.name;
	},

	quote: function () {
		// get a wolfram alpha fact for an uncompleted food or fitness task
		//Meteor.users.find

		var task = "push ups";
		var category = "fitness";

		var fact = Meteor.call("getFacts", task, category, function(error, result) {
			console.log('finished searching for facts on wolfram alpha, ' + result);
			if (error) {
				console.log(error);
			} else {
				Session.set('q', result);
			}
		});
		return Session.get('q');
	}
});
