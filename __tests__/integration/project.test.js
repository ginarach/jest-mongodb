const request = require('supertest');
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

const app = require('../../src/app');

describe('Project', () => {
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

  it('should be able to create a project', async () => {
    const response = await request(app)
      .post('/projects')
      .send({
        title: "Projeto Node.js IIIIIIIIIIIII",
        description: "Um projeto muito massa!"
      })

    expect(response.status).toBe(200);
    const responseGet = await request(app)
      .get('/projects');

    expect(responseGet.body.length).toBe(1);
  });

  it('should not create a project if it has already been defined', async () => {
    await request(app)
      .post('/projects')
      .send({
        title: "Projeto Node.js IIIIIIIIIIIII",
        description: "Um projeto muito massa!"
      })

    const response = await request(app)
      .post('/projects')
      .send({
        title: "Projeto Node.js IIIIIIIIIIIII",
        description: "Um projeto muito massa!"
      });

    expect(response.body).toMatchObject({ error: 'Duplicated project' });
  });

  it('should be able to list all projects', async () => {
    const response = await request(app)
      .get('/projects');

    expect(response.status).toBe(200);
  });

  it('should not show project with unknown id', async () => {
    const response = await request(app)
      .get('/projects/1');
    expect(response.status).toBe(500);
  });

  it('should show project with known id', async () => {
    const responseCreate = await request(app)
      .post('/projects')
      .send({
        title: "Projeto Node.js IIIIIIIIIIIII",
        description: "Um projeto muito massa!"
      })
    expect(responseCreate.status).toBe(200);
    const responseGet = await request(app)
      .get(`/projects/${responseCreate.body._id}`);
    expect(responseGet.status).toBe(200);
  });

  it("should be able to update a project", async () => {
    const responseCreate = await request(app).post("/projects").send({
      title: "Awesome Project",
      description: "lorem ipsum bla bla blaaaaaa",
    });
    expect(responseCreate.status).toBe(200);

    const responseUpdate = await request(app)
      .put(`/projects/${responseCreate.body._id}`)
      .send({
        title: "Updated title",
        description: "Updated description",
      });
    expect(responseUpdate.status).toBe(200);

    const responseGet = await request(app)
      .get(`/projects/${responseUpdate.body._id}`);
    expect(responseGet.body.title).toBe("Updated title");
  });

  it("should be able to delete a project", async () => {
    const responseCreate = await request(app).post("/projects").send({
      title: "Awesome Project",
      description: "lorem ipsum bla bla blaaaaaa",
    });
    expect(responseCreate.status).toBe(200);

    const responseDelete = await request(app).delete(
      `/projects/${responseCreate.body._id}`
    );
    expect(responseDelete.status).toBe(200);

    const response = await request(app)
      .get('/projects');

    expect(response.body.length).toBe(0);
  });

  it("should not be able to delete nonexistant document", async () => {
    const responseDelete = await request(app).delete('/projects/10');
    expect(responseDelete.status).toBe(404);
  });
})