const { Router } = require("express");
const ProjectController = require("./app/controllers/ProjectController");
const ProgrammersController = require("./app/controllers/ProgrammersController");

const routes = Router();

// project end point
routes.get("/projects", ProjectController.index);
routes.get("/projects-sorted", ProjectController.indexSorted);
routes.get("/projects/:id", ProjectController.show);
routes.post("/projects", ProjectController.store);
routes.put("/projects/:id", ProjectController.update);
routes.delete("/projects/:id", ProjectController.destroy);

// programmers end point
routes.get("/programmers", ProgrammersController.index);
routes.get("/programmers/:id", ProgrammersController.show);
routes.post("/programmers", ProgrammersController.store);
routes.put("/programmers/:id", ProgrammersController.update);
routes.delete("/programmers/:id", ProgrammersController.destroy);

module.exports = routes;
