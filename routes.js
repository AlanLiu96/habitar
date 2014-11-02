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

// THE HABITAR API
/*
	GET http://habitar.meteor.com/users/_:params (oauth)
		-returns user_id
	POST http://habitar.meteor.com/users/new/_:params
	-returns user_id

	GET http://habitar.meteor.com/tasks/_:user_id
		-returns json of task object
		-returns wolfram fact
	POST http://habitar.meteor.com/tasks/new/_:params
		-returns task_id
*/

Router.map(function() {
    this.route('getUser', {
        path: '/users/:_params',
        where: 'server',
        action: function() {
            // GET, POST, PUT, DELETE
            var requestMethod = this.request.method;
            // Data from a POST request
            //var requestData = this.request.body;
            var yoUsername = this.params._params.toString();
			var users = Meteor.users.find({"yoUsername":yoUsername});
			var user = users.fetch()[0];

            // Could be, e.g. application/xml, etc.
            this.response.writeHead(200, {'Content-Type': 'application/json'});
            this.response.end(JSON.stringify(user));
        }
    });
});

// IN PROGRESS!!!
Router.map(function() {
    this.route('getTask', {
        path: '/tasks/:_params',
        where: 'server',
        action: function() {
            // GET, POST, PUT, DELETE
            var requestMethod = this.request.method;

            if (requestMethod == "GET") {}
            // Data from a POST request
            //var requestData = this.request.body;
            var user_id = this.params._params.toString();
			var tasks = Tasks.find({"createdBy":user_id});

            // Could be, e.g. application/xml, etc.
            this.response.writeHead(200, {'Content-Type': 'application/json'});

            var num_tasks = tasks.count();
            var all_tasks = [];
            for (i = 0; i < num_tasks; i++) {
            	var task = tasks.fetch()[i];
	            all_tasks.push(task);
	        }
	        this.response.end(JSON.stringify(all_tasks));
        }
    });
});


