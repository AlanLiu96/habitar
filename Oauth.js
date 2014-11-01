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


Template.hello.buddyEmailDefault =function(){
  return Meteor.user().buddyEmail==""; 
}


Template.hello.yoUsernameDefault =function(){
  return Meteor.user().yoUsername==""; 
}

Template.hello.phoneNumDefault =function(){
  return Meteor.user().phoneNum==""; 
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

      'click input.add-phone-num' : function(event){
        event.preventDefault();
        var propertyText = document.getElementById("phoneNum").value;
        Meteor.call("addPhoneNum",propertyText,function(error , propertyText){
          console.log('added phoneNum with text of  '+propertyText);
        });
        //document.getElementById("propertyText").value = "";
    },



    'click input': function () {//Hello World Code
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
  // console.log(options);
  // console.log(user);

  user.data1 = 0;//test valu
  user.yoUsername="";//user's username for Yo! 
  user.buddyEmail = ""; // acc. buddy email
  user.phoneNum="";// phone number
  user.cAvatar=0;// current avatar( 1 2 or 3 )
  user.wellness=50;//wellness ( from 50 to 100)
  user.pastAvatars=[];//past avatars
  user.cAttitude=0;// current attitude 
  user.avatarStage=0;// avatar's stage (from 0 to 3)
  console.log(user); // test to make sure all of that was stored
  return user;
})

  Meteor.publish("userData", function () {
  return Meteor.users.find({}, {sort: {'username': 1}});
});
    Meteor.startup(function () {  // code to run on server at startup
  });

    Meteor.methods({
  addProperty : function(propertyText){
    console.log('Setting Property to'+ propertyText);
    Meteor.users.update({_id:Meteor.user()._id}, {$set:{"property":propertyText}})
  },

  addBuddyEmail : function(propertyText){
    console.log('Setting Buddy Email to'+ propertyText);
    Meteor.users.update({_id:Meteor.user()._id}, {$set:{"buddyEmail":propertyText}})
  },
  addYoUsername : function(propertyText){
    console.log('Setting Yo Username to'+ propertyText);
    Meteor.users.update({_id:Meteor.user()._id}, {$set:{"yoUsername":propertyText}})
  },
  addPhoneNum : function(propertyText){
    console.log('Setting Phone Number to'+ propertyText);
    Meteor.users.update({_id:Meteor.user()._id}, {$set:{"phoneNum":propertyText}})
  },

});
}
