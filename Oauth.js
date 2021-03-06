Meteor.methods({
  click: function () {
    Meteor.users.update({_id: this.userId}, {$inc: {'data1': 1}});
  },
})


Tasks= new Meteor.Collection('tasks');
    // createdBy: Meteor.user()._id, // put these in the method call
    //createdAt: new Date(),
    //name: "This is a sample task. Remember to eat your spinach!",
    //tagWord:"spinach"
  //   compDates: [],
  //   pLevel: 1
  // });
Tasks.allow({
  insert: function (userId, task) {
    // can only create posts where you are the author
    return true;// just hard coding this now.
  },
  remove: function (userId, task) {
    // can only delete your own posts
    return true;
  }
  // since there is no update field, all updates
  // are automatically denied
});
 Avatars = new Meteor.Collection('avatars');
  Dialog = new Meteor.Collection('dialog');
  Dialog.allow({
  insert: function (userId, dialog) {
    // can only create posts where you are the author
    return true;
  },
  remove: function (userId, dialog) {
    // can only delete your own posts
    return true;
  },
  update:function(userId,dialog){
    return true;
  }
});

Items = new Meteor.Collection('items');
  Items.allow({
  insert: function (userId, dialog) {
    // can only create posts where you are the author
    return true;
  },
  remove: function (userId, dialog) {
    // can only delete your own posts
    return true;
  },
  update:function(userId,dialog){
    return true;
  }
});


  Streaks = new Meteor.Collection('streaks');




if (Meteor.isClient) {

  Accounts.ui.config({
    passwordSignupFields: 'USERNAME_ONLY'
  });

Deps.autorun(function(){
  if(Meteor.user()){
    // login handler
    Meteor.call('updateLastVisit');
    // Items.remove();
    if (Tasks.find().count() != Items.find().count())//temporary fix 
    	Meteor.call('addItems'); 
    
  }
  else{
    // logout handler
  }
});

    Meteor.subscribe('userData');
    Meteor.subscribe('tasks'); 
    Meteor.subscribe('dialog');//needs to be subscribed and published for client to see updates to collection
    Meteor.subscribe('items');
    // console.log(Tasks);

 
  Template.taskList.items = function () {
    return Items.find({});
  };

Template.admin.players = function () {
  return Meteor.users.find({}, {sort: {'username': 1}});
};

Template.hello.user = function () {
  return Meteor.user();
}


Template.hello.buddyEmailDefault =function(){
  return Meteor.user().buddyEmail==""; 
}


Template.hello.yoUsernameDefault =function(){
  return Meteor.user().yoUsername==""; 
}

Template.hello.emailDefault =function(){
  return Meteor.user().emailNum==""; 
}
Template.hello.cAvatarDefault =function(){
  return Meteor.user().cAvatar==0; 
}
Template.hello.cAttitudeDefault =function(){
  return Meteor.user().cAttitude == 0; 
}


Template.hello.taskLimit=function(){
  // console.log("TASK LIMIT" + Tasks.find({},{'createdBy':Meteor.user()._id}).fetch());
  return (Tasks.find({},{'createdBy':Meteor.user()._id}).count() >= 5)//temporarily set to eight for testing
}



Template.hello.yoUsernameDefault =function(){
  return Meteor.user().yoUsername==""; 
}



  Template.hello.events({

  'click input.code': function () {
    Meteor.call('click');
  },
      'click input.add-property' : function(event){// add a property (base code to copy paste)
        event.preventDefault();
        var propertyText = document.getElementById("propertyText").value;
        Meteor.call("addProperty",propertyText,function(error , propertyText){
          console.log('added property with text of .. '+propertyText);
        });
        //document.getElementById("propertyText").value = "";
    },
      'click input.add-task' : function(event){// add a property (base code to copy paste)
        event.preventDefault();
        var taskText = document.getElementById("taskText").value;
        var tagWord = document.getElementById("tagWord").value;
        console.log('attempting to add'+ taskText + tagWord);
        Meteor.call("addTask",taskText,tagWord, function(error , taskId){
          console.log('added task with text of .. '+taskId);
        });
        document.getElementById("taskText").value = "";
        document.getElementById("tagWord").value = "";
        if (Items.find().count()<=5 )//populates the List on first call
			Meteor.call('addItems')
    },


'submit form': function(event){
	console.log('initial settings form is being submitted')
	event.preventDefault();
    event.stopPropagation();


},



      'click input.add-buddy-email' : function(event){// maybe add a check for the @?
        event.preventDefault();
        var propertyText = document.getElementById("buddyEmail").value;
        Meteor.call("addBuddyEmail",propertyText,function(error , propertyText){
          console.log('added buddyEmail with text of '+ propertyText);
        });
        //document.getElementById("propertyText").value = "";
    },


      'click input.add-yo-username' : function(event){
        event.preventDefault();
        var propertyText = document.getElementById("yoUsername").value;
        Meteor.call("addYoUsername",propertyText,function(error , propertyText){
          console.log('added yoUsername with text of  '+propertyText);
        });
        //document.getElementById("propertyText").value = "";
    },

      'click input.add-email' : function(event){
        event.preventDefault();
        var propertyText = document.getElementById("email").value;
        Meteor.call("addEmail",propertyText,function(error , propertyText){
          console.log('added email with text of  '+propertyText);
        });
        //document.getElementById("propertyText").value = "";
    },

      'click input.set-cAvatar-1' : function(event){
        event.preventDefault();
        Meteor.call("setcAvatar",1,function(error,propertyText){
          console.log('set cAvatar to 1 ');
        });
        //document.getElementById("propertyText").value = "";
    },
      'click input.set-cAvatar-2' : function(event){
        event.preventDefault();
        Meteor.call("setcAvatar",2,function(error,propertyText){
          console.log('set cAvatar to 2 ');
        });
        //document.getElementById("propertyText").value = "";
    },


      'click input.set-cAvatar-3' : function(event){
        event.preventDefault();
        Meteor.call("setcAvatar",3,function(error,propertyText){
          console.log('set cAvatar to 3 ');
        });
        //document.getElementById("propertyText").value = "";
    },

      'click input.set-cAttitude-1' : function(event){
        event.preventDefault();
        Meteor.call("setcAttitude",1,function(error,propertyText){
          console.log('set cAttitude to 1 ');
        });
        //document.getElementById("propertyText").value = "";
    },
      'click input.set-cAttitude-2' : function(event){
        event.preventDefault();
        Meteor.call("setcAttitude",2,function(error,propertyText){
          console.log('set cAttitude to 2 ');
        });
        //document.getElementById("propertyText").value = "";
    },


      'click input.set-cAttitude-3' : function(event){
        event.preventDefault();
        Meteor.call("setcAttitude",3,function(error,propertyText){
          console.log('set cAttitude to 3 ');
        });  
        //document.getElementById("propertyText").value = "";
    },



    'click input': function () {//Hello World Code
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        console.log("You pressed the button");
    }


  });

  Template.taskList.events({
  'click .complete-task': function (event){//checkboxes on the taskList
    //if document.getElementById('event.target').
    if (Items.findOne({id:parseInt(event.target.value)}).completed == null || Items.findOne({id:parseInt(event.target.value)}).completed == 0){
    	console.log('great job finishing the task!')
	    Items.update({_id:Items.findOne({id:parseInt(event.target.value)})['_id']}, {$inc:{'completed': 1}});
	    // Meteor.users.update({_id:Meteor.user()._id}, {$inc:{"wellness":[XAMOUNTDEPENDING ON AMT COMPLETED TODAY]}})
	    Meteor.call('increaseWellness');
	    //It does a little dance!! 

}
    // Items.update({_id:Items.findOne({id:event.target.id})['_id']}, {$inc:{completed: 1}});// add 1 to quant

  },
 });

}

if (Meteor.isServer) {

// Accounts.onLogin(function (event){
// 	console.log(event)
// 	Items.remove( {'createdBy':not(Meteor.user()._id) });

// })

    Meteor.startup(function () {  // code to run on server at startup
if (Dialog.find().count()==0)
    Meteor.call('addDialog')//populates dialog on first server run


  });

 //  Accounts.onLogin(function(input){
 //  	// console.log(input);
 //  	// console.log(this);
 //  	// if (Session.get('loginStatus')== true)
	// Meteor.call('updateLastVisit');
	

	
 //  });// update Last Visited whenever a user logs in

  //facebook login, remove config if it's already there so we insert the new one
ServiceConfiguration.configurations.remove({
  service: "facebook"
});
ServiceConfiguration.configurations.insert({
  service: "facebook",
  appId: "1719050114987749",
  secret: "4f84b79387878dec458615d82a9c085a"
});

// first, remove configuration entry in case service is already configured
ServiceConfiguration.configurations.remove({
  service: "twitter"
});
ServiceConfiguration.configurations.insert({
  service: "twitter",
  consumerKey: "i6l8duAGsHisVeF7xmbQJoctp",
  secret: "vUZO16oLfPdx5RYj8rBNGvk2VNqhlJJYhkfVZ3GWvozYr0WjYN"
});

// first, remove configuration entry in case service is already configured
ServiceConfiguration.configurations.remove({
  service: "google"
});
ServiceConfiguration.configurations.insert({
  service: "google",
  clientId: "1092683703628-cit5e11i8lvb4tbk6avfvp91cnqba2k2.apps.googleusercontent.com",
  secret: "lREHbEvSFXM3-n_6J_L7Tv12"
});


//Default Values on user creation // USER CREATION IS DISABLED FOR SIGN UP FORM
  Accounts.onCreateUser(function(options, user) {
    if (options.profile){// facebook login
      user.profile=options.profile;
      user.username=options.profile.name;

    }
  // console.log(options);
  // console.log(user);

  user.data1 = 0;//test valu
  user.yoUsername="";//user's username for Yo! 
  user.buddyName ="";
  user.buddyEmail = ""; // acc. buddy email
  user.email="";// user's email
  user.cAvatar=0;// current avatar( 1 2 or 3 )
  user.wellness=50;//wellness ( from 50 to 100)
  user.pastAvatars=[];//past avatars
  user.cAttitude=0;// current attitude 
  user.avatarStage=0;// avatar's stage (from 0 to 3)
  user.daily_yos=0;
  user.lastVisited= new Date();
  user.taskList=[];
  console.log(user); // test to make sure all of that was stored
  return user;
})

  Meteor.publish("userData", function () {
  return Meteor.users.find({}, {sort: {'username': 1}});
});


  Meteor.publish("tasks",function(){
    return Tasks.find({createdBy: this.userId},{sort:{'createdAt': 1}});

  });

  Meteor.publish('dialog',function(){
    return Dialog.find({});
  })

  Meteor.publish('items',function(){
  	return Items.find({}, {sort:{'id':1}});
  })


//scheduler, on next day map through users and decrease happiness by certain amount
    Meteor.methods({

    	increaseWellness:function(){
    		var completedTasks = 0;
    		Items.find().forEach(function(item){
    			completedTasks = completedTasks + item.completed;
    		})
    		// console.log(completedTasks);
    		// completedTasks now has the number of tasks completed today
    		// this function will only run once every time completedTasks is incremented by 1
    		if (completedTasks ==2) // if 2 are completed add 10 to wellness
    			Meteor.users.update({_id:Meteor.user()._id}, {$inc:{"wellness": 10}});
    		if (completedTasks ==4)// if 4 are completed add 15 in addition to the 10 already added
    			Meteor.users.update({_id:Meteor.user()._id}, {$inc:{"wellness": 15}})
    		if (completedTasks ==6) // if 6 are completed add 20 in addition to the 35 already added 
    			Meteor.users.update({_id:Meteor.user()._id}, {$inc:{"wellness": 20}})

    	},

    	updateLastVisit:function(){
 
				Meteor.users.update({_id:Meteor.user()._id}, {$set:{"lastVisited": new Date()}})
    		

    	},

  addDialog:function(){
    console.log('add initial dialog')
    var dialogId=  Dialog.insert({
    'greeting': ["Hello!(friendly)", " You have 9 Tasks to do today!(coach)" , "Heyyyyyyy(snarky?)"],
    'angry': [],
    'sad': [],
    'happy': []
  })

    return dialogId;
  },

  addItems:function(){
    console.log('adding items ')
    var i =0;
    // console.log(Tasks.find({'createdBy':Meteor.user()._id}));
    Tasks.find({'createdBy':Meteor.user()._id}).forEach(function(task){
    Items.remove({id:(i+1)});
    Items.insert({
    'id': (i+1),
    'name': task.name,
    'createdBy':task.createdBy,
    'compDates':task.compDates,
    'pLevel':task.pLevel,
    'completed': 0

  })
    i++;
})
    // return itemId;
  },


  addProperty : function(propertyText){
    console.log('Setting Property to '+ propertyText);
    Meteor.users.update({_id:Meteor.user()._id}, {$set:{"property":propertyText}})
  },

  addTask: function(propertyText, tagWord){
    console.log('Setting taskText to '+ propertyText +' and tag to ' + tagWord);
    // Tasks.({}, {$set:{"name":propertyText}, $set:{'tagWord':tagWord}})
    var taskId = Tasks.insert({
      'name':propertyText,
      'createdBy':Meteor.user()._id,
      'createdAt':new Date(),
      'tagWord':tagWord,
      'compDates':[],
      'pLevel':1,
      'completed':0
    })
    Meteor.users.update({_id:Meteor.user()._id}, {$set:{"taskList":Meteor.user().taskList.push("taskId")}});
    // console.log(Tasks)

    return taskId;
    // console.log(Tasks);
  },


  addBuddyEmail : function(propertyText){
    console.log('Setting Buddy Email to '+ propertyText);
    Meteor.users.update({_id:Meteor.user()._id}, {$set:{"buddyEmail":propertyText}})
  },
  addYoUsername : function(propertyText){
    console.log('Setting Yo Username to '+ propertyText);
    Meteor.users.update({_id:Meteor.user()._id}, {$set:{"yoUsername":propertyText}})
  },
  addEmail : function(propertyText){
    console.log('Setting Phone Number to '+ propertyText);
    Meteor.users.update({_id:Meteor.user()._id}, {$set:{"email":propertyText}})
  },
  setcAvatar : function(propertyText){
    console.log('Setting Current Avatar to '+ propertyText);
    Meteor.users.update({_id:Meteor.user()._id}, {$set:{"cAvatar":propertyText}})
  },
  setcAttitude : function(propertyText){
    console.log('Setting Current Attitude to '+ propertyText);
    Meteor.users.update({_id:Meteor.user()._id}, {$set:{"cAttitude":propertyText}})
  },

});
}
