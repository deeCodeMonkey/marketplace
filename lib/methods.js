Meteor.methods({
    addProduct: function (file, name, category, description, is_featured) {
        if (file) {
            //fs code
            fsFile = new FS.File(file);
            //insert into product images
            ProductsImages.insert(fsFile, function (err, result) {
                if (!err) {
                    var productImage = '/cfs/files/ProductsImages/' + result._id;
                    Products.insert({
                        name,
                        category,
                        description,
                        is_featured,
                        image: productImage,
                        createdAt: new Date()
                    });
                }
            });
        } else {
            var productImage = '/img/noimage.png';
            Products.insert({
                name,
                category,
                description,
                is_featured,
                image: productImage,
                createdAt: new Date()
            });
        }
    },

    addReview: function (id, rating, body) {
        Products.update({
            _id: id
        }, {
                $push: {
                    reviews: {
                        rating: rating,
                        body: body,
                        review_date: new Date()
                    }
                }
            });
    }
});