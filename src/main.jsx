import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LeagueProvider } from "./context/LeagueContext";
import App from "./App";
import Dashboard from "./pages/Dashboard";
import Teams from "./pages/Teams";
import TeamDetails from "./pages/TeamDetails";
import AddTeam from "./pages/AddTeam";
import Matches from "./pages/Matches";
import Sponsors from "./pages/Sponsors";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LeagueProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Dashboard />} />
            <Route path="teams" element={<Teams />} />
            <Route path="teams/:id" element={<TeamDetails />} />
            <Route path="add-team" element={<AddTeam />} />
            <Route path="matches" element={<Matches />} />
            <Route path="sponsors" element={<Sponsors />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </LeagueProvider>
  </React.StrictMode>
);