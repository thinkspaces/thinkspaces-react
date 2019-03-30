import React from 'react';
import { Link } from 'react-router-dom';
import ProjectPosts from '../project-posts';

const SocialContentSection = ({ isOwner, projectId, ourstory, selected }) => (
  <div style={{ marginTop: 70 }}>
    <div className="d-flex">
      <Link to="#ourstory">
        <h4>Our Story</h4>
      </Link>
      <h4>&nbsp;|&nbsp;</h4>
      <Link to="#updates">
        <h4>Updates</h4>
      </Link>
    </div>
    <hr />
    <div>
      {selected.length === 0 || selected === '#ourstory' ? (
        <div style={{ padding: '0px 100px' }}>{ourstory}</div>
      ) : (
        <ProjectPosts isOwner={isOwner} projectId={projectId} />
      )}
    </div>
  </div>
);

export default SocialContentSection;
