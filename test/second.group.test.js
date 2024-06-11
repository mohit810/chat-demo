const request = require("supertest");
const chai = require("chai");
const expect = chai.expect;
const app = require("../index");

describe("Group API Endpoints", () => {
  let token;
  let userId;
  let groupId;

  before((done) => {
    request(app)
      .post("/api/users/login")
      .send({ username: "admin", password: "password" })
      .end((err, res) => {
        if (err) return done(err);
        token = res.body.token;
        userId = res.body._id;
        done();
      });
  });

  it("should create a new group", (done) => {
    request(app)
      .post("/api/groups/create")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Test Group" })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property("_id");
        groupId = res.body._id;
        done();
      });
  });

  it("should add a member to the group", (done) => {
    request(app)
      .put("/api/groups/addMember")
      .set("Authorization", `Bearer ${token}`)
      .send({ groupId, userId: "6667e76d7f68bee860a6111b" }) // Use a valid userId from your DB
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.members[0].username).to.include("admin");
        done();
      });
  });

  it("should search groups", (done) => {
    request(app)
      .get("/api/groups/search")
      .set("Authorization", `Bearer ${token}`)
      .query({ name: "Test" })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.be.an("array");
        done();
      });
  });

  it("should delete the group", (done) => {
    request(app)
      .delete(`/api/groups/${groupId}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200, done);
  });
});
