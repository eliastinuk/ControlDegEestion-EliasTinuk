import { database } from "../db/database.js";

// Obtener todas las tareas
export const getAllTodosCtrl = (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "No autenticado" });
  }

  const todos = database.todos.filter((todo) => todo.owner === req.user.id);

  res.json({ todos });
};

// Agregar una nueva tarea
export const addTodoCtrl = (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "No autenticado" });
  }

  const { title, completed } = req.body;
  const newTodo = {
    id: database.todos.length + 1,
    title,
    completed: completed || false,
    owner: req.user.id,
  };

  database.todos.push(newTodo);

  res.status(201).json({ message: "Tarea agregada", todo: newTodo });
};

// Actualizar una tarea existente
export const updateTodoCtrl = (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "No autenticado" });
  }

  const { id } = req.params;
  const { title, completed } = req.body;

  const todo = database.todos.find((todo) => todo.id === parseInt(id) && todo.owner === req.user.id);

  if (!todo) {
    return res.status(404).json({ message: "Tarea no encontrada" });
  }

  todo.title = title !== undefined ? title : todo.title;
  // Validaciones
  if (title !== undefined && title.trim() === "") {
    return res.status(400).json({ message: "El título no puede estar en blanco" });
  }
  
  todo.title = title !== undefined ? title.trim() : todo.title;
  todo.completed = completed !== undefined ? completed : todo.completed;

  res.json({ message: "Tarea actualizada", todo });
};

