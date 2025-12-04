import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";

function App() {
  return (
    <div className="app-root">
      {/* Optional: enable this if you later add stadium.mp4 to /public */}
      {/*
      <video
        className="bg-video"
        src="/stadium.mp4"
        autoPlay
        muted
        loop
        playsInline
      />
      */}
      <div className="app-overlay" />
      <div className="app-shell">
        <NavBar />
        <main className="app-main">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default App;