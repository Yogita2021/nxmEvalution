const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const blogsRoute = express.Router();
const { BlogModel } = require("../model/blog.model");

blogsRoute.get("/", async (req, res) => {
  try {
    const { title, category, limit } = req.body;
    let skip;
    if (page) {
      skip = (page - 1) * limit;
    } else {
      skip = 0;
    }
    let query = { userID: req.body.userID };
    if (title) {
      query.title = title;
    }
    if (category) {
      query.category = category;
    }
    const blog = await BlogModel.find(query).skip(skip).limit(limit);
    res.status(200).json(blog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

blogsRoute.get("/:id", async (req, res) => {
  const id = req.params;
  try {
    let data = await BlogModel.findById({ _id: id });
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
blogsRoute.post("/add", async (req, res) => {
  try {
    const blog = new BlogModel(req.body);
    await blog.save();
    res.status(200).json({ blog });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});
blogsRoute.patch("/edit/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await BlogModel.findOne({ _id: id });
    if (req.body.userID !== blog.userID) {
      res.status(200).json({ msg: "You are not authorized for this action" });
    } else {
      await BlogModel.findByIdAndUpdate({ _id: id }, req.body);
      res.status(200).json({ msg: "Data updated" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
blogsRoute.delete("/rem/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await BlogModel.findOne({ _id: id });
    if (req.body.userID !== blog.userID) {
      res.status(200).json({ msg: "You are not authorized for this action" });
    } else {
      await BlogModel.findByIdAndDelete({ _id: id });
      res.status(200).json({ msg: "Data deleted" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = { blogsRoute };
