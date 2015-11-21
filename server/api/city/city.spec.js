'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');
var db = require('../../database');
// describe('GET /api/cities', function() {

//   it('should respond with JSON array', function(done) {
//     request(app)
//       .get('/api/cities')
//       .expect(200)
//       .expect('Content-Type', /json/)
//       .end(function(err, res) {
//         if (err) return done(err);
//         res.body.should.be.instanceof(Array);
//         done();
//       });
//   });
// });

describe('City API test', function(){

  var city = {
    id: 2, 
    name: 'new_city',
    region_id: 2,
    admin_id: 2
  };

  var cityNoId = {
    name: 'new_city_with_no_id',
    region_id: 2,
    admin_id: 1  
  }

  var updatedCity = {
    name: 'new_name',
    region_id: 1,
    admin_id: 1
  }

  // before(function(done){
  //   db.initTableForTest("city", city, function(err){
  //     if(err) return done(err);
  
  //     done();
  //   });
  // });


  it('should return city with id: 1', function(done){
      request(app)
        .get('/api/cities/1')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res){
          if(err) return done(err);
          res.body.should.be.instanceof(Object);
          res.body.status.should.equal('ok');
          res.body.data.should.not.be.instanceof(Array);
          
          res.body.data.id.should.equal(1);          
          res.body.data.name.should.equal("test_city");
          res.body.data.region_id.should.equal(1);
          res.body.data.admin_id.should.equal(1);
          
          done();
        });
  });

  it('should create new city', function(done){
      request(app)
        .post('/api/cities')
        .send(city)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res){
          if(err) return done(err);

          res.body.status.should.equal("ok");
          done();
        })
  });

  it('should return all cities', function(done){
      request(app)
        .get('/api/cities')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res){
          
          if(err) return done(err);
          res.body.should.be.instanceof(Object);
          res.body.status.should.equal('ok');
          res.body.data.should.be.instanceof(Array);
          res.body.data.length.should.equal(2);
          done();
        });
  });

  it('should create new city and auto set its id', function(done){
      request(app)
        .post('/api/cities')
        .send(cityNoId)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res){
          if(err) return done(err);

          res.body.status.should.equal("ok");
          done();
        })
  });

  it('should update city with id = 2', function(done){
      request(app)
        .put('/api/cities/2')
        .send(updatedCity)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res){
          if(err) return done(err);

          res.body.status.should.equal("ok");
          done();
        })   
  });

  it('should delete city from database', function(done){
      request(app)
        .delete('/api/cities/2')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res){
          if(err) return done(err);

          res.body.status.should.equal("ok");
          done();
        })     
  });

  after(function(done){
    db.cleanTableForTest("city", function(err){
      if(err) return done(err);
  
      done();
    });
  });

});