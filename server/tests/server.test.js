const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server'); // Adjust the path if necessary
const User = require('../models/User');
const Chat = require('../models/Chat');
const Message = require('../models/Message');

describe('API Tests', function() {
    before(function(done) {
        mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }, () => done());
    });

    after(function(done) {
        mongoose.connection.db.dropDatabase(() => {
            mongoose.connection.close(() => done());
        });
    });

    describe('Auth Routes', function() {
        it('should register a new user', function(done) {
            request(app)
                .post('/api/auth/register')
                .send({
                    username: 'testuser',
                    email: 'testuser@example.com',
                    password: 'password123'
                })
                .expect(201)
                .end((err, res) => {
                    if (err) return done(err);
                    res.body.should.have.property('token');
                    done();
                });
        });

        it('should login a user', function(done) {
            request(app)
                .post('/api/auth/login')
                .send({
                    email: 'testuser@example.com',
                    password: 'password123'
                })
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    res.body.should.have.property('token');
                    done();
                });
        });
    });

    describe('User Routes', function() {
        let token;

        before(function(done) {
            request(app)
                .post('/api/auth/login')
                .send({
                    email: 'testuser@example.com',
                    password: 'password123'
                })
                .end((err, res) => {
                    if (err) return done(err);
                    token = res.body.token;
                    done();
                });
        });

        it('should get user profile', function(done) {
            request(app)
                .get('/api/users/profile')
                .set('Authorization', `Bearer ${token}`)
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    res.body.should.have.property('email').eql('testuser@example.com');
                    done();
                });
        });
    });

    describe('Chat Routes', function() {
        let token;

        before(function(done) {
            request(app)
                .post('/api/auth/login')
                .send({
                    email: 'testuser@example.com',
                    password: 'password123'
                })
                .end((err, res) => {
                    if (err) return done(err);
                    token = res.body.token;
                    done();
                });
        });

        it('should create a new chat', function(done) {
            request(app)
                .post('/api/chat')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    userIds: []
                })
                .expect(201)
                .end((err, res) => {
                    if (err) return done(err);
                    res.body.should.have.property('users');
                    done();
                });
        });

        it('should get chats for user', function(done) {
            request(app)
                .get('/api/chat')
                .set('Authorization', `Bearer ${token}`)
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    res.body.should.be.an('array');
                    done();
                });
        });

        it('should send a message', function(done) {
            request(app)
                .post('/api/chat/message')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    chatId: 'someChatId', // Replace with an actual chat ID
                    content: 'Hello, world!'
                })
                .expect(201)
                .end((err, res) => {
                    if (err) return done(err);
                    res.body.should.have.property('content').eql('Hello, world!');
                    done();
                });
        });
    });
});
