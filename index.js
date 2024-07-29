const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, 'static')));
let Todo = require('./static/JS/script');
app.use(express.urlencoded({ extended: true }));



app.get('/todos', async (req, res) => {
  const todos = await Todo.read();
  res.send(todos);
});

// ADD  new todo by post
app.post('/todos', async (req, res) => {
  const { text } = req.body;
  const todos = await Todo.read();

  const newTodo = {
    id: todos.length + 1,
    text,
  };

  todos.push(newTodo);
  await Todo.write(todos);

  res.send(newTodo);
});

// UPDATE by ID
app.put('/todos/:id', async (req, res) => {
  const todoId = parseInt(req.params.id);
  const updatedText = req.body.text;

  let todos = await Todo.read();
  todos = todos.map((todo) => (todo.id === todoId ? { ...todo, text: updatedText } : todo));

  await Todo.write(todos);
  res.send({message:'Todo updated hogaya' });
});

// DELETE todo by ID
app.delete('/todos/:id', async (req, res) => {
  const todoId = parseInt(req.params.id);

  let todos = await Todo.read();
  todos = todos.filter((todo) => todo.id !== todoId);

  await Todo.write(todos);
  res.send({ message:'Todo deleted hogaya' });
});


app.listen(3000, () => {
  console.log('Server is running on 3000');
});