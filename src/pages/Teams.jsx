import React, { useState, useRef, useEffect, useId } from "react";
import { useLeague } from "../context/LeagueContext";
import TeamCard from "../components/TeamCard";

const Teams = () => {
  const { state } = useLeague();
  const [search, setSearch] = useState("");
  const inputRef = useRef(null);
  const searchId = useId();

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  const filteredTeams = state.teams.filter((team) =>
    team.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2>Teams</h2>

      <div className="search-row">
        <label htmlFor={searchId}>Search team:</label>
        <input
          id={searchId}
          ref={inputRef}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Type team name..."
        />
      </div>

      {filteredTeams.length === 0 ? (
        <p>No teams found.</p>
      ) : (
        <div className="team-grid">
          {filteredTeams.map((team, index) => (
            <TeamCard
              key={team.id}
              team={team}
              highlight={index === 0 && search === ""}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Teams;