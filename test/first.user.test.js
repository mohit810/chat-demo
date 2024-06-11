const request = require("supertest");
const chai = require("chai");
const expect = chai.expect;
const app = require("../index"); // Make sure this is the correct path to your Express app

var agent = request.agent(app);

describe("User API Endpoints", () => {
  let token;
  let userId;

  it("should create a new user", (done) => {
    agent
      .post("/api/users/create")
      .send({ username: "admin", password: "password", isAdmin: true })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property("_id");
        userId = res.body._id;
        done();
      });
  });

  it("should login a user", (done) => {
    request(app)
      .post("/api/users/login")
      .send({ username: "admin", password: "password" })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property("token");
        token = res.body.token;
        done();
      });
  });

  it("should edit a user", (done) => {
    request(app)
      .put("/api/users/edit")
      .set("Authorization", `Bearer ${token}`)
      .send({ userId, username: "admin20" })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property("username").eql("adminEdited");
        done();
      });
  });

  it("should logout a user", (done) => {
    request(app)
      .post("/api/users/logout")
      .set("Authorization", `Bearer ${token}`)
      .expect(200, done);
  });
});
