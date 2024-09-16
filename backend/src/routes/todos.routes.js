import { Router } from "express";
import { getAllTodosCtrl } from "../controllers/todos.controllers.js";

const todosRouter = Router();

todosRouter.get("/", getAllTodosCtrl);

export { todosRouter };
