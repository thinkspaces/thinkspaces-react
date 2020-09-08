// Libraries
import React from "react";
import { get } from "lodash";

// Components
import Overview from "components/profile-page/components/profile-summary";

// Hooks
import useUser from "hooks/use-user";

const ProfilePage = ({ match }) => {
  const { user } = useUser();
  const id = get(match, "params.id", null);

  return (
    <div>
      <Overview authUser={user} uid={id} />
    </div>
  );
};

export default ProfilePage;
