import classes from "./MeetUpDetails.module.css";

const MeetUpDetails = (props) => {
  return (
    <div className={classes.detail}>
      <img src={props.image} alt="meetup" />
      <h1>{props.title}</h1>
      <address>{props.address}</address>
      <p>{props.description}</p>
    </div>
  );
};

export default MeetUpDetails;
