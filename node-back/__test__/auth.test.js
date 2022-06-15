const request = require("supertest");
const { createServer } = require("../utils/serverUtils");
const mongoose = require("mongoose");
const app = createServer();
const { MongoMemoryServer } = require("mongodb-memory-server");


describe("Auth", () => {
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
      email: "test@gmail.com",
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

  test("should not  cas email et mot de passe est invalide ", async () => {
    date = {
      email: "test2025@gmail.com",
      password: "987456"
    };
    await request(app)
      .post("/login/coach")
      .send(date)
      .expect(400)
      .then((res) => {
        expect(res.body).toBeTruthy();
        expect(res.body.msg).toBe("L'email ou le mot de passe est invalide !")
        
      });
  });

  test("should not le mot de passe est incorrect ", async () => {
    date = {
      email: "test@gmail.com",
      password: "987456"
    };
    await request(app)
      .post("/login/coach")
      .send(date)
      .expect(400)
      .then((res) => {
        expect(res.body).toBeTruthy();
        expect(res.body.msg).toBe("Le mot de passe est incorrect")
        
      });
  });

  test("should successfully logedin", async () => {
    date = {
      email: "test@gmail.com",
      password: "123456"
    };
    await request(app)
      .post("/login/coach")
      .send(date)
      .expect(200)
      .then((res) => {
        coach = res.body.user;
        token = res.body.token ;
        expect(res.body).toBeTruthy();
        
      });
  });
  
})