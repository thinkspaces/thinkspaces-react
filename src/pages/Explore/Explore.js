import React, { Component } from 'react';
import sizeMe from 'react-sizeme';

// database
import { Row, Col } from 'reactstrap';
import { db } from '../../firebase';

// custom components
import ProfileCard from '../../components/ui/profile/ProfileCard/ProfileCard';

const Profiles = ({ profiles, width }) => (
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
          />
        </Col>
      ))}
    </Row>
  </div>
);

class Explore extends Component {
  state = { profiles: [] };

  componentDidMount = async () => {
    const profiles = await db.getProfiles();
    this.setState({ profiles });
  };

  render() {
    const { size: { width } } = this.props;
    const { profiles } = this.state;

    return (
      <div>
        <Profiles width={width} profiles={profiles} />
      </div>
    );
  }
}

export default sizeMe()(Explore);
