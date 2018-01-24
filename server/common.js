//when autopublish removed
Meteor.publish('products', function () {
    return Products.find();
});

Meteor.publish('categories', function () {
    return Categories.find();
});

Meteor.startup(() => {
  // code to run on server at startup
});
