'use strict';

// Development specific configuration
// ==================================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/portal-dev'
  },

  seedDB: true,

  sql: {
    host:     'localhost',
    database: 'portal_spolecznosciowy',
    user:     'user',
    password: ''
  }

};
