const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const meetupsSchema = new Schema({
  title: { type: String, required: [true, "Please provide the title"] },
  address: { type: String, required: [true, "Please provide the address"] },
  description: {
    type: String,
    required: [true, "Please provide the description"],
  },
  image: { type: String, required: [true, "Please provide the image"] },
});

const Meetups =
  mongoose.models.Meetup || mongoose.model("Meetup", meetupsSchema);

module.exports = Meetups;
