const mongoose = require('mongoose');

const syposiumSchema = new mongoose.Schema({
    title: {
        required: true,
        type: String
    },
    organisers: {
        required: true,
        type: String
    },
    purpose_and_objectives: {
        required: true,
        type: String
    },
    description: {
        required: true,
        type: String
    },
    rationale_for_topic: {
        required: true,
        type: String
    },
    categories: {
        required: true,
        type: String
    },
    chair_and_coChairs: {
        required: true,
        type: String
    },
    coordinator: {
        required: true,
        type: String
    },
    format: {
        required: true,
        type: String
    },
    speakers: {
        required: true,
        type: String
    },
    number_of_attendees: {
        required: true,
        type: String
    },
    remarks_or_requests: {
        required: true,
        type: String
    },
    postedBy: { type: mongoose.Types.ObjectId, ref: "User" },
    
    // scoring 
    reviewed: {
        required: true,
        type: Boolean
    },
    score: {
        // required: true,
        type: Number
    },
    comments: {
        // required: true,
        type: String
    },


},
{timestamps: true},
)

module.exports = mongoose.model('Symposium', syposiumSchema)