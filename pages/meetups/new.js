import { useRouter } from "next/router";
import NewMeetUpForm from "../../components/meetups/NewMeetupForm";

import Head from "next/head";

const NewMeetUp = () => {
  const router = useRouter();

  const addMeetupHandler = async (meetupData) => {
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(meetupData),
    });
    const data = await response.json();
    router.push("/");
  };

  return (
    <>
      <Head>
        <title>React Meetups | New Meetup</title>
        <meta name="description" content="You can add new Meetup details" />
      </Head>
      <NewMeetUpForm onAddMeetup={addMeetupHandler} />;
    </>
  );
};

export default NewMeetUp;
