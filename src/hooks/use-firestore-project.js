import { useState } from 'react';
import { pickBy, isNil } from 'lodash';
import useLoader from './use-loader';

import { db } from '../firebase';

export default (pid, inputData) => {
  const [ values, setValues ] = useState(inputData);

  const setup = async () => {
    // only get fields needed by inputData
    let data = await db.get('projects')(pid);
    data = pickBy(data, (_, key) => !isNil(inputData[key]));
    setValues(data);
  };

  const saveHandler = async (data) => {
    await db.update('projects')(pid)(data);
  };

  const { success, loading, handleSave } = useLoader(setup, saveHandler);
  return { values, success, loading, handleSave };
};
