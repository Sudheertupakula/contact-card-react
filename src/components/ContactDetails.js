import { Link, useLocation } from "react-router-dom";
import image from "../images/user.png";

const ContactDetails = (props) => {
  const location = useLocation();
  const state = location.state;
  console.log("state", state);
  return (
    <div className="main">
      <div className="ui card centered">
        <div className="uimage">
          <Link to="/">
            <img src={image} alt="user"></img>
          </Link>
        </div>
        <div className="content">
          <div className="header">{state.name}</div>
          <div className="description">{state.email}</div>
        </div>
        <div className="center-dev">
          <Link to="/">
            <button className="ui button blue center">
              Back to Contact list
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ContactDetails;
