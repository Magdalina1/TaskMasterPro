const request = require('supertest');
const { expect } = require('chai');
const app = require('../app'); // Import the Express app

describe('Tasks API', function () {
    let taskId;

    // Test the POST /tasks endpoint
    it('should create a new task', async function () {
        const response = await request(app)
            .post('/tasks')
            .send({ name: 'Test Task', completed: false });
        expect(response.status).to.equal(201);
        expect(response.body).to.have.property('_id');
        taskId = response.body._id;
        expect(response.body).to.include({ name: 'Test Task', completed: false });
    });

    // Test the GET /tasks endpoint
    it('should get all tasks', async function () {
        const response = await request(app)
            .get('/tasks');
        expect(response.status).to.equal(200);
        expect(response.body).to.be.an('array');
    });

    // Test the GET /tasks/:id endpoint
    it('should get a task by ID', async function () {
        const response = await request(app)
            .get(`/tasks/${taskId}`);
        expect(response.status).to.equal(200);
        expect(response.body).to.include({ name: 'Test Task', completed: false });
    });

    // Test the PUT /tasks/:id endpoint
    it('should update a task', async function () {
        const response = await request(app)
            .put(`/tasks/${taskId}`)
            .send({ name: 'Updated Task', completed: true });
        expect(response.status).to.equal(200);
        expect(response.body).to.include({ name: 'Updated Task', completed: true });
    });

    // Test the DELETE /tasks/:id endpoint
    it('should delete a task', async function () {
        const response = await request(app)
            .delete(`/tasks/${taskId}`);
        expect(response.status).to.equal(204);
    });

    // Test getting the deleted task
    it('should not find a deleted task', async function () {
        const response = await request(app)
            .get(`/tasks/${taskId}`);
        expect(response.status).to.equal(404);
    });
});
