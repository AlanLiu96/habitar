Template.hello.greeting = function () {
	return "Welcome to habitar.";
};

Template.hello.events({
	'click input': function () {
  	// template data, if any, is available in 'this'
  	if (typeof console !== 'undefined')
    	console.log("You pressed the button");
	}
});

// HTML javascript functions
Template.Test.events({
  'click #yoUser': function () {
  	console.log("yo Summer!");
    Meteor.call("yoUser", "SUMWOOHOO", "1");
  }
});