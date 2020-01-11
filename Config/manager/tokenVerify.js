var jwt = require('jsonwebtoken');

// Verify the JSON Web Token for every router access
exports.verifyToken = (req, next) => {
    const bearerHeader = req.headers['authorization'];
    if (typeof (bearerHeader) !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        var reponse;
        jwt.verify(bearerToken, 'mysecretkey', function (err, token) {
            if (err) {
                reponse = false;
            }
            else {
                reponse = true;
            }
        });
        return reponse;
    }
    else {
        return '403';
    }
}