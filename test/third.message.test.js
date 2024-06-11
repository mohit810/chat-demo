const request = require("supertest");
const chai = require("chai");
const expect = chai.expect;
const app = require("../index");

describe("Message API Endpoints", () => {
  let token;
  let userId;
  let groupId;
  let messageId;

  before((done) => {
    request(app)
      .post("/api/users/login")
      .send({ username: "admin", password: "password" })
      .end((err, res) => {
        if (err) return done(err);
        token = res.body.token;
        userId = res.body._id;
        request(app)
          .post("/api/groups/create")
          .set("Authorization", `Bearer ${token}`)
          .send({ name: "Test Group" })
          .end((err, res) => {
            if (err) return done(err);
            groupId = res.body._id;
            done();
          });
      });
  });

  it("should send a message in group", (done) => {
    request(app)
      .post("/api/messages/send")
      .set("Authorization", `Bearer ${token}`)
      .send({ groupId, content: "Hello, group!" })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property("_id");
        messageId = res.body._id;
        done();
      });
  });

  it("should like a message", (done) => {
    request(app)
      .put(`/api/messages/like/${messageId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ likes: 1 })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property("likes").eql(1);
        expect(res.body.likedBy).to.include(userId);
        done();
      });
  });
});
