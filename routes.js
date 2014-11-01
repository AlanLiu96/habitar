Router.route('/', function () {
  this.render('index');
});

Router.route('/home');

Router.route('/admin');

// given a url like "/yo/yousername?username=sumwoohoo"
Router.route('/yo/:_params', function () {
  var username = this.params.query.username; // "sumwoohoo"
  console.log(username);
  // store username in mongo database for saying hello to their avatar
  Meteor.call("yoHabitar", username, function(error, result) {
  	console.log('increased wellness by 1, ' + result);
  });
});
