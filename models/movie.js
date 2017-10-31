var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var movieSchema = new Schema({
	title : {
		type: String, 
		required: true,
		validate: {
			validator : function(v){
				return /^[A-Za-z]{3,50}$/.test(v);
			},
			message: "Title should be between 3-50 characters long and include only letters"
		}}, //3-50 only letters
	rating : {type: Number, required: true},
	director : {type: String, required: true},
	actors : {type: [String], required: true},
	createdAt : {type: Date, default: Date.now}
})

movieSchema.set('toJSON', {
	transform: function(doc, ret, options){
		ret.id = ret._id;
		delete ret._id;
		delete ret.__v;
	}
});

var Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;