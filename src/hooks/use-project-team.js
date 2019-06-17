import { useState } from 'react';
import useLoader from './use-loader';
import { Project } from '../firebase/models';

export default (pid) => {
  const [ team, setTeam ] = useState([]);

  const modifyForReactSelect = arrayOfUsersData => arrayOfUsersData.map(user => ({ value: user.id,
    label: user.username,
    icon: user.profilepicture }));

  const setup = async () => {
    // fetch team for project
    const _team = await Project.getTeam(pid);
    // modify data for use with react select
    setTeam(modifyForReactSelect(_team));
  };

  const saveHandler = async () => {
    // delete all previous users from team
    await Project.dropTeam(pid);
    // save project
    await Promise.all(team.map(async user => Project.addTeamUser(pid, user.value)));
  };

  const handleChange = (users) => {
    setTeam(users);
  };

  const { success, loading, handleSave } = useLoader(setup, saveHandler);
  return { team, success, loading, handleSave, handleChange };
};
