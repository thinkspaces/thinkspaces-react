import React from 'react';
import { get } from 'lodash';
import Overview from './components/profile-summary';
import SocialContentSection from './components/social-content-section';
import useUser from '../../hooks/use-user';

const ProfilePage = ({ match, location }) => {
  const { user } = useUser();
  const id = get(match, 'params.id', null);

  return (
    <div>
      <Overview authUser={user} uid={id} />
      <SocialContentSection uid={id} authUser={user} selected={location.hash} />
    </div>
  );
};

export default ProfilePage;
