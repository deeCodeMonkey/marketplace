Router.configure({
    layoutTemplate: 'layout'
});

//happen before router loads
//restrict access to users not logged in
var OnBeforeActions = {
    loginRequired: function () {
        if (!Meteor.userId()) {
            Router.go('/');
        } else {
            //means continue
            this.next();
        }
    }
}

Router.onBeforeAction(OnBeforeActions.loginRequired, {
    //list of pages can see once logged in
    only: ['add_product', 'new_review']
});

Router.map(function () {
    this.route('home', {
        path: '/',
        template: 'home',
        data: function () {
            templateData = {
                products: Products.find({ is_featured: '1' })
            }
            return templateData;
        }
    });

    this.route('products', {
        path: '/products',
        template: 'products',
        //fetch data from db
        data: function () {
            templateData = {
                products: Products.find()
            }
            return templateData;
        }
    });

    this.route('add_product', {
        path: '/add_product',
        template: 'add_product',
        //fetch data from db
        data: function () {
            templateData = {
                categories: Categories.find()
            }
            return templateData;
        }
    });

    this.route('category_products', {
        path: '/categories/:slug',
        template: 'category_products',
        //get all products with category :slug
        data: function () {
            templateData = {
                category_products: Products.find({
                    category: this.params.slug
                })
            };
            return templateData;
        }
    });

    this.route('new_review', {
        path: '/new-review/:_id',
        template: 'new_review',
        data: function () {
            return Products.findOne(this.params._id);
        }
    });

    this.route('product', {
        path: '/products/:_id',
        template: 'product',
        data: function () {
            return Products.findOne(this.params._id);
        }
    });


});