// Libraries
import React from "react";
import { get } from "lodash";

// Components
import Overview from "components/profile-page/components/profile-summary";
// import SocialContentSection from './components/social-content-section';

// Hooks
import useUser from "hooks/use-user";

const ProfilePage = ({ match }) => {
  const { user } = useUser();
  const id = get(match, "params.id", null);

  return (
    <div>
      <Overview authUser={user} uid={id} />
      {/* <SocialContentSection uid={id} authUser={user} selected={location.hash} /> */}
    </div>
  );
};

export default ProfilePage;
