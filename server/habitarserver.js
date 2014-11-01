Meteor.startup(function () {
    // code to run on server at startup
});

Meteor.methods({
	yoUser: function (user, user_id) {
		console.log("Yoing user");
		var url = "http://habitar.meteor.com/" + user_id;
		try {
			var result = HTTP.call("POST", "https://api.justyo.co/yo/",
		                       {params: {username: user, api_token: "6c1e9f8b-2f57-4c51-a019-e8f9a39daaa1", link: url}});
			return true;
		} catch (e) {
			// Got a network error, time-out or HTTP error in the 400 or 500 range.
			return false;
		}
	},

	yoHabitar: function (username) {
		console.log("Yoing habitar");
	}
});