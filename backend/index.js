import express from 'express';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

app.use(express.json());


// Example route to fetch all users


app.use(express.json());

// POST route to create a new user
app.post('/users', async (req, res) => {
  const { name, email } = req.body;

  try {
    const newUser = await prisma.user.create({
      data: { name, email },
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


// get all users
app.get('/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      include: {tasks: true},
    })
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// get single user
app.get('/users/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
      include: { tasks: true },
    });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// update a user

app.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  try {
    const updatedUser = await prisma.user.update({
      where: { id: parseInt(id) },
      data: { name, email },
    });
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


// delete a user

app.delete('/users/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.user.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Crud operation for Task

// Create a task

app.post('/tasks', async (req, res) => {
  const { taskName, userId } = req.body;

  try {
    const newTask = await prisma.task.create({
      data: { taskName, userId },
    });
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// get all tasks

app.get('/tasks', async (req, res) => {
  try {
    const tasks = await prisma.task.findMany({
      include: { user: true },
    });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Read a single tasks
app.get('/tasks/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const task = await prisma.task.findUnique({
      where: { id: parseInt(id) },
      include: { user: true },
    });
    if (task) {
      res.json(task);
    } else {
      res.status(404).json({ error: 'Task not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Read all taskes which is created by a specific 

app.get('/users/:userId/tasks', async (req, res) => {
  const { userId } = req.params;

  try {
    const tasks = await prisma.task.findMany({
      where: {
        userId: parseInt(userId),
      },
    });

    if (tasks.length > 0) {
      res.json(tasks);
    } else {
      res.status(404).json({ error: 'No tasks found for this user' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching tasks: ' + error.message });
  }
});










app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
