var db = require('../db');

module.exports.index = function (req, res) {
    var page = parseInt(req.query.page) || 1;
    var perPage = 8;
    // var start = (page - 1) * perPage;
    // var end = page * perPage;
    var drop = (page - 1) * perPage
    const link = [];
    if (page == 1) {
        for (let index = 1; index <= 3; index++) {
            link.push("http://localhost:3000/products?page=" + index);
        }
    } else {
        for (let index = page - 1; index <= page + 1; index++) {
            link.push("http://localhost:3000/products?page=" + index);
        };
    }
    res.render('products/index', {
        products: db.get('products').drop(drop).take(perPage).value(),
        page: link
    });
};
