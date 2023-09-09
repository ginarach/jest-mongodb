const request = require('supertest');
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

const app = require('../../src/app');

describe('Programmer', () => {
  let mongoServer;
  beforeAll(async () => {
    const mongod = await MongoMemoryServer.create();
    const URI = mongod.getUri();

    mongoose.connect(URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async done => {
    mongoose.disconnect(done);
    await mongoServer.stop();
  });

  afterEach(async () => {
    const collections = await mongoose.connection.db.collections();

    for (let collection of collections) {
      await collection.deleteMany();
    }
  });

  it('should be able to create a new programmer', async () => {
    const response = await request(app)
      .post('/programmers')
      .send({
        firstName: "Jane",
        lastName: "Doe",
        age: 30,
        programmingLanguages: ["JavaScript", "HTML"]
      })

    expect(response.status).toBe(200);
    const responseGet = await request(app)
      .get('/programmers');

    expect(responseGet.body.length).toBe(1);
  });

  it('should not create a programmer if it has already been existed', async () => {
    await request(app)
      .post('/programmers')
      .send({
        firstName: "Jane",
        lastName: "Doe",
        age: 30,
        programmingLanguages: ["JavaScript", "HTML"]
      })

    const response = await request(app)
      .post('/programmers')
      .send({
        firstName: "Jane",
        lastName: "Doe",
        age: 30,
        programmingLanguages: ["JavaScript", "HTML"]
      });

    expect(response.body).toMatchObject({ error: 'Duplicated programmers' });
  });

  it("should not be able to create a programmer with empty form field", async () => {
    const responseCreate = await request(app).post("/programmers").send({
        firstName: "Jane Doe",
        lastName: "",
        age: 31,
        programmingLanguages: ["JavaScript", "HTML"]
    });
    expect(responseCreate.status).toBe(500);
  });

  it('should be able to list all programmers', async () => {
    const response = await request(app)
      .get('/programmers');

    expect(response.status).toBe(200);
  });

  it('should not show programmers with non existed id', async () => {
    const response = await request(app)
      .get('/programmers/1');
    expect(response.status).toBe(500);
  });

  it('should show programmers with known id', async () => {
    const responseCreate = await request(app)
      .post('/programmers')
      .send({
        firstName: "Jane",
        lastName: "Doe",
        age: 30,
        programmingLanguages: ["JavaScript", "HTML"]
      })
    expect(responseCreate.status).toBe(200);

    const responseGet = await request(app)
      .get(`/programmers/${responseCreate.body._id}`);
    expect(responseGet.status).toBe(200);
  });

  it("should be able to update a programmer with id", async () => {
    const responseCreate = await request(app).post("/programmers").send({
        firstName: "Jennifer",
        lastName: "Doe",
        age: 31,
        programmingLanguages: ["JavaScript", "HTML", "Java", "SQL"]
    });
    expect(responseCreate.status).toBe(200);

    const responseUpdate = await request(app)
      .put(`/programmers/${responseCreate.body._id}`)
      .send({
        firstName: "Jennifer",
        lastName: "Doe",
        age: 31,
        programmingLanguages: ["JavaScript", "HTML", "Java", "SQL"]
      });
    expect(responseUpdate.status).toBe(200);

    const responseGet = await request(app)
      .get(`/programmers/${responseUpdate.body._id}`);
    expect(responseGet.body.firstName).toBe("Jennifer");
  });

  it("should not be able to update a programmer with non existed id", async () => {
    const responseUpdate = await request(app)
      .put(`/programmers/10`)
      .send({
        firstName: "Jennifer",
        lastName: "Doe",
        age: 31,
        programmingLanguages: ["JavaScript", "HTML", "Java", "SQL"]
      });
    expect(responseUpdate.status).toBe(500);
  });

  it("should be able to delete a programmer with id", async () => {
    const responseCreate = await request(app).post("/programmers").send({
        firstName: "Jennifer",
        lastName: "Doe",
        age: 31,
        programmingLanguages: ["JavaScript", "HTML", "Java", "SQL"]
    });
    expect(responseCreate.status).toBe(200);

    const responseDelete = await request(app).delete(
      `/programmers/${responseCreate.body._id}`
    );
    expect(responseDelete.status).toBe(200);

    const response = await request(app)
      .get('/programmers');

    expect(response.body.length).toBe(0);
  });

  it("should not be able to delete non existed programmer", async () => {
    const responseDelete = await request(app).delete('/programmers/10');
    expect(responseDelete.status).toBe(404);
  });
})