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

    Template.actions.preserve(".like");

}

if (Meteor.isServer) {
    Meteor.methods({
        likePost: function(options) {
            Posts.update({_id: options.post._id},{$push: {likes:1}});
        }
    });
}
