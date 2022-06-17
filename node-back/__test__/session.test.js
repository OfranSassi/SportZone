const request = require("supertest");
const { createServer } = require("../utils/serverUtils");
const mongoose = require("mongoose");
const app = createServer();
const { MongoMemoryServer } = require("mongodb-memory-server");

describe("Session ", () => {
  jest.setTimeout(10000);
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  }),
    afterAll(async () => {
      await mongoose.disconnect();
      await mongoose.connection.close();
    });

  test("should successfully register", async () => {
    registerData = {
      firstname: "test",
      lastname: "test",
      email: "test2004@gmail.com",
      role: "coach",
      password: "123456",
    };
    await request(app)
      .post("/register/coach")
      .send(registerData)
      .expect(200)
      .then((res) => {
        NewCoach = res.body.coach;
        expect(res.body).toBeTruthy();
      });
  });

  test("should successfully log in", async () => {
    date = {
      email: "test2004@gmail.com",
      password: "123456",
    };
    await request(app)
      .post("/login/coach")
      .send(date)
      .expect(200)
      .then((res) => {
        coach = res.body.user;
        token = res.body.token;
        expect(res.body).toBeTruthy();
      });
  });

  test("should get All sessions ", async () => {
    await request(app)
      .get("/coach/session/all")
      .set("Authorization", "Bearer " + token)
      .expect(200)
      .then((res) => {
        expect(res.body).toBeTruthy();
      });
  });

  test("should Add a session", async () => {
    const res = await request(app)
      .post("/coach/location/create")
      .set("Authorization", "Bearer " + token)
      .send({
        name: "Manouba",
        city: "test",
        country: "Tunisia",
        address: "bla bla",
      });

    const data = {
      title: "new session	",
      date: "2022-06-16 08:23",
      target: "Make 100 m in 20 min",
      objective: "new session Objective",
      location: res.body.location._id,
      player: "6269d00af1506b433a14abbe",
    };
    await request(app)
      .post("/coach/session/create")
      .set("Authorization", "Bearer " + token)
      .send(data)
      .expect(200)
      .then(async (response) => {
        expect(response.body).toBeTruthy();
        expect(response.body.session.title).toBe(data.title);
        expect(response.body.session.date).toBe(data.date);
        expect(response.body.session.target).toBe(data.target);
        expect(response.body.session.objective).toBe(data.objective);
        expect(response.body.session.location._id).toBe(data.location);

        savedSession = response.body.session;
      });
      
  });

  test("should Update a session", async () => {
    const data = {
      title: "new session 123	",
      objective: "new session Objective 123",
      target: "Make 500 m in 1 hr",
      location: savedSession.location,
    };
    console.log("test ......", savedSession._id);
    console.log("test 2 ......", savedSession);
    await request(app)
      .put("/coach/session/update/" + savedSession._id)
      .set("Authorization", "Bearer " + token)
      .send(data)
      .expect(200)
      .then(async (response) => {
        expect(response.body).toBeTruthy();
      });
  });

  test("should get a session by id ", async () => {
    await request(app)
      .get("/coach/session/" + savedSession._id)
      .set("Authorization", "Bearer " + token)
      .expect(200)
      .then(async (response) => {
        expect(response.body).toBeTruthy();
      });
  });

  test("should delete a session by id ", async () => {
    await request(app)
      .delete("/coach/session/delete/" + savedSession._id)
      .set("Authorization", "Bearer " + token)
      .expect(200)
      .then(async (response) => {
        expect(response.body).toBeTruthy();
      });
  });

  test("should not found a session by id ", async () => {
    await request(app)
      .get("/coach/session/" + savedSession._id)
      .set("Authorization", "Bearer " + token)
      .expect(200)
      .then(async (response) => {
        expect(response.body.session).toBe(null);
      });
  });

  test("should get error when deleting a session  ", async () => {
    await request(app)
      .delete("/coach/session/delete/123"  )
      .set("Authorization", "Bearer " + token)
      .expect(400)
      .then(async (response) => {
        expect(response.body).toBeTruthy();
      });
  });

});
