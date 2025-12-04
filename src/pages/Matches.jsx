import React, { useState, useId } from "react";
import { useLeague } from "../context/LeagueContext";

const Matches = () => {
  const { state, addMatch } = useLeague();
  const { matches } = state;

  const [teamA, setTeamA] = useState("");
  const [teamB, setTeamB] = useState("");
  const [date, setDate] = useState("");
  const [ground, setGround] = useState("");
  const teamAId = useId();
  const teamBId = useId();
  const dateId = useId();
  const groundId = useId();

  const handleAddMatch = (e) => {
    e.preventDefault();
    if (!teamA.trim() || !teamB.trim() || !date.trim()) return;

    const newMatch = {
      id: `m-${Date.now()}`,
      teamA,
      teamB,
      date,
      ground: ground || "TBD Ground",
    };

    addMatch(newMatch);

    setTeamA("");
    setTeamB("");
    setDate("");
    setGround("");
  };

  return (
    <div>
      <h2>Matches</h2>
      <table className="matches-table">
        <thead>
          <tr>
            <th>Match</th>
            <th>Date</th>
            <th>Ground</th>
          </tr>
        </thead>
        <tbody>
          {matches.map((match) => (
            <tr key={match.id}>
              <td>
                {match.teamA} vs {match.teamB}
              </td>
              <td>{match.date}</td>
              <td>{match.ground}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 style={{ marginTop: "22px" }}>Add New Match</h3>
      <form className="form" onSubmit={handleAddMatch}>
        <div className="form-row">
          <label htmlFor={teamAId}>Team A</label>
          <input
            id={teamAId}
            value={teamA}
            onChange={(e) => setTeamA(e.target.value)}
            required
          />
        </div>

        <div className="form-row">
          <label htmlFor={teamBId}>Team B</label>
          <input
            id={teamBId}
            value={teamB}
            onChange={(e) => setTeamB(e.target.value)}
            required
          />
        </div>

        <div className="form-row">
          <label htmlFor={dateId}>Date</label>
          <input
            id={dateId}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            placeholder="YYYY-MM-DD"
            required
          />
        </div>

        <div className="form-row">
          <label htmlFor={groundId}>Ground (optional)</label>
          <input
            id={groundId}
            value={ground}
            onChange={(e) => setGround(e.target.value)}
            placeholder="Ground name"
          />
        </div>

        <button type="submit">Add Match</button>
      </form>
    </div>
  );
};

export default Matches;