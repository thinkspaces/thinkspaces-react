import React from 'react';
import { Row, Col } from 'reactstrap';
import ProfileCard from '../profile-card';

const ProfileList = ({ profiles, width, openProfile }) => (
  <div>
    <h2 style={{ marginBottom: '20px' }}>Find People</h2>
    <Row>
      {profiles.map((p, i) => (
        <Col sm key={i}>
          <ProfileCard
            width={width}
            key={i}
            uid={p.uid}
            headline={p.headline}
            title={p.full_name}
            picture={p.profilepicture}
            openProfile={() => openProfile(p.uid, p.major)}
          />
        </Col>
      ))}
    </Row>
  </div>
);

export default ProfileList;