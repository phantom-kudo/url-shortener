import mongoose from "mongoose";
import shortId from 'shortid';

const shortUrlSchema = new mongoose.Schema({
    original : {
        type : String,
        required : true
    },
    short : {
        type : String,
        default : shortId.generate
    },
    clicks : {
        type : Number,
        required : true,
        default : 0
    }
});

export default mongoose.model('ShortUrl',shortUrlSchema);

