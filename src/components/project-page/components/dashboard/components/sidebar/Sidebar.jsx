import React from 'react';
import styled from 'styled-components';

const Sidebar = ({ className, onSelectCategory }) => (
  <div className={className}>
    <button type="button" name="description" className="sidebarItem" onClick={onSelectCategory}>
      Description
    </button>
    <button type="button" name="links" className="sidebarItem" onClick={onSelectCategory}>
      Links
    </button>
    <button type="button" name="images" className="sidebarItem" onClick={onSelectCategory}>
      Images
    </button>
    <button type="button" name="team" className="sidebarItem" onClick={onSelectCategory}>
      Team
    </button>
    <button type="button" name="tags" className="sidebarItem" onClick={onSelectCategory}>
      Tags
    </button>
    <button type="button" name="settings" className="sidebarItem" onClick={onSelectCategory}>
      Settings
    </button>
  </div>
);

export default styled(Sidebar)`
  grid-area: menu;
  @media (max-width: 768px) {
    border: 1px solid var(--color-disabled);
    border-radius: 5px;
  }

  border-right: 1px solid var(--color-disabled);
  overflow: hidden;

  .sidebarItem {
    all: unset;
    display: block;
    width: 100%;
    padding: 10px 20px;
    border-bottom: 1px solid var(--color-subtle);
  }

  .sidebarItem:focus {
    outline-color: var(--color-disabled);
    outline-width: 3px;
  }

  .sidebarItem:hover {
    background-color: var(--color-subtle);
  }
`;
