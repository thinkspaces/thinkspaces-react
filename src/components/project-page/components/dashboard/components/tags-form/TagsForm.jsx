import React from 'react';
import CategoryForm from './components/category-form';
import OrganizationForm from './components/organization-form';
import ReleaseForm from './components/release-form';

const TagsForm = ({ pid }) => (
  <section>
    <h2>Tags</h2>
    <hr />
    <CategoryForm pid={pid} />
    <OrganizationForm pid={pid} />
    <ReleaseForm pid={pid} />
  </section>
);

export default TagsForm;
