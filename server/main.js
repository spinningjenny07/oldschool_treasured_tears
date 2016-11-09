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
			res.send({status: "error", message: "So sorry! Something went wrong."});
			return;
		}
		res.send(newBlog);
	});
});

app.post("/api/resource", (req, res) => {
	var newResource = newDVResource({
		title: req.body.title,
		author: req.body.author,
		date: Date.now,
		tags: req.body.tags,
		summary: req.body.summary,
		content: req.body.content,
		type: req.body.content
	});
	newResource.save((err) => {
		if(err) {
			res.status(500);
			res.send({status: "error", message: "So sorry! Something went wrong."});
			return;
		}
		res.send(newResource);
	});
});

app.use((req, res, next) => {
	res.status(404);
	res.send("File not found.");
});

app.use((req, res, next) => {
	res.status(500);
	res.send("500 error. Sorry, something went wrong.");
});

app.listen(PORT, () => {
	console.log("Listening on Port: " + PORT);
});
