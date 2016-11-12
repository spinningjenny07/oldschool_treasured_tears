module.exports = function(mongoose) {

	var DVResourceSchema = new mongoose.Schema({
		title: String,
		author: String,
		published: String,
		tags: [String],
		summary: String,
		content: String,
		type: String,
		isLink: Boolean,
		url: String,
		image: String,
		user: [String]
		//("churches", "story", "video, shelter", "book", "organization", "urgent")
		// comments: [Comment] // subdocument
	});

	var DVResource = mongoose.model("Resource", DVResourceSchema);

	return DVResource;
};