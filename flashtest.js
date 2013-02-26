Posts = new Meteor.Collection("posts");

if (Meteor.isClient) {
    Template.actions.likecount = function() {
        return this.likes.length;
    }

    Template.posts.posts = function() {
        return Posts.find({});
    }

    Template.actions.events = {
        'click .like' : function(event, template) {
            Meteor.call('likePost',{post:this});
            return false;
        }
    };

    Template.actions.preserve([".like"]);
    Template.header.preserve([".header"]);
    Template.nav.events({
        "click a" : function(e) { 
            template = $(e.currentTarget).attr('href');       // get the template name to load
            $("body").html(Meteor.render(Template[template]));    // load the named template
            Meteor.flush();
            return false;
        }
    });
}

if (Meteor.isServer) {
    Meteor.methods({
        likePost: function(options) {
            Posts.update({_id: options.post._id},{$push: {likes:1}});
        }
    });
}
