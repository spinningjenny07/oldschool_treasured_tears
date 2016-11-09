/* jshint esversion:6 */
var express = require("express");

var app = express();

var mongoose = require("mongoose");

const PORT = process.env.port || 8000;

mongoose.connect("mongodb://localhost");

var BlogPostConstructor = require("./BlogPost.js");
var BlogPost = BlogPostConstructor(mongoose);

var ResourceConstructor = require("./Resource.js");
var Resource = ResourceConstructor(mongoose);

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// GET /
app.get("/", (req, res) => {
	res.sendFile(__dirname + "/index.html");
});

//GET /api/blogs
app.post("/api/blog", (req, res) => {
	var newBlog = newBlogPost({
		title: req.body.title,
		author: req.body.author,
		date: Date.now,
		tags: req.body.tags,
		summary: req.body.summary,
		content: req.body.content
	});
	newBlog.save((err) => {
		if(err) {
			res.status(500);
			res.send({status: "error", message: "Server error"});
			return;
		}
		res.send(newBlog);
	});
});
