Template.new_review.events({
    'submit .new-review': function (event) {
        var rating = event.target.rating.value;
        var body = event.target.body.value;

        Meteor.call('addReview', this._id, rating, body);

        FlashMessages.sendSuccess('Review Added');
        var id = this._id;
        Router.go('/products/' + id);
        return false;
    }
});