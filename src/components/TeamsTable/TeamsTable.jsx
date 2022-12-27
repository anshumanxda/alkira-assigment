import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Table from "react-bootstrap/Table";

import { getTeams, setSorting } from "../../redux/reducers/teams";
import { getGames } from "../../redux/reducers/games";
import { teamsSelector } from "../../redux/selectors";
import { toggleModal, setCurrentTeamId } from "../../redux/reducers/games";

import Loader from "../common/Loader/Loader";
import TeamsRowData from "./TeamsRowData";

import caretUp from "../../assets/caret_up.png";
import caretDown from "../../assets/caret_down.png";

import "./TeamsTable.css";

const TeamsTable = () => {
  const dispatch = useDispatch();
  const {
    data: teamsData,
    requestState,
    searchedData,
    allTeamData,
    sorting: { sortBy, permutation },
  } = useSelector(teamsSelector);

  useEffect(() => {
    dispatch(getTeams());
  }, []);

  const fetchGameById = (e) => {
    dispatch(toggleModal(true));
    const id = e.currentTarget.dataset.id;
    dispatch(setCurrentTeamId(id));
    dispatch(getGames({ id }));
  };

  const searchFilter = (item) => {
    if (!searchedData) return true;
    return (
      item.name.toLowerCase().includes(searchedData) ||
      item.city.toLowerCase().includes(searchedData) ||
      item.abbreviation.toLowerCase().includes(searchedData) ||
      item.conference.toLowerCase().includes(searchedData) ||
      item.division.toLowerCase().includes(searchedData)
    );
  };

  const handleSort = (e) => {
    const sortBy = e.currentTarget.dataset.sort_by;
    dispatch(
      setSorting({
        sortBy,
        permutation: permutation === "asc" ? "desc" : "asc",
      })
    );
  };

  const renderCaret = (name) => {
    return sortBy === name ? (
      <img
        src={permutation === "asc" ? caretDown : caretUp}
        alt="caret"
        className="caret"
      />
    ) : null;
  };

  if (requestState === "loading") return <Loader />;

  return (
    <table>
      <thead>
        <tr>
          <th data-sort_by="name" onClick={handleSort}>
            Team Name {renderCaret("name")}
          </th>
          <th data-sort_by="city" onClick={handleSort}>
            City {renderCaret("city")}
          </th>
          <th data-sort_by="abbreviation" onClick={handleSort}>
            Abbreviation {renderCaret("abbreviation")}
          </th>
          <th data-sort_by="conference" onClick={handleSort}>
            Conference {renderCaret("conference")}
          </th>
          <th data-sort_by="division" onClick={handleSort}>
            Division {renderCaret("division")}
          </th>
        </tr>
      </thead>

      <tbody>
        {searchedData
          ? allTeamData
            ?.filter(searchFilter)
            ?.map((team) => (
              <TeamsRowData
                team={team}
                key={`${team?.name}${team.id}`}
                fetchGameById={fetchGameById}
              />
            ))
          : teamsData?.map((team) => (
            <TeamsRowData
              team={team}
              key={`${team?.name}${team.id}`}
              fetchGameById={fetchGameById}
            />
          ))}
      </tbody>
    </table>
  );
};

export default TeamsTable;
