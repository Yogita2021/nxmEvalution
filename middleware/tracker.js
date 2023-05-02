const fs = require("fs");
const express = require("express");
const morgan = require("morgan");
const tracker = (req, res, next) => {
  const { method, url } = req.body;
  const line = `Method:${method},Route:${url},${Date()}\n`;
  fs.appendFileSync("logs.txt", line);
  next();
};
module.exports = { tracker };
