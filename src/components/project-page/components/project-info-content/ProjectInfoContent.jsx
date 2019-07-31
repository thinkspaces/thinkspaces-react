import React, { useState, useEffect, memo } from 'react';
import { Col, Row } from 'reactstrap';
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinShareButton,
  LinkedinIcon,
  TwitterShareButton,
  TwitterIcon,
} from 'react-share';

import ViewProfileButton from '../view-profile-button';
import ContactModal from '../../../shared/contact-modal';
import { Project } from '../../../../firebase';

// TODO: fix contact section
// TODO: since contact is not in the project dashboard yet
const ModalSection = ({ name, contact, pid }) => (
  <InfoView>
    <ContactModal
      buttonLabel={`Contact ${ name }`}
      modalBody={<a href={`mailto:${ name }`}>{name}</a>}
      projectId={pid}
      type="project"
    />
  </InfoView>
);

const SocialSection = ({ shortname }) => (
  <InfoView>
    <div className="d-flex">
      <FacebookShareButton
        style={{ marginRight: 10 }}
        url={`https://thinkspaces.org/projects/${ shortname }`}
        className="button is-outlined is-rounded facebook"
      >
        <span className="icon">
          <FacebookIcon size={32} round />
        </span>
      </FacebookShareButton>
      <TwitterShareButton
        style={{ marginRight: 10 }}
        url={`https://thinkspaces.org/projects/${ shortname }`}
        className="button is-outlined is-rounded linkedin"
      >
        <span className="icon">
          <TwitterIcon size={32} round />
        </span>
      </TwitterShareButton>
      <LinkedinShareButton
        url={`https://thinkspaces.org/projects/${ shortname }`}
        className="button is-outlined is-rounded linkedin"
      >
        <span className="icon">
          <LinkedinIcon size={32} round />
        </span>
      </LinkedinShareButton>
    </div>
  </InfoView>
);

const TeamSection = ({ pid }) => {
  const [ teamState, setTeamState ] = useState([]);

  useEffect(() => {
    const init = async () => {
      const team = await Project.getMembersFromFieldArray('team')('users')(pid);
      setTeamState(team);
    };
    init();
  }, [ pid ]);

  return (
    <InfoView title="Team">
      <div style={{ display: 'inline-grid' }}>
        {teamState.map((member, index) => (
          <ViewProfileButton key={index} uid={member.id} text={member.full_name} />
        ))}
      </div>
    </InfoView>
  );
};

const ContactSection = ({ links }) => (
  <InfoView title="Links">
    {links.map(link => (
      <div>
        <a href={link.url}>{link.name}</a>
      </div>
    ))}
  </InfoView>
);

const AboutSection = ({ about }) => (
  <InfoView title="Description and open roles">
    <p>{about}</p>
  </InfoView>
);

// TODO: need section not yet in database
// const NeedSection = ({ need }) => (
//   <InfoView title="Who we need">
//     <div>{need}</div>
//   </InfoView>
// );

const InfoView = ({ title, children }) => (
  <Row style={{ marginBottom: 20 }}>
    <Col md={3}>
      <b>{title}</b>
    </Col>
    <Col>{children}</Col>
  </Row>
);

const ProjectInfoContent = ({
  project: { name, shortname, contact, id, links, description, team },
}) => (
  <Col>
    <div style={{ marginTop: 150 }} />
    {shortname && <SocialSection shortname={shortname} />}
    {contact && <ModalSection name={name} contact={contact} projectId={id} />}
    {team && <TeamSection pid={id} />}
    {links && <ContactSection links={links} />}
    {description && <AboutSection about={description} />}
    {/* {need && <NeedSection need={need} />} */}
  </Col>
);

export default memo(ProjectInfoContent);
