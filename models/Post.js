const mongoose = require('mongoose');

const postschema = mongoose.Schema(
    {
        'email' : {type: String, required: true},
        'description' : {type: String, required: true},
        'url' : {type: String, required: true}
    }
)

module.exports = mongoose.model('postschema', postschema);