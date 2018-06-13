var phantom = require('phantom');
module.exports = function(router) {
    router.get('/barangay/data/:id', function(req, res) {
        phantom.create().then(function(ph) {
            ph.createPage().then(function(page) {
                page.open("http://localhost:8080").then(function(status) {
                    page.render('pdf/data.pdf').then(function() {
                        console.log('Page Rendered');
                        ph.exit();
                    });
                });
            });
        });
        res.send('hello tonio!');
    });
    return router;
}