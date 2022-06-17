const request = require("supertest");
const { createServer } = require("../utils/serverUtils");
const mongoose = require("mongoose");
const app = createServer();
const { MongoMemoryServer } = require("mongodb-memory-server");

describe("Challenge ", () => {
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

  test("should get All challenges ", async () => {
    await request(app)
      .get("/coach/challenge/all")
      .set("Authorization", "Bearer " + token)
      .expect(200)
      .then((res) => {
        expect(res.body).toBeTruthy();
      });
  });

  test("should Add a challenge", async () => {
    registerData = {
        firstname: "test",
        lastname: "test",
        email: "test2008@gmail.com",
        role: "player",
        password: "123456",
      };

      const res = await request(app)
      
        .post("/register/coach")
        .send(registerData)
        console.log("testtttttt", res.body);
    const data = {
      video_link:
        "https://www.youtube.com/watch?v=6wbnwsKrnYU&t=228s&ab_channel=TheNetNinja",
      objective: "Workout Session",
      start_date: "2022-05-28",
      final_date: "2022-05-30",
      player: res.body.coach._id,
    //   player: "6269d00af1506b433a14abbe",
    
    };
    await request(app)
      .post("/coach/challenge/create")
      .set("Authorization", "Bearer " + token)
      .send(data)
      .expect(200)
      .then(async (response) => {
        expect(response.body).toBeTruthy();
        expect(response.body.challenge.video_link).toBe(data.video_link);
        expect(response.body.challenge.objective).toBe(data.objective);
        expect(response.body.challenge.start_date).toBe(data.start_date);
        expect(response.body.challenge.final_date).toBe(data.final_date);


        savedChallenge = response.body.challenge;
      });
  });

  test("should Update a challenge", async () => {
    const data = {
      objective: "Challenge another player",
      details: "Workout arms",
    };

    await request(app)
      .put("/coach/challenge/update/" + savedChallenge._id)
      .set("Authorization", "Bearer " + token)
      .send(data)
      .expect(200)
      .then(async (response) => {
        expect(response.body).toBeTruthy();
      });
  });

  test("should get a challenge by id ", async () => {
    await request(app)
      .get("/coach/challenge/player/" + savedChallenge.player)
      .set("Authorization", "Bearer " + token)
      .expect(200)
      .then(async (response) => {
        expect(response.body).toBeTruthy();
      });
  });

  test("should Delete a challenge by id ", async () => {
    await request(app)
      .delete("/coach/challenge/delete/" + savedChallenge._id)
      .set("Authorization", "Bearer " + token)
      .expect(200)
      .then(async (response) => {
        expect(response.body).toBeTruthy();
      });
  });

  test("should not found a challenge by id ", async () => {
    await request(app)
      .get("/coach/challenge/player/123")
      .set("Authorization", "Bearer " + token)
      .expect(400)
      .then(async (response) => {
        expect(response.body.challenges).toBe(undefined);
      });
  });
});
