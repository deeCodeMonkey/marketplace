//admin enter through console
Categories = new Mongo.Collection('categories');

Products = new Mongo.Collection('products');

ProductsImages = new FS.Collection('ProductsImages', {
    stores: [new FS.Store.GridFS('ProductsImages')]
});