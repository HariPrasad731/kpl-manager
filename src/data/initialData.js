// src/data/initialData.js

export const initialTeams = [
  {
    id: "1",
    name: "Kuntibhadra Kings",
    captain: "Nani",
    players: [
      { id: "1-1", name: "Nani", role: "Captain / Batsman", jersey: 1 },
      { id: "1-2", name: "Hari", role: "All-Rounder", jersey: 7 },
      { id: "1-3", name: "Ravi", role: "Bowler", jersey: 21 },
      { id: "1-4", name: "Akash", role: "Opener", jersey: 10 },
    ],
  },
  {
    id: "2",
    name: "River Riders",
    captain: "Rahul",
    players: [
      { id: "2-1", name: "Rahul", role: "Captain / Batsman", jersey: 18 },
      { id: "2-2", name: "Sandeep", role: "Bowler", jersey: 22 },
      { id: "2-3", name: "Kiran", role: "All-Rounder", jersey: 11 },
    ],
  },
  {
    id: "3",
    name: "Thunder Strikers",
    captain: "Vijay",
    players: [
      { id: "3-1", name: "Vijay", role: "Captain / All-Rounder", jersey: 99 },
      { id: "3-2", name: "Tarun", role: "Batsman", jersey: 8 },
      { id: "3-3", name: "Sagar", role: "Bowler", jersey: 27 },
    ],
  },
];

export const initialMatches = [
  {
    id: "m1",
    teamA: "Kuntibhadra Kings",
    teamB: "River Riders",
    date: "2025-12-10",
    ground: "Srikakulam Ground",
  },
  {
    id: "m2",
    teamA: "Thunder Strikers",
    teamB: "Kuntibhadra Kings",
    date: "2025-12-12",
    ground: "Kuntibhadra Stadium",
  },
  {
    id: "m3",
    teamA: "River Riders",
    teamB: "Thunder Strikers",
    date: "2025-12-14",
    ground: "Kuntibhadra Stadium",
  },
  {
    id: "m4",
    teamA: "Kuntibhadra Kings",
    teamB: "Thunder Strikers",
    date: "2025-12-18",
    ground: "City Sports Complex",
  },
];

export const initialSponsors = [
  { id: "s1", name: "Budweiser", amount: 5000 },
  { id: "s2", name: "Local Sports Shop", amount: 3000 },
];

export const initialStats = {
  totalTeams: initialTeams.length,
  totalPlayers: initialTeams.reduce((sum, t) => sum + t.players.length, 0),
  totalMatches: initialMatches.length,
  totalSponsors: initialSponsors.length,
};