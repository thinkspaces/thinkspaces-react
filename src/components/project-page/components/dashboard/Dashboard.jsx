import React, { useState } from 'react';
import styled from 'styled-components';

import ImagesForm from './components/images-form';
import DescriptionForm from './components/description-form';
import TagsForm from './components/tags-form';
import TeamForm from './components/team-form';
import LinksForm from './components/links-form';
import SettingsForm from './components/settings-form';
import Header from './components/header';
import Sidebar from './components/sidebar';

const ContentPanel = styled.div`
  padding: 25px;
  border: 1px solid var(--color-disabled);
  border-left-width: 0px;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;

  @media (max-width: 768px) {
    border: 1px solid var(--color-disabled);
    border-radius: 5px;
    border-left-width: 1px !important;
  }
`;

const Dashboard = ({ className, pid, handleCloseDashboard }) => {
  const [ currentForm, setCurrentForm ] = useState(<DescriptionForm pid={pid} />);

  const handleSidebar = (event) => {
    switch (event.target.name) {
      case 'description':
        setCurrentForm(<DescriptionForm pid={pid} />);
        break;
      case 'images':
        setCurrentForm(<ImagesForm pid={pid} />);
        break;
      case 'tags':
        setCurrentForm(<TagsForm pid={pid} />);
        break;
      case 'team':
        setCurrentForm(<TeamForm pid={pid} />);
        break;
      case 'links':
        setCurrentForm(<LinksForm pid={pid} />);
        break;
      case 'settings':
        setCurrentForm(<SettingsForm pid={pid} />);
        break;
      default:
        setCurrentForm(<DescriptionForm pid={pid} />);
        break;
    }
  };

  return (
    <main className={className}>
      <Header close={handleCloseDashboard} />
      <section className="dashboard">
        <Sidebar onSelectCategory={handleSidebar} />
        <ContentPanel>{currentForm}</ContentPanel>
      </section>
    </main>
  );
};

export default styled(Dashboard)`
  .dashboard {
    display: grid;
    grid-template-columns: 0.3fr 1fr;
    /* min-height: 50vh; */
  }

  @media (max-width: 768px) {
    .dashboard {
      grid-template-columns: 1fr;
      grid-template-rows: auto;
      grid-row-gap: 10px;
    }
  }
`;
