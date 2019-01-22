import React, { Component } from "react";
import { db } from "../../firebase";

class Profile extends Component {
  state = {
    email: "",
    full_name: "",
    graduation: "",
    preferred_name: ""
  };

  componentDidMount = async () => {
    let userProfile = await db.getUserProfile();
    console.log("hi");
    console.log(userProfile);
  };

  render() {
    return <div>Profile Page</div>;
  }
}

export default Profile;
