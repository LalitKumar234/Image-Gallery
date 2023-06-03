const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fileSchema = new Schema({
    imageUrl: {
        type: String,
        required: true,
    },
    name:{
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    createdAt: { type: Date, default: Date.now },
})

const Files = mongoose.model('Files', fileSchema);
module.exports = Files;