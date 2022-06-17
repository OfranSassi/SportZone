const request = require("supertest");
const { createServer } = require("../utils/serverUtils");
const mongoose = require("mongoose");
const app = createServer();
const { MongoMemoryServer } = require("mongodb-memory-server");

describe("Events Player ", () => {
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

  test("should register a player", async () => {
    registerData = {
      firstname: "test",
      lastname: "test",
      email: "test2005@gmail.com",
      role: "player",
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

  test("should player successfully log in", async () => {
    date = {
      email: "test2005@gmail.com",
      password: "123456",
    };
    await request(app)
      .post("/login/coach")
      .send(date)
      .expect(200)
      .then((res) => {
        player = res.body.user;
        tokenPlayer = res.body.token;
        expect(res.body).toBeTruthy();
      });
  });

  test("should Add if participating or not", async () => {
    const res = await request(app)
      .post("/coach/location/create")
      .set("Authorization", "Bearer " + token)
      .send({
        name: "Manouba",
        city: "test",
        country: "TUnisia",
        address: "bla bla",
      });

    const event = {
      label: "friendly match",
      start_date: "2022-05-28",
      final_date: "2022-05-30",
      state: "Private",
      details: "Friendly Match taking place in Bardo",
      location: res.body.location._id,
      player: player._id,
    };
    const response = await request(app)
      .post("/coach/events/create")
      .set("Authorization", "Bearer " + token)
      .send(event);
    console.log("testttttttttt", tokenPlayer);
    const data = {
        participating: "ACCEPTED"
    };
    await request(app)
      .post("/player/events/participating/" + response.body.events._id)
      .set("Authorization", "Bearer " + tokenPlayer)
      .send(data)
      .expect(200)
      .then(async (response) => {
          console.log("response", response.body);
        expect(response.body).toBeTruthy();
        expect(response.body.eventsplayer.participating).toBe(data.participating);
      });
  });

  //   test("should get a event by id ", async () => {
  //     await request(app)
  //       .get("/coach/events/" + savedEvent._id)
  //       .set("Authorization", "Bearer " + token)
  //       .expect(200)
  //       .then(async (response) => {
  //         expect(response.body).toBeTruthy();
  //       });
  //   });

  //   test("should delete a event by id ", async () => {
  //     await request(app)
  //       .delete("/coach/events/delete/" + savedEvent._id)
  //       .set("Authorization", "Bearer " + token)
  //       .expect(200)
  //       .then(async (response) => {
  //         expect(response.body).toBeTruthy();
  //       });
  //   });

  //   test("should not found a event by id ", async () => {
  //     await request(app)
  //       .get("/coach/events/" + savedEvent._id)
  //       .set("Authorization", "Bearer " + token)
  //       .expect(200)
  //       .then(async (response) => {
  //         expect(response.body.events).toBe(null);
  //       });
  //   });
});
