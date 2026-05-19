const express = require('express');

const app = express();
app.use(express.json());

let tasks = [
    { id: 1, title: 'Prepare Jenkins pipeline', completed: false },
    { id: 2, title: 'Run automated tests', completed: false }
];

app.get('/', (req, res) => {
    res.send('Student Task Manager API is running');
});

app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        service: 'Student Task Manager API'
    });
});

app.get('/tasks', (req, res) => {
    res.status(200).json(tasks);
});

app.post('/tasks', (req, res) => {
    const { title } = req.body;

    if (!title) {
        return res.status(400).json({ error: 'Task title is required' });
    }

    const newTask = {
        id: tasks.length + 1,
        title,
        completed: false
    };

    tasks.push(newTask);
    return res.status(201).json(newTask);
});

app.get('/tasks/:id', (req, res) => {
    const task = tasks.find(item => item.id === Number(req.params.id));

    if (!task) {
        return res.status(404).json({ error: 'Task not found' });
    }

    return res.status(200).json(task);
});

app.delete('/tasks/:id', (req, res) => {
    const taskIndex = tasks.findIndex(item => item.id === Number(req.params.id));

    if (taskIndex === -1) {
        return res.status(404).json({ error: 'Task not found' });
    }

    tasks.splice(taskIndex, 1);
    return res.status(204).send();
});

module.exports = app;