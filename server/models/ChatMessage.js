const mongoose = require('mongoose')
const Schema = mongoose.Schema

const chatMessageSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    message: {
        type: String
    },
    chat: {
        type: Schema.Types.ObjectId,
        ref: "Chat"
    }
})

const ChatMessage = mongoose.model('ChatMessage', chatMessageSchema)

module.exports = ChatMessage