import React from 'react';
import { Link } from 'react-router-dom';

import MyProjects from '../project-list';
import ProfilePosts from '../profile-posts';

const SocialContentSection = ({ uid, selected }) => (
  <div style={{ marginTop: 70 }}>
    <div className="d-flex">
      <Link to="#updates">
        <h4>Updates</h4>
      </Link>
      <h4>&nbsp;|&nbsp;</h4>
      <Link to="#my-projects">
        <h4>My Projects</h4>
      </Link>
    </div>
    <hr />
    <div>
      {selected.length === 0 || selected === '#updates' ? (
        <ProfilePosts uid={uid} />
      ) : (
        <MyProjects uid={uid} />
      )}
    </div>
  </div>
);

export default SocialContentSection;
