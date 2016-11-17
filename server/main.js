/* jshint esversion:6 */
var express = require("express");

var app = express();

var mongoose = require("mongoose");

const PORT = process.env.port || 8000;

mongoose.connect("mongodb://localhost");

var BlogPostConstructor = require("./BlogPost.js");
var BlogPost = BlogPostConstructor(mongoose);

var DVResourceConstructor = require("./Resource.js");
var DVResource = DVResourceConstructor(mongoose);

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static('FE'));

// GET /
app.get("/", (req, res) => {
	res.sendFile(__dirname + "/FE/index.html");
});

//GET blog-editor
app.get("/blog-editor", (req, res) => {
	res.sendFile(__dirname + "/FE/blog-editor.html");
});

//GET blog-list
app.get("/blog-list", (req, res) => {
	res.sendFile(__dirname + "/FE/blog-list.html");
});

//GET resources-list
app.get("/resources-list", (req, res) => {
	res.sendFile(__dirname + "/FE/resources-list.html");
});

//GET individual Blog Post
app.get("/blog", (req, res) => {
	res.sendFile(__dirname + "/FE/blog.html");
});

//GET survivor-resources
app.get("/survivors", (req, res) => {
	res.sendFile(__dirname + "/FE/survivor-resources.html");
});

//GET the list of blogs from DB and display on blog-list.html
app.get("/api/blogs", (req, res) => {
	BlogPost.find(
		{},
		"published title summary author",
		(err, data) => {
			if(err) {
				console.log(err);
				res.status(500);
				res.send("server error");
				return;
			}
			res.send(data);
		}
	);
});

//GET the list of resources from DB and display 
app.get("/api/resources", (req, res) => {
	DVResource.find(
		{type: "video"},
		"image title summary",
		(err, data) => {
			if(err) {
				console.log(err);
				res.status(500);
				res.send("server error");
				return;
			}
			res.send(data);
		}
	);
});

//GET the specific blog post with a given ID
app.get('/blog/:id', (req, res) => {
	BlogPost.findOne (
		{_id: req.params.id},
		(err, post) => {
			if(err) {
				console.log(err);
				res.status(500);
				res.send({status: "error", message: "So sorry! Something went wrong."});
				return;
			} 
			res.send(post);
		}
	);
});

//GET the specific video resource with a given ID
app.post('/api/video-resource', (req, res) => {
	console.log(req.body);

	DVResource.findOne (
		{_id: req.body.id},
		(err, post) => {
			if(err) {
				console.log(err);
				res.status(500);
				res.send({status: "error", message: "So sorry! Something went wrong."});
				return;
			}
			console.log()
			res.send(post);
		}
	);
});


//POST /api/blog - POST new blog from the editor
app.post("/api/blog_new", (req, res) => {
	var date = new Date();
	var month = date.getUTCMonth() + 1;
	var day = date.getUTCDate();
	var year = date.getUTCFullYear();
	var newdate = month + "." + day + "." + year;
	var newBlog = new BlogPost({
		title: req.body.title,
		author: req.body.author,
		published: newdate,
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
// POST/api/resource - POST a new resource from the editor
app.post("/api/resource_new", (req, res) => {
	var newResource = new DVResource({
		title: req.body.title,
		author: req.body.author,
		date: Date.now(),
		tags: req.body.tags,
		summary: req.body.summary,
		content: req.body.content,
		type: req.body.type,
		isLink: req.body.isLink,
		url: req.body.url,
		image: req.body.image,
		user: req.body.user
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
