import React, { useState, useEffect } from 'react'
import idx from 'idx'
import { Project } from '../../../../../../firebase/db';
import SaveButton from '../../../../../shared/save-button'
import styles from './ProjectPrivacyForm.module.css'

const ProjectPrivacyForm = (props) => {
  const { pid } = props
  const project = new Project(pid)

  // state used for save button
  const [ loading, setLoading ] = useState(false)
  const [ success, setSuccess ] = useState(false)

  // edit these settings as you see fit
  // Q: why have them in the UI and not on Project().create() as a default field?
  // 1. it makes Project().create() succinct
  // 2. it reduces unnecessary fields on Project creation
  // when rendering, the privacy fields in the db will be undefined, so rendering
  // should be done as if the privacy settings were lenient
  const privacySettings = { visibleInSearch: { name: 'Visible in search',
    help: `This setting prevents your project showing in search 
      results, however it will continue to be available at 
      <a href="${ window.location.href }">${ window.location.href }</a>`,
    checked: false } }

  /**
   * takes the hardcoded structure above and simplifies it for use with the db
   */
  const simplifySettings = () => {
    const simplified = {}
    Object.keys(privacySettings).forEach((setting) => {
      simplified[setting] = false
    })
    return simplified
  }

  // set privacy state
  const [ privacyState, setPrivacyState ] = useState(simplifySettings(privacySettings))

  // on mount
  const handleSetup = async () => {
    setLoading(true);
    // fetch project
    const projectData = await project.read()
    // try to access its privacy field
    const projectPrivacy = idx(projectData, obj => obj.privacy)
    // if it exists and has some settings, initialize them (otherwise start anew)
    const privacy = (projectPrivacy && Object.keys(projectPrivacy).length > 0)
      ? projectPrivacy : { ...privacyState }
    setPrivacyState(privacy);
    setLoading(false)
  }

  // on save
  const handleSave = async () => {
    // reset success and start load
    setSuccess(false)
    setLoading(true)
    // attempt save
    await project.update({ privacy: privacyState })
    // stop load and set success
    setLoading(false)
    setSuccess(true)
    setTimeout(() => {
      setSuccess(false)
    }, 1000)
  }

  // on check
  const handleCheck = (event) => {
    const { name, checked } = event.target
    setPrivacyState({ ...privacyState, [name]: checked })
  }

  // run once on mount
  useEffect(() => { handleSetup() }, []);

  return (
    <>
      <h3>Privacy settings</h3>
      <div className={styles.wrap}>
        { Object.keys(privacyState).map(
          (key, index) => (
            <div key={index}>
              <div className={styles.checkboxCombo}>
                <input type="checkbox" name={key} value={privacyState[key]} checked={privacyState[key]} onChange={handleCheck} />
                <span>{privacySettings[key].name}</span>
              </div>
              <span className={styles.help} dangerouslySetInnerHTML={{ __html: privacySettings[key].help }} />
            </div>
          ),
        ) }
        <SaveButton
          disabled={loading}
          onClick={handleSave}
          loading={loading}
          success={success}
        />
      </div>
    </>
  )
}

export default ProjectPrivacyForm
