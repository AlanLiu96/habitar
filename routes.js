Router.route('/', function () {
  this.render('Home');
});

Router.route('/test');

// given a url like "/yo/sumwoohoo"
Router.route('/yo/:_username', function () {
  var params = this.params; // { _username: "sumwoohoo" }
  var username = params._username; // "sumwoohoo"
  // store username in mongo database for saying hello to their pet
  console.log(username);
});

// given a url like "/1"
Router.route('/:_userid', function () {
  var params = this.params; // { _userid: "1" }
  var userid = params._userid; // "1"
});
