module.exports = function(mongoose) {

	var ResourceSchema = new mongoose.Schema({
		title: String,
		author: String,
		published: { type: Date, default: Date.now },
		tags: [String],
		summary: String,
		content: String,
		type: String 
		//("link", "story", "media")
		// comments: [Comment] // subdocument
	});

	var Resource = mongoose.model("Resource", ResourceSchema);

	return Resource;
};