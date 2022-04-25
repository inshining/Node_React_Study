const mongoose = require("mongoose");
const userConfig = require('../config/userConfig.json')

async function main(){
    const uri = `mongodb+srv://inshining:${userConfig.password}@firstmap.70zrj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
    await mongoose.connect(uri);
}

const locationSchema = New mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    address : {
        type: String,
        required: true,
    },
    lat : { type : Number, required : true},
    lng : { type : Number, required : true},
});

module.exports = mongoose.model("location", locationSchema)