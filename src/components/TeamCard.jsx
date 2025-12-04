import React from "react";
import { Link } from "react-router-dom";

const TeamCard = ({ team, highlight }) => {
  const cardClass = highlight ? "team-card highlight" : "team-card";

  const playerCount = team.players?.length ?? 0;

  return (
    <div className={cardClass}>
      <h3>{team.name}</h3>
      <p>Captain: {team.captain}</p>
      <p>Players: {playerCount}</p>
      <Link to={`/teams/${team.id}`}>View Squad & Details</Link>
    </div>
  );
};

export default TeamCard;