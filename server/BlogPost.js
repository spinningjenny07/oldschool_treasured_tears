module.exports = function(mongoose) {

	var BlogPostSchema = new mongoose.Schema({
		title: String,
		author: String,
		published: String,
		tags: [String],
		summary: String,
		content: String,
		// comments: [Comment] // subdocument
	});

	var BlogPost = mongoose.model("BlogPost", BlogPostSchema);

	return BlogPost;
};
