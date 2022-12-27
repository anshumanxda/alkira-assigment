import React from "react";
import Modal from "react-bootstrap/Offcanvas";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment/moment";

import { toggleModal, setCurrentTeamId } from "../../redux/reducers/games";
import { gamesSelector, teamsSelector } from "../../redux/selectors";

import Loader from "../common/Loader/Loader";

import "./TeamDetailModal.css";

const TeamDetailModal = () => {
  const dispatch = useDispatch();
  const {
    modalOpen,
    data: currentTeamGamesData,
    currentTeamId,
    meta: { total_count },
    requestState,
  } = useSelector(gamesSelector);
  const { data: teamData } = useSelector(teamsSelector);

  const currentTeamData = teamData.filter((el) => el.id == currentTeamId);

  const closeModal = () => {
    dispatch(setCurrentTeamId(''))
    dispatch(toggleModal(false))
  };

  return (
    <div>
      <Modal show={modalOpen} onHide={closeModal} placement={"end"}>
        {requestState === "loading" ? (
          <Loader />
        ) : (
          <div>
            <Modal.Header closeButton className="modal-header">
              <Modal.Title className="modal-title">
                {currentTeamData?.[0]?.name}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="details">
                <div className="flex gap-5 team-details">
                  <div>
                    <p>Team full name</p>
                    <p>Total games in 2021</p>
                  </div>
                  <div>
                    <p>{currentTeamData?.[0]?.full_name}</p>
                    <p>{total_count}</p>
                  </div>
                </div>

                <div className="game-details">
                  <h6>Random Game Details:</h6>
                  <div className="flex gap-5 bold">
                    <div>
                      <p>Date</p>
                      <p>Home team</p>
                      <p>Home Team Score</p>
                      <p>Visitor Team</p>
                      <p>Visitor Team Score</p>
                    </div>
                    <div>
                      <p>{moment(currentTeamGamesData?.date).calendar()}</p>
                      <p>{currentTeamGamesData?.home_team?.name}</p>
                      <p>{currentTeamGamesData?.home_team_score}</p>
                      <p>{currentTeamGamesData?.visitor_team?.name}</p>
                      <p>{currentTeamGamesData?.visitor_team_score}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Modal.Body>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default TeamDetailModal;
