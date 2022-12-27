import React from "react";
import { useSelector } from "react-redux";

import { gamesSelector } from '../../redux/selectors'

import './TeamsTable.css'

const TeamsRowData = ({ team, fetchGameById }) => {
  const { currentTeamId } = useSelector(gamesSelector)

  return (
    <tr data-id={team?.id} onClick={fetchGameById} className={currentTeamId == team?.id ? 'active' : ''}>
      <td>{team?.name}</td>
      <td>{team?.city}</td>
      <td>{team?.abbreviation}</td>
      <td>{team?.conference}</td>
      <td>{team?.division}</td>
    </tr>
  );
};

export default TeamsRowData;
