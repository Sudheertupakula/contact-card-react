import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

class FormWrapper extends React.Component {
  constructor(props) {
    super(props);
    const { id, name, email } = props.contact;
    this.state = {
      id: id,
      name: name,
      email: email,
    };
  }
  update = (e) => {
    e.preventDefault();
    if (this.state.name === "" || this.state.email === "") {
      alert("All Fields are mandatory");
    }
    this.props.editContactHandler(this.state);
    this.setState({ name: "", email: "" });
    this.props.navigateBack();
  };

  render() {
    return (
      <div className="ui main">
        <h2> Add Contact</h2>
        <form className="ui form" onSubmit={this.update}>
          <div className="field">
            <label> Name</label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={this.state.name}
              onChange={(e) => this.setState({ name: e.target.value })}
            />
          </div>
          <div className="field">
            <label> Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={this.state.email}
              onChange={(e) => this.setState({ email: e.target.value })}
            />
          </div>
          <button className="ui button blue"> Update </button>
        </form>
      </div>
    );
  }
}

const EditContact = ({ editContactHandler }) => {
  const navigate = useNavigate();
  const navigateBack = () => {
    navigate(-1);
  };
  const location = useLocation();
  const contact = location.state;
  console.log("contact", location.state);

  return (
    <FormWrapper
      navigateBack={navigateBack}
      contact={contact}
      editContactHandler={editContactHandler}
    />
  );
};

export default EditContact;
