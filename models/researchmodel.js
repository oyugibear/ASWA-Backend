const mongoose = require('mongoose');

const researchSchema = new mongoose.Schema({
    refenence: {
        // required: true,
        type: String
    },
    title: {
        required: true,
        type: String
    },
    category: {
        required: true,
        type: String
    },
    type_of_presentation: {
        required: true,
        type: String
    },
    authors: {
        required: true,
        type: String
    },
    introduction: {
        required: true,
        type: String
    },
    methods: {
        required: true,
        type: String
    },
    results: {
        required: true,
        type: String
    },
    discussion: {
        required: true,
        type: String
    },
    keywords: {
        required: true,
        type: String
    },
    attachments: [{ url: String }],
    attendance_certificate: {
        required: true,
        type: String
    },
    summary: {
        type: String
    },
    postedBy: { type: mongoose.Types.ObjectId, ref: "User" },
    // Scoring items
    reviewed: {
        required: true,
        type: Boolean
    },
    conflict_of_intrest: {
        // required: true,
        type: Boolean
    },
    comments: {
        // required: true,
        type: String
    },
    documentUrl: {
        type: String,
        // required: true,
    },
    score: {
        // required: true,
        type: Number
    },
    
},
{
    timestamps: true,
}
)

module.exports = mongoose.model('Research', researchSchema)