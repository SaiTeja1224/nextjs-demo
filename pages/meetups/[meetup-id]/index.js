import MeetUpDetails from "../../../components/meetups/MeetUpDetails";
import mongoose from "mongoose";
const Meetups = require("../../../models/meetups");

import Head from "next/head";

const Details = (props) => {
  let content = "";
  if (props.available) {
    content = (
      <>
        <Head>
          <title>React Meetups | {props.title}</title>
          <meta name="description" content={props.description} />
        </Head>
        <MeetUpDetails
          image={props.image}
          title={props.title}
          address={props.address}
          description={props.description}
        />
      </>
    );
  }
  return content;
};

export async function getStaticPaths() {
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

  const meetupIds = await Meetups.find({}, "_id");

  await mongoose.disconnect();

  return {
    fallback: "blocking",
    paths: meetupIds.map((meet) => ({
      params: { "meetup-id": meet._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params["meetup-id"];

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

  //fetch
  const data = await Meetups.findById(meetupId);
  if (data === null) {
    return {
      props: {
        available: false,
        message: "Didnt find a match to the requested Meetup",
      },
    };
  } else {
    return {
      props: {
        available: true,
        image: data.image,
        title: data.title,
        address: data.address,
        description: data.description,
      },
    };
  }
}

export default Details;
