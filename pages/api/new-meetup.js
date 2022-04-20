const mongoose = require("mongoose");
const Meetups = require("../../models/meetups");

// import { MongoClient } from "mongodb";

const handler = async (req, res) => {
  console.log(req.method);

  if (req.method === "POST") {
    mongoose
      .connect(
        "mongodb+srv://SaiTeja:Ashkechum1224@cluster0.bwyer.mongodb.net/myMeetups?retryWrites=true&w=majority"
      )
      .then(() => {
        console.log("connected to DB");
      })
      .catch(() => {
        console.log("Failed to connect to DB");
      });

    const meetup = await new Meetups(req.body);

    await meetup.save();

    await mongoose.disconnect();

    console.log(meetup);

    res.status(201).json({ message: "Successfulfy Inserted meetups" });
  }
};
export default handler;

// mongodb+srv://SaiTeja:Ashkechum1224@cluster0.bwyer.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

//     const data = req.body;

//     const client = await MongoClient.connect(
//       "mongodb+srv://SaiTeja:Ashkechum1224@cluster0.bwyer.mongodb.net/myMeetups?retryWrites=true&w=majority"
//     );
//     const db = client.db();
//     const meetupsCollection = db.collection("meetups");

//     const result = await meetupsCollection.insertOne(data);

//     console.log(result);

//     client.close();

//     res.status("201").json({ message: "Meetup Inserted Successfully" });
