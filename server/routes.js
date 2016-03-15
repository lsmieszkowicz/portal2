/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');
var path = require('path');

module.exports = function(app) {

  // Insert routes below
  app.use('/api/investment_update', require('./api/investment_update'));
  app.use('/api/city_update', require('./api/city_update'));
  app.use('/api/follow_city', require('./api/follow_city'));
  app.use('/api/images', require('./api/image'));
  app.use('/api/auth', require('./api/auth'));
  app.use('/api/regions', require('./api/region'));
  app.use('/api/follow', require('./api/follow'));
  app.use('/api/users', require('./api/user'));
  app.use('/api/cities', require('./api/city'));
  app.use('/api/posts', require('./api/post'));
  app.use('/api/investments', require('./api/investment'));
  app.use('/api/things', require('./api/thing'));
  
  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    });
};
