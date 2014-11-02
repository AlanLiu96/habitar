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
		var unfinished = Tasks.find({$and:[{'createdBy':Meteor.user()._id}, {'completed':0}]});
		var count = unfinished.count();
		var selection = Math.round(Math.random()*count);
		var task = unfinished.fetch()[selection].tagWord;
		console.log(task);
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

