import { Router } from "express";
import { addTodoCtrl, getAllTodosCtrl, updateTodoCtrl } from "../controllers/todos.controllers.js";
import validarJwt from "../middlewares/validar-jwt.js";

const todosRouter = Router();

todosRouter.get("/",validarJwt, getAllTodosCtrl);
todosRouter.post("/",validarJwt, addTodoCtrl);
todosRouter.put("/:id",validarJwt, updateTodoCtrl);



export { todosRouter };
