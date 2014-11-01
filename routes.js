// logged out user, needs to sign in
Router.route('/', function () {
  this.render('index');
  console.log("called");
});

// logged in user, can see avatar
Router.route('/home');

// check out all users, control time
Router.route('/admin');

// given a url like "/yo/yousername?username=sumwoohoo"
Router.route('/yo/:_params', function () {
  var username = this.params.query.username; // "sumwoohoo"
  console.log(username);
  // store username in mongo database for saying yo to their avatar
  Meteor.call("yoHabitar", username, function(error, result) {
  	console.log('increased wellness by 1, ' + result);
  });
});
