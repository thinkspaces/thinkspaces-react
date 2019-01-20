import React, { Component } from "react";

import { db } from "../../firebase";

class Profile extends React.Component {
    state: {
        email: "",
        full_name: "",
        graduation: "",
        preferred_name: "",
    }

    componentDidMount = async () => {
        let userProfile = await db.getUserProfile();

        // update state
        this.setState({ userProfile });
    }

}
