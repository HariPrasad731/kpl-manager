import React from "react";
import { useLeague } from "../context/LeagueContext";
import StatCard from "../components/StatCard";

const Dashboard = () => {
  const { state } = useLeague();
  const { stats, matches } = state;

  const upcoming = matches.slice(0, 3);

  return (
    <div>
      <h2>Dashboard</h2>
      <div className="stat-row">
        <StatCard label="Total Teams" value={stats.totalTeams} />
        <StatCard label="Total Players" value={stats.totalPlayers} />
        <StatCard label="Total Matches" value={stats.totalMatches} />
        <StatCard label="Sponsors" value={stats.totalSponsors} />
      </div>

      <h3 style={{ marginTop: "24px" }}>Upcoming Matches</h3>

      {upcoming.length === 0 ? (
        <p>No upcoming matches scheduled.</p>
      ) : (
        <ul className="match-list">
          {upcoming.map((match) => (
            <li key={match.id}>
              <strong>{match.teamA}</strong> vs{" "}
              <strong>{match.teamB}</strong> on {match.date} at{" "}
              {match.ground}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dashboard;