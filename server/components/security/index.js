var jwtExpress = require('express-jwt');


var nonAuthenticablePaths = 
[
        '/',
        '/api/auth/login',
        '/api/auth/register'
];

module.exports = {

	verifyToken: 	jwtExpress({ secret: process.env.SESSION_SECRET})
					.unless({
						path: nonAuthenticablePaths 
					}),
}