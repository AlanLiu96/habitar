Router.route('/', function () {
  this.render('index');
});

Router.route('/home');

// given a url like "/yo/sumwoohoo"
Router.route('/yo/:_username', function () {
  var params = this.params; // { _username: "sumwoohoo" }
  var username = params._username; // "sumwoohoo"
  // store username in mongo database for saying hello to their pet
  console.log(username);
});

Router.route('/admin');