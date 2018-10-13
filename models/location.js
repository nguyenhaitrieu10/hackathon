var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var locationSchema = new Schema({
	lat: {type: String},
	lng: {type: String},
}, 
{
	timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('Location',locationSchema);
