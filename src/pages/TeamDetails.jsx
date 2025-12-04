import React, { useState, useId } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useLeague } from "../context/LeagueContext";

const TeamDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state, addPlayer } = useLeague();

  const team = state.teams.find((t) => t.id === id);

  const [playerName, setPlayerName] = useState("");
  const [playerRole, setPlayerRole] = useState("");
  const [jersey, setJersey] = useState("");
  const nameId = useId();
  const roleId = useId();
  const jerseyId = useId();

  if (!team) {
    return (
      <div>
        <p>Team not found.</p>
        <button onClick={() => navigate("/teams")}>Back to Teams</button>
      </div>
    );
  }

  const handleAddPlayer = (e) => {
    e.preventDefault();
    if (!playerName.trim()) return;

    const newPlayer = {
      id: `${team.id}-${Date.now()}`,
      name: playerName,
      role: playerRole || "Player",
      jersey: jersey ? Number(jersey) : undefined,
    };

    addPlayer(team.id, newPlayer);

    setPlayerName("");
    setPlayerRole("");
    setJersey("");
  };

  return (
    <div>
      <h2>{team.name}</h2>
      <p>Captain: {team.captain}</p>
      <p>Players: {team.players.length}</p>

      <h3 style={{ marginTop: "18px" }}>Squad</h3>
      {team.players.length === 0 ? (
        <p>No players added yet.</p>
      ) : (
        <ul className="match-list">
          {team.players.map((p) => (
            <li key={p.id}>
              <strong>{p.name}</strong>
              {p.role && ` – ${p.role}`}
              {p.jersey && ` (Jersey #${p.jersey})`}
            </li>
          ))}
        </ul>
      )}

      <h3 style={{ marginTop: "22px" }}>Add Player</h3>
      <form className="form" onSubmit={handleAddPlayer}>
        <div className="form-row">
          <label htmlFor={nameId}>Player Name</label>
          <input
            id={nameId}
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            required
          />
        </div>

        <div className="form-row">
          <label htmlFor={roleId}>Role (e.g., Batsman, Bowler)</label>
          <input
            id={roleId}
            value={playerRole}
            onChange={(e) => setPlayerRole(e.target.value)}
          />
        </div>

        <div className="form-row">
          <label htmlFor={jerseyId}>Jersey Number (optional)</label>
          <input
            id={jerseyId}
            type="number"
            min="0"
            value={jersey}
            onChange={(e) => setJersey(e.target.value)}
          />
        </div>

        <button type="submit">Add Player</button>
      </form>

      <button style={{ marginTop: "14px" }} onClick={() => navigate(-1)}>
        ⬅ Back
      </button>
    </div>
  );
};

export default TeamDetails;