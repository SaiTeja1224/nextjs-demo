import { MongoClient } from "mongodb";

import MeetupList from "../components/meetups/MeetupList";

import Head from "next/head";

const Home = (props) => {
  return (
    <>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="A Highly Available React Meetups finder"
        />
      </Head>
      <MeetupList meetups={props.meetups} />;
    </>
  );
};

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://SaiTeja:Ashkechum1224@cluster0.bwyer.mongodb.net/myMeetups?retryWrites=true&w=majority"
  );

  const collection = client.db().collection("meetups");
  const response = await collection.find().toArray();
  const meetups = response.map((meetup) => {
    return {
      id: meetup._id.toString(),
      title: meetup.title,
      description: meetup.description,
      address: meetup.address,
      image: meetup.image,
    };
  });

  client.close();

  return {
    props: {
      meetups,
    },
  };
}

export default Home;
