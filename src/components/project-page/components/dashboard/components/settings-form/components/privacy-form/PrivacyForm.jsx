import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { db } from '../../../../../../../../firebase';
import SaveButton from '../../../../../../../shared/save-button';

const PrivacyForm = ({ pid, className }) => {
  // state used for save button
  const [ loading, setLoading ] = useState(false);
  const [ success, setSuccess ] = useState(false);

  // edit these settings as you see fit
  // Q: why have them in the UI and not on Project().create() as a default field?
  // 1. it makes Project().create() succinct
  // 2. it reduces unnecessary fields on Project creation
  // when rendering, the privacy fields in the db will be undefined, so rendering
  // should be done as if the privacy settings were lenient
  const privacySettings = {
    visibleInSearch: {
      name: 'Visible in search',
      help: `This setting prevents your project showing in search 
      results, however it will continue to be available at 
      <a href="${ window.location.href }">${ window.location.href }</a>`,
      checked: false,
    },
  };

  /**
   * takes the hardcoded structure above and simplifies it for use with the db
   */
  const simplifySettings = () => {
    const simplified = {};
    Object.keys(privacySettings).forEach((setting) => {
      simplified[setting] = false;
    });
    return simplified;
  };

  // set privacy state
  const [ privacyState, setPrivacyState ] = useState(simplifySettings(privacySettings));

  // on mount
  const handleSetup = async () => {
    setLoading(true);
    // fetch project
    const project = await db.get('projects')(pid);
    // if it exists and has some settings, initialize them (otherwise start anew)
    const privacy = project.privacy && Object.keys(project.privacy).length > 0
      ? project.privacy
      : { ...privacyState };
    setPrivacyState(privacy);
    setLoading(false);
  };

  // on save
  const handleSave = async () => {
    // reset success and start load
    setSuccess(false);
    setLoading(true);
    // attempt save
    await db.update('projects')(pid)({ privacy: privacyState });
    // stop load and set success
    setLoading(false);
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
    }, 1000);
  };

  // on check
  const handleCheck = (event) => {
    const { name, checked } = event.target;
    setPrivacyState({ ...privacyState, [name]: checked });
  };

  // run once on mount
  useEffect(() => {
    handleSetup();
  }, []);

  return (
    <section className={className}>
      <h3>Privacy settings</h3>
      <div className="wrap">
        {Object.keys(privacyState).map((key, index) => (
          <div key={index}>
            <div className="checkboxCombo">
              <input
                type="checkbox"
                name={key}
                value={privacyState[key]}
                checked={privacyState[key]}
                onChange={handleCheck}
              />
              <span>{privacySettings[key].name}</span>
            </div>
            <span
              className="helpText"
              dangerouslySetInnerHTML={{ __html: privacySettings[key].help }}
            />
          </div>
        ))}
        <SaveButton disabled={loading} onClick={handleSave} loading={loading} success={success} />
      </div>
    </section>
  );
};

export default styled(PrivacyForm)`
  margin-bottom: 50px;
  .wrap {
    width: 60%;
  }

  @media (max-width: 768px) {
    .wrap {
      width: 100%;
    }
  }

  .checkboxCombo {
    display: flex;
    align-items: center;
  }

  .checkboxCombo > * {
    margin-right: 5px;
  }
`;
