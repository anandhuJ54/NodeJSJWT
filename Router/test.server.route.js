module.exports = function (app) {
    var testpage = require("../Controller/test.server.controller");
    
    app.get('/api/login', testpage.login); // Login to get JSON Web Token to access the routes
    app.get('/api/getData', testpage.getMethod); // Get all records.
    app.get('/api/getData/:name', testpage.getMethodById) // Get a single record.
    app.post('/api/postData', testpage.postMethod); // Insert record.
    app.post('/api/updateData', testpage.updateMethod); // Update record.
    app.delete('/api/deleteData/:name', testpage.deleteMethod); // Delete record.
 };