const request = require("supertest");
const { createServer } = require("../utils/serverUtils");
const mongoose = require("mongoose");
const app = createServer();
const { MongoMemoryServer } = require("mongodb-memory-server");


describe("Events ", () => {

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

  test("should successfully logedin", async () => {
    date = {
      email: "test2004@gmail.com",
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

  test("should get All events ", async () => {
   
    await request(app)
      .get("/coach/events/all")
      .set('Authorization', "Bearer "+token )
      .expect(200)
      .then((res) => {
        expect(res.body).toBeTruthy();
        
      });
  });

  test("should add a event", async () => {
  
    const data = {
      label: "friendly match",
      start_date: "2022-05-28",
      final_date: "2022-05-30",
      state: "Private",
      details: "Friendly Match taking place in Bardo",
      location: "627b7d6c40382fe35b11c96a",
      player: "6269d00af1506b433a14abbe"
     
    };
    await request(app)
      .post("/coach/events/create")
      .set('Authorization', "Bearer "+token )
      .send(data)
      .expect(200)
      .then(async (response) => {
        expect(response.body).toBeTruthy();
        expect(response.body.event.label).toBe(data.label);
        expect(response.body.event.state).toBe(data.state);
        expect(response.body.event.details).toBe(data.details);
   
        savedEvent = response.body.event;
      });
  });

  test("should update a event", async () => {
  
    const data = {
      label: "new friendly match",
      state: "Private",
      details: "Friendly Match taking place in Manouba",
  
    };
    await request(app)
      .put("/coach/events/update/"+savedEvent._id)
      .set('Authorization', "Bearer "+token )
      .send(data)
      .expect(200)
      .then(async (response) => {
        expect(response.body).toBeTruthy();
      });
  });


  test("should get a event by id ", async () => {
  
    await request(app)
      .get("/coach/events/"+savedEvent._id)
      .set('Authorization', "Bearer "+token )
      .expect(200)
      .then(async (response) => {
        expect(response.body).toBeTruthy();
      });
  });

  test("should delete a event by id ", async () => {
  
    await request(app)
      .delete("/coach/events/delete/"+savedEvent._id)
      .set('Authorization', "Bearer "+token )
      .expect(200)
      .then(async (response) => {
        expect(response.body).toBeTruthy();
      });
  });

  test("should not found a event by id ", async () => {
  
    await request(app)
      .get("/coach/events/"+savedEvent._id)
      .set('Authorization', "Bearer "+token )
      .expect(200)
      .then(async (response) => {
        expect(response.body.events).toBe(null);
      });
  });
  
})