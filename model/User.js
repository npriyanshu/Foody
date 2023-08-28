// const mongoose = require("mongoose");   
import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});
// model
 const User = mongoose.model("User", schema);
 export default User;


// module.exports = User;






// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true,
//     },
//     location: {
//         type: String,
//         required: true,
//     },
//     email: {
//         type: String,
//         required: true,
//     },
//     password: {
//         type: String,
//         required: true,
//     },
//     date: {
//         type: Date,
//         default: Date.now,
//     },
// });

// export const User_Model = mongoose.model("user", userSchema);
