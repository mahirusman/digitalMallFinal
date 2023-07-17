const mongoose = require("mongoose");

const schema = mongoose.Schema;

const postModel = mongoose.model("posts", {});

module.exports = postModel;
