Meteor.methods({
  click: function () {
    Meteor.users.update({_id: this.userId}, {$inc: {'data1': 1}});
  },
})


if (Meteor.isClient) {

  Accounts.ui.config({
    passwordSignupFields: 'USERNAME_ONLY'
  });

    Meteor.subscribe('userData');

  Template.hello.greeting = function () {
    return "Welcome to habitar.";
    
  };
Template.hello.items = function () {
  return [{name: "Banana", data1: 500}];
}

Template.hello.players = function () {
  return Meteor.users.find({}, {sort: {'username': 1}});
};

Template.hello.user = function () {
  return Meteor.user();
}




  Template.hello.events({

  'click input.code': function () {
    Meteor.call('click');
  },

      'click input.add-property' : function(event){
        event.preventDefault();
        var propertyText = document.getElementById("propertyText").value;
        Meteor.call("addProperty",propertyText,function(error , propertyId){
          console.log('added property with text of .. '+propertyText);
        });
        //document.getElementById("propertyText").value = "";
 
    },

    'click input': function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        console.log("You pressed the button");
    }


  });
}

if (Meteor.isServer) {
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


//Default Values on user creation
  Accounts.onCreateUser(function(options, user) {
    if (options.profile){// facebook login
      user.profile=options.profile;
      user.username=options.profile.name;
    }
  console.log(options);
  console.log(user);
  user.data1 = 0;
  user.data2 = 0;
  return user;
})

  Meteor.publish("userData", function () {
  return Meteor.users.find({}, {sort: {'username': 1}});
});
    Meteor.startup(function () {  // code to run on server at startup
  });

    Meteor.methods({
  addProperty : function(propertyText){
    console.log('Adding Property');
    console.log(Meteor.user());

    Meteor.users.update({_id:Meteor.user()._id}, {$set:{"property":propertyText}})
    // var propertyId= Meteor.users.insert({'property':propertyText});
    // var propertyId =  Meteor.users.insert({
    //       'property' : propertyText,
    //       // 'submittedOn': new Date(),
    //       // 'submittedBy' : Meteor.userId()
    //   });
    console.log(Meteor.user());
    // return propertyId;
  }
});
}
