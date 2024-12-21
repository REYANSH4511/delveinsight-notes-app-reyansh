const express = require("express");
const app = express();
const userRouter = require("./users/index");
const notesRouter = require("./notes/index");
app.use("/users", userRouter);
app.use("/notes", notesRouter);

module.exports = app;
