// API Configuration - CHANGE THIS TO YOUR DEPLOYED URL
const API_URL = "https://your-backend-url.onrender.com"; // You'll update this later

// Load tasks on page load
document.addEventListener('DOMContentLoaded', loadTasks);

async function loadTasks() {
    try {
        const response = await fetch(`${API_URL}/api/tasks`);
        const tasks = await response.json();
        
        const taskList = document.getElementById('taskList');
        taskList.innerHTML = '';
        
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${task.text}
                <button class="delete-btn" onclick="deleteTask('${task.id}')">Delete</button>
            `;
            taskList.appendChild(li);
        });
    } catch (error) {
        console.error('Error loading tasks:', error);
    }
}

async function addTask() {
    const input = document.getElementById('taskInput');
    const text = input.value.trim();
    
    if (!text) return;
    
    try {
        const response = await fetch(`${API_URL}/api/tasks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text })
        });
        
        if (response.ok) {
            input.value = '';
            loadTasks();
            showMessage('Task added successfully!', 'success');
        }
    } catch (error) {
        console.error('Error adding task:', error);
        showMessage('Failed to add task', 'error');
    }
}

async function deleteTask(taskId) {
    try {
        const response = await fetch(`${API_URL}/api/tasks/${taskId}`, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            loadTasks();
            showMessage('Task deleted!', 'success');
        }
    } catch (error) {
        console.error('Error deleting task:', error);
        showMessage('Failed to delete task', 'error');
    }
}

async function testBackend() {
    const resultElement = document.getElementById('apiResult');
    resultElement.innerHTML = 'Testing connection...';
    
    try {
        const response = await fetch(`${API_URL}/api/status`);
        const data = await response.json();
        resultElement.innerHTML = `
            <strong>✅ Backend is running!</strong><br>
            Server: ${data.server}<br>
            Status: ${data.status}<br>
            Time: ${data.timestamp}
        `;
    } catch (error) {
        resultElement.innerHTML = `❌ Cannot connect to backend: ${error.message}`;
    }
}

function showMessage(text, type) {
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = text;
    messageDiv.className = type;
    messageDiv.style.display = 'block';
    
    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 3000);
}
