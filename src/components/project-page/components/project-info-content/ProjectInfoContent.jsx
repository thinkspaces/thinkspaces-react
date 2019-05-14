import React from 'react';
import { Col, Row } from 'reactstrap';
import { FacebookIcon,
  FacebookShareButton,
  LinkedinShareButton,
  LinkedinIcon,
  TwitterShareButton,
  TwitterIcon } from 'react-share';

import ViewProfileButton from '../view-profile-button';
import ContactModal from '../../../shared/contact-modal';

const ModalSection = ({ title, contact, projectId }) => (
  <InfoView>
    <ContactModal
      buttonLabel={`Contact ${ title }`}
      modalBody={<a href={`mailto:${ contact }`}>{contact}</a>}
      projectId={projectId}
      type="project"
    />
  </InfoView>
);

const SocialSection = ({ title, id }) => (
  <InfoView>
    <div className="d-flex">
      <FacebookShareButton
        style={{ marginRight: 10 }}
        url={`https://thinkspaces.org/projects/${ title }?id=${ id }`}
        className="button is-outlined is-rounded facebook"
      >
        <span className="icon">
          <FacebookIcon size={32} round />
        </span>
      </FacebookShareButton>
      <TwitterShareButton
        style={{ marginRight: 10 }}
        url={`https://thinkspaces.org/projects/${ title }?id=${ id }`}
        className="button is-outlined is-rounded linkedin"
      >
        <span className="icon">
          <TwitterIcon size={32} round />
        </span>
      </TwitterShareButton>
      <LinkedinShareButton
        url={`https://thinkspaces.org/projects/${ title }?id=${ id }`}
        className="button is-outlined is-rounded linkedin"
      >
        <span className="icon">
          <LinkedinIcon size={32} round />
        </span>
      </LinkedinShareButton>
    </div>
  </InfoView>
);

const TeamSection = ({ team }) => (
  <InfoView title="Team">
    <div style={{ display: 'inline-grid' }}>
      {team.map((member, i) => (
        <ViewProfileButton key={i} uid={member.uid} text={member.name} />
      ))}
    </div>
  </InfoView>
);

const ContactSection = ({ links }) => (
  <InfoView title="Links">
    <div>
      {/* <a href={links}>{links}</a> */}
    </div>
  </InfoView>
);

const AboutSection = ({ about }) => (
  <InfoView title="About us">
    <p>{about}</p>
  </InfoView>
);

const NeedSection = ({ need }) => (
  <InfoView title="Who we need">
    <div>{need}</div>
  </InfoView>
);

const InfoView = ({ title, children }) => (
  <Row style={{ marginBottom: 20 }}>
    <Col md={3}>
      <b>{title}</b>
    </Col>
    <Col>{children}</Col>
  </Row>
);

const ProjectInfoContent = ({ title, links, contact, about, need, team, projectId }) => (
  <Col>
    <div style={{ marginTop: 150 }} />
    {/* {title && <SocialSection title={title} id={projectId} />} */}
    {/* {contact && <ModalSection title={title} contact={contact} projectId={projectId} />} */}
    {/* {team && <TeamSection team={team} />} */}
    {/* {links.length > 0 && <ContactSection links={links} />} */}
    {/* {about && <AboutSection about={about} /> } */}
    {/* {need && <NeedSection need={need} />} */}
  </Col>
);

export default ProjectInfoContent;
