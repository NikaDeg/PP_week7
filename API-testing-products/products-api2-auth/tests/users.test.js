const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const connectDB = require('../config/db');
const User = require('../models/userModel');

const api = supertest(app);

const validUser = {
  name: "Jane Air",
  email: "jane.air@gmail.com",
  password: "jane",
  phone_number: "+358409934567",
  gender: "female",
  date_of_birth: "1995-06-15",
  membership_status: "active",
};

beforeAll(async () => {
  await connectDB();
});

beforeEach(async () => {
  await User.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
});

//POST SIGNUP

describe("POST /api/users/signup", ()=> {
    it("when the payload is valid,should return status 201 and an email and token", async ()=>{
        const response = await api
            .post("/api/users/signup")
            .send(validUser)
            .expect(201)
            .expect("Content-Type", /application\/json/)

        expect(response.body).toHaveProperty('token');    
        expect(response.body.email).toBe(validUser.email);

    });
    it(" when the payload is valid, should persist the user in the database", async ()=>{
        await api.post("/api/users/signup").send(validUser).expect(201);

        const savedUser = await User.findOne({ email: validUser.email });
        expect(savedUser.name).toBe(validUser.name);
    });

    it("when the payload is invalid, should return status 400 when required fields are missing", async ()=>{
        const response = await api
            .post("/api/users/signup")
            .send({email: "notreal@gmail.co"})
            .expect(400)
        expect(response.body).toHaveProperty("error");    
    });


    it(" when the payload is invalid, should not persist a user in the database", async ()=>{
        await api
            .post("/api/users/signup")
            .send({email: "notreal@gmail.co"})
            .expect(400)

        const noUser = await User.find({});
        expect(noUser).toHaveLength(0);   

    });
    it("when the email is already registered, should return status 400", async ()=>{
        await api.post("/api/users/signup").send(validUser).expect(201);

        const response = await api
            .post("/api/users/signup")
            .send({ ...validUser, name: "Different" })
            .expect(400);

        expect(response.body).toHaveProperty("error");

    });
})
