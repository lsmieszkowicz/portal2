'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');
var db = require('../../database');

describe('Post API test', function(){

  var post = {
    id: 2,
    content: 'new awsome content',
    author: 2,
    investment_id: 2
  };

  var updatedPost = {
    content: 'updated content',
    author: 1,
    investment_id: 3
  };

  it('should return post with id: 1', function(done){
      request(app)
        .get('/api/posts/1')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res){
          if(err) return done(err);
          res.body.should.be.instanceof(Object);
          res.body.status.should.equal('ok');
          res.body.data.should.not.be.instanceof(Array);
          
          res.body.data.id.should.equal(1);          
          res.body.data.content.should.equal("test_post_content");
          res.body.data.author.should.equal(1);
          res.body.data.investment_id.should.equal(1);
          
          done();
        });
  });

  it('should create new post', function(done){
      request(app)
        .post('/api/posts')
        .send(post)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res){
          if(err) return done(err);

          res.body.status.should.equal("ok");
          done();
        })
  });

  it('should return all posts', function(done){
      request(app)
        .get('/api/posts')
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

  it('should update post with id = 2', function(done){
      request(app)
        .put('/api/posts/2')
        .send(updatedPost)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res){
          if(err) return done(err);

          res.body.status.should.equal("ok");
          done();
        })   
  });

  it('should delete post from database', function(done){
      request(app)
        .delete('/api/posts/2')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res){
          if(err) return done(err);

          res.body.status.should.equal("ok");
          done();
        })     
  });

  after(function(done){
    db.cleanTableForTest("post", function(err){
      if(err) return done(err);
  
      done();
    });
  });

});