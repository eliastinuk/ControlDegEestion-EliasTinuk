import { database } from "../db/database.js";

export const getAllTodosCtrl = (req, res) => {
  const todos = database.todos;

  res.json({ todos });
};
