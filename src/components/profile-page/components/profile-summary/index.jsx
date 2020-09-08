/* eslint no-param-reassign: 0, camelcase: 0 */
// Libraries
import React, { useState, useEffect } from "react";
import ReactGA from "react-ga";
import { withRouter } from "react-router-dom";

// Components
import Avatar from "react-avatar";
import { Button, Row, Col } from "reactstrap";
import ContactModal from "components/shared/contact-modal";
import EditProfile from "components/profile-page/components/edit-profile";

// Utilities
import { db } from "../../../../firebase";

const ProfileHeaderBody = ({ headline }) => (
  <div style={{ marginTop: 30 }}>
    <h5> {headline} </h5>
  </div>
);

const ProfileHeaderDetails = ({ fullname, email, graduation }) => (
  <div style={{ marginTop: 10 }}>
    <ContactModal
      buttonLabel={`Contact ${fullname}`}
      modalBody={<a href={`mailto:${email}`}>{email}</a>}
      projectId={fullname}
      type="profile"
    />
    <br />
    <h5>Graduation: {graduation}</h5>
  </div>
);

const ProfileHeaderImage = ({
  profilepicture,
  full_name,
  email,
  graduation,
}) => (
  <div>
    <div style={{ display: "inline-flex", flexDirection: "column" }}>
      <ProfileImage profilepicture={profilepicture} full_name={full_name} />
      <h2 style={{ display: "inline-block" }}>{full_name}</h2>
    </div>
    <ProfileHeaderDetails
      fullname={full_name}
      email={email}
      graduation={graduation}
    />
  </div>
);

const ProfileImage = ({ profilepicture, full_name }) => (
  <div style={{ display: "table", margin: "0 auto", marginBottom: 15 }}>
    {profilepicture ? (
      <img
        style={{ maxHeight: "150px", borderRadius: "50%" }}
        src={profilepicture}
        alt="profile"
      />
    ) : (
      <Avatar size="150" name={full_name} round />
    )}
  </div>
);

const ProfileHeader = ({ profile }) => (
  <Col>
    <ProfileHeaderImage
      profilepicture={profile.profilepicture}
      full_name={profile.full_name}
      email={profile.email}
      graduation={profile.graduation}
    />
    <ProfileHeaderBody headline={profile.headline} />
  </Col>
);

const ProfileDetails = ({ profile, toggleEdit, isMyProfile }) => (
  <Col>
    <DetailView type="College" value={profile.university} inline />
    <hr />
    <DetailView type="Major" value={profile.major} inline />
    <hr />
    <DetailView type="Skills" value={profile.skills} />
    <hr />
    <DetailView type="Relevant Courses" value={profile.courses} />
    <hr />
    <DetailView type="Interests" value={profile.interests} />
    <br />
    {isMyProfile && (
      <Button color="danger" onClick={toggleEdit}>
        Edit Profile
      </Button>
    )}
  </Col>
);

const DetailView = ({ type, value, inline }) => (
  <div className={`${inline && "d-flex"}`}>
    <h4 className="text-muted">{type}:&nbsp;</h4>
    {inline ? <h4>{value}</h4> : <h5>{value}</h5>}
  </div>
);

const ProfileSummary = ({ uid, authUser }) => {
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);

  const toggleEdit = () => setEditing((prevState) => !prevState);

  useEffect(() => {
    const init = async () => {
      if (uid) {
        const _profile = await db.get("users")(uid);
        setProfile(_profile);
      }
    };
    init();
  }, [uid]);

  const saveChanges = async () => {
    const { id, ...values } = profile;
    ReactGA.event({
      category: "Acquisition",
      action: "Sign up - completed profile user flow",
      label: uid,
    });

    await db.update("users")(id)(values);
    setEditing(false);
  };

  const onCancel = () => {
    ReactGA.event({
      category: "Acquisition",
      action: "Sign up - did not complete profile user flow",
      label: uid,
    });
    setEditing(false);
  };

  const onEditChange = ({ target: { type, checked, value, id } }) => {
    if (type === "checkbox") {
      value = !checked;
    }
    setProfile({ ...profile, [id]: value });
  };

  const onPictureChange = (profilepicture = "") =>
    setProfile({ ...profile, profilepicture });

  if (editing) {
    return (
      <EditProfile
        saveChanges={saveChanges}
        profile={profile}
        onEditChange={onEditChange}
        onCancel={onCancel}
        onPictureChange={onPictureChange}
        uid={uid}
      />
    );
  }
  return (
    <section>
      {profile && (
        <Row>
          <ProfileHeader profile={profile} />
          <ProfileDetails
            isMyProfile={authUser ? uid === authUser.id : false}
            profile={profile}
            toggleEdit={toggleEdit}
          />
        </Row>
      )}
    </section>
  );
};

export default withRouter(ProfileSummary);
