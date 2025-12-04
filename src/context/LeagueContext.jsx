import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
} from "react";

import {
  initialStats,
  initialTeams,
  initialMatches,
  initialSponsors,
} from "../data/initialData";

const LeagueContext = createContext(null);

/* -----------------------------
   Load Data from LocalStorage
------------------------------*/
const storedState = JSON.parse(localStorage.getItem("leagueState"));

const initialState = storedState || {
  stats: initialStats,
  teams: initialTeams,
  matches: initialMatches,
  sponsors: initialSponsors,
};

/* -----------------------------
   Recalculate Stats Function
------------------------------*/
function recomputeStats(state) {
  const totalTeams = state.teams.length;
  const totalPlayers = state.teams.reduce(
    (sum, t) => sum + (t.players?.length || 0),
    0
  );
  const totalMatches = state.matches.length;
  const totalSponsors = state.sponsors.length;

  return { totalTeams, totalPlayers, totalMatches, totalSponsors };
}

/* -----------------------------
   Reducer
------------------------------*/
function leagueReducer(state, action) {
  switch (action.type) {
    case "ADD_TEAM": {
      const teams = [...state.teams, action.payload];
      const next = { ...state, teams };
      return { ...next, stats: recomputeStats(next) };
    }

    case "ADD_SPONSOR": {
      const sponsors = [...state.sponsors, action.payload];
      const next = { ...state, sponsors };
      return { ...next, stats: recomputeStats(next) };
    }

    case "ADD_PLAYER": {
      const { teamId, player } = action.payload;
      const teams = state.teams.map((team) =>
        team.id === teamId ? { ...team, players: [...team.players, player] } : team
      );
      const next = { ...state, teams };
      return { ...next, stats: recomputeStats(next) };
    }

    case "ADD_MATCH": {
      const matches = [...state.matches, action.payload];
      const next = { ...state, matches };
      return { ...next, stats: recomputeStats(next) };
    }

    case "RESET_LEAGUE": {
      const next = {
        stats: initialStats,
        teams: initialTeams,
        matches: initialMatches,
        sponsors: initialSponsors,
      };
      return next;
    }

    default:
      return state;
  }
}

/* -----------------------------
   Context Provider
------------------------------*/
export function LeagueProvider({ children }) {
  const [state, dispatch] = useReducer(leagueReducer, initialState);

  // Save to Local Storage whenever state updates
  useEffect(() => {
    localStorage.setItem("leagueState", JSON.stringify(state));
  }, [state]);

  const addTeam = useCallback((team) => {
    dispatch({ type: "ADD_TEAM", payload: team });
  }, []);

  const addSponsor = useCallback((sponsor) => {
    dispatch({ type: "ADD_SPONSOR", payload: sponsor });
  }, []);

  const addPlayer = useCallback((teamId, player) => {
    dispatch({ type: "ADD_PLAYER", payload: { teamId, player } });
  }, []);

  const addMatch = useCallback((match) => {
    dispatch({ type: "ADD_MATCH", payload: match });
  }, []);

  const resetLeague = useCallback(() => {
    dispatch({ type: "RESET_LEAGUE" });
    localStorage.removeItem("leagueState");
  }, []);

  return (
    <LeagueContext.Provider
      value={{ state, addTeam, addSponsor, addPlayer, addMatch, resetLeague }}
    >
      {children}
    </LeagueContext.Provider>
  );
}

/* -----------------------------
   Export Hook
------------------------------*/
export function useLeague() {
  const ctx = useContext(LeagueContext);
  if (!ctx) throw new Error("useLeague must be used inside LeagueProvider");
  return ctx;
}