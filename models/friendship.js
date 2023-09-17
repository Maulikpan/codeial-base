const mongoose = require('mongoose');
const friendshipSchema = new mongoose.Schema({
    //the user who send request
    from_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    //the user who accept this request 
    to_user:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
}, {
    timestamps: true
});
const Friendship = mongoose.model('Friendship', friendshipSchema);
module.exports = Friendship;