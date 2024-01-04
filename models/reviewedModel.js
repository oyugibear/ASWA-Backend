const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    relevance: {
        required: true,
        type: String
    },
    clearObjectives: {
        required: true,
        type: String
    },
    justification: {
        required: true,
        type: String
    },
    studyDesign: {
        required: true,
        type: String
    },
    methodology: {
        required: true,
        type: String
    },
    pertinent: {
        required: true,
        type: String
    },
    dataAnalysis: {
        required: true,
        type: String
    },
    keyResults: {
        required: true,
        type: String
    },
    insights: {
        required: true,
        type: String
    },
    supportedResults: {
        required: true,
        type: String
    },
    logical: {
        required: true,
        type: String
    },
    newKnowledge: {
        required: true,
        type: String
    },
    innovative: {
        required: true,
        type: String
    },
    importance: {
        required: true,
        type: String
    },
    concise: {
        required: true,
        type: String
    },
    complete: {
        required: true,
        type: String
    },
    comments: {
        required: true,
        type: String
    },
    recommendations: {
        required: true,
        type: String
    },
    type: {
        required: true,
        type: String
    },
    score: {
        // required: true,
        type: Number
    },
    postedBy: { type: mongoose.Types.ObjectId, ref: "User" },
    research: { type: mongoose.Types.ObjectId, ref: "Research" },
    symposium: { type: mongoose.Types.ObjectId, ref: "Symposium" },
    reviewed: {
        required: true,
        type: Boolean
    },
    comments: {
        // required: true,
        type: String
    },


},
{timestamps: true},
)

module.exports = mongoose.model('Review', ReviewSchema)