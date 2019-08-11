import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';
import CategoryForm from './components/category-form';
import OrganizationForm from './components/organization-form';
import ReleaseForm from './components/release-form';

import { getTags } from '../../../../../app/actions';

const TagsForm = ({ pid }) => {
  const dispatch = useDispatch();
  const actions = bindActionCreators({ getTags }, dispatch);
  useEffect(() => {
    actions.getTags();
  }, []);

  return (
    <section>
      <h2>Tags</h2>
      <hr />
      <CategoryForm pid={pid} />
      <OrganizationForm pid={pid} />
      <ReleaseForm pid={pid} />
    </section>
  );
};

export default TagsForm;
