const request = require('supertest');
const app = require('./app');

describe('Student Task Manager API', () => {
    test('GET /health should return API status', async () => {
        const response = await request(app).get('/health');
        expect(response.statusCode).toBe(200);
        expect(response.body.status).toBe('OK');
    });

    test('GET /tasks should return task list', async () => {
        const response = await request(app).get('/tasks');
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    test('POST /tasks should create a new task', async () => {
        const response = await request(app)
            .post('/tasks')
            .send({ title: 'Complete Jenkins HD task' });

        expect(response.statusCode).toBe(201);
        expect(response.body.title).toBe('Complete Jenkins HD task');
    });

    test('POST /tasks should reject missing title', async () => {
        const response = await request(app).post('/tasks').send({});
        expect(response.statusCode).toBe(400);
        expect(response.body.error).toBe('Task title is required');
    });

    test('GET /tasks/:id should return one task', async () => {
        const response = await request(app).get('/tasks/1');
        expect(response.statusCode).toBe(200);
        expect(response.body.id).toBe(1);
    });

    test('GET /tasks/:id should return 404 if task is missing', async () => {
        const response = await request(app).get('/tasks/999');
        expect(response.statusCode).toBe(404);
        expect(response.body.error).toBe('Task not found');
    });

    test('DELETE /tasks/:id should delete a task', async () => {
        const response = await request(app).delete('/tasks/1');
        expect(response.statusCode).toBe(204);
    });

    test('DELETE /tasks/:id should return 404 if task is missing', async () => {
        const response = await request(app).delete('/tasks/999');
        expect(response.statusCode).toBe(404);
        expect(response.body.error).toBe('Task not found');
    });
});