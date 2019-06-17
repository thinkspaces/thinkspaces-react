import { useState } from 'react';
import { pickBy, isNil } from 'lodash';
import useLoader from './use-loader';

import { Project } from '../firebase/models';

export default (pid, inputData) => {
  const [ values, setValues ] = useState(inputData);

  const setup = async () => {
    // only get fields needed by inputData
    let data = await Project.get(pid);
    data = pickBy(data, (_, key) => !isNil(inputData[key]));
    setValues(data);
  };

  const saveHandler = async (data) => {
    await Project.update(pid, data);
  };

  const { success, loading, handleSave } = useLoader(setup, saveHandler);
  return { values, success, loading, handleSave };
};
