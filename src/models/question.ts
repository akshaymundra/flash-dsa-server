import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
    question: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
        default: 'Question'
    },
    topic: {
        type: String,
        required: true,
    },
    url: {
        type: String,
    },
    level: {
        type: String,
    },
    approach: {
        type: String,
    },
    pseudo_code: {
        type: String,
    },
    stared: {
        type: Boolean,
        default: false,
    },
    priority: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        enum: ['done', 'revision', 'learn'],
        default: 'revision',
    },
});

export default mongoose.model('Question', QuestionSchema);