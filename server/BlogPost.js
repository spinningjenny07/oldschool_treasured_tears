module.exports = function(mongoose) {

	var BlogPostSchema = new mongoose.Schema({
		title: String,
		author: String,
		published: { type: Date, default: Date.now },
		tags: [String],
		summary: String,
		content: String,
		// comments: [Comment] // subdocument
	});

	var BlogPost = mongoose.model("BlogPost", BlogPostSchema);

	return BlogPost;
};
