const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// In-memory database (for demo)
let tasks = [
    { id: '1', text: 'Learn Mobile Coding' },
    { id: '2', text: 'Deploy Full Stack Site' }
];

// Routes
app.get('/api/status', (req, res) => {
    res.json({
        server: 'Mobile-Created Backend',
        status: 'Online',
        timestamp: new Date().toISOString(),
        message: 'This backend was coded entirely on mobile!'
    });
});

// Get all tasks
app.get('/api/tasks', (req, res) => {
    res.json(tasks);
});

// Add new task
app.post('/api/tasks', (req, res) => {
    const { text } = req.body;
    const newTask = {
        id: Date.now().toString(),
        text
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

// Delete task
app.delete('/api/tasks/:id', (req, res) => {
    tasks = tasks.filter(task => task.id !== req.params.id);
    res.json({ message: 'Task deleted' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Mobile backend running on port ${PORT}`);
    console.log(`📱 Created entirely from smartphone!`);
});
