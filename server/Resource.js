module.exports = function(mongoose) {

	var DVResourceSchema = new mongoose.Schema({
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

	var DVResource = mongoose.model("Resource", ResourceSchema);

	return DVResource;
};