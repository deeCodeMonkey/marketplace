//admin enter through console
Categories = new Mongo.Collection('categories');

Products = new Mongo.Collection('products');

ProductsImages = new FS.Collection('ProductsImages', {
    stores: [new FS.Store.GridFS('ProductsImages')]
});

//to show images when insecure removed
ProductsImages.allow({
    insert: function (fileId, doc) {
        return true;
    },
    //to view
    download: function (fileId, doc) {
        return true;
    }
});