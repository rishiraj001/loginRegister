const mongoose = require('mongoose')

const imageSchema = new mongoose.Schema({
    imageTitle: {
        type: String,
    },
    image: {
        data: String
    },
    user:{
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
}, {
    timestamps: true
});

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;