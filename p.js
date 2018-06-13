var phantom = require('phantom');

phantom.create().then(function(ph) {
    ph.createPage().then(function(page) {
        page.open("http://10.0.1.119:8000/dashboard").then(function(status) {
            page.render('pdf/data.pdf').then(function() {
                console.log('Page Rendered');
                ph.exit();
            });
        });
    });
});