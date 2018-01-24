Template.add_product.events({
    //action and element
    'submit .add_product': function (event) {
        //console.log('form submitted');
        //catch values
        var name = event.target.name.value;
        //console.log(name);
        var category = event.target.category.value;
        var description = event.target.description.value;
        var is_featured = event.target.is_featured.value;
        
        //get file uploaded, jquery
        var file = $('#productImage').get(0).files[0];

        //Meteor.call('addProduct', file, name, category, description, is_featured);

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

        event.target.name.value = '';
        event.target.category.value = '';
        event.target.description.value = '';
        event.target.is_featured.value = '';
        
        FlashMessages.sendSuccess('Product Added');
        
        Router.go('/');

        return false;
    }
});