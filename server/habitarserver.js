Meteor.startup(function () {
    // code to run on server at startup
    later.date.localTime();
    var task = new ScheduledTask('at 12:00 am', function () {
    	Meteor.call("resetDailyYos", function(error, result) {
		  	console.log('successfully reset daily yos to 0, ' + result);
		});
	});
	task.start();
});



// APIs
Meteor.methods({
	// Yo
	yoUser: function (username) {
		console.log("Yoing user");
		try {
			var result = HTTP.call("POST", "https://api.justyo.co/yo/",
		                       {params: {username: username, api_token: "6c1e9f8b-2f57-4c51-a019-e8f9a39daaa1", link: "http://habitar.meteor.com/home"}});
			return true;
		} catch (e) {
			// Got a network error, time-out or HTTP error in the 400 or 500 range.
			return false;
		}
	},

	yoHabitar: function (username) {
		console.log("Yoing habitar");
		Meteor.users.update({_id: Meteor.user()._id}, {$inc: {"wellness": 1}} );
		Meteor.users.update({_id:Meteor.user()._id}, {$inc:{"daily_yos": 1}}, true);
	},

	// every night at midnight- reset daily yos for all users!
	resetDailyYos: function () {
		console.log("Resetting daily yos");
		Meteor.users.update({}, {$set:{"daily_yos": 0}}, { multi: true });
	},

	// Wolfram Alpha
	getNutritionFacts: function (food) {},

	getFitnessFacts: function (exercise) {}
});