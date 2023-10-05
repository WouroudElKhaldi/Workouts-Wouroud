const mongoose = require('mongoose')

const schema = new mongoose.Schema ({
    title :{
        type : String , 
        required : true 
    }, 
    reps: {
        type: Number, 
        required : true,
    }, 
    load : {
        type : Number,
        required : true
    }
}, {
    timestamps: true // when the doc is created or modified 
})

module.exports = mongoose.model('workout', schema)