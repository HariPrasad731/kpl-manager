import React, { useState, useRef, useEffect, useId } from "react";
import { useNavigate } from "react-router-dom";
import { useLeague } from "../context/LeagueContext";

const AddTeam = () => {
  const { addTeam } = useLeague();
  const [name, setName] = useState("");
  const [captain, setCaptain] = useState("");
  const navigate = useNavigate();
  const nameRef = useRef(null);
  const nameId = useId();
  const captainId = useId();

  useEffect(() => {
    if (nameRef.current) nameRef.current.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const id = Date.now().toString();

    const newTeam = {
      id,
      name,
      captain,
      players: [
        {
          id: `${id}-c`,
          name: captain,
          role: "Captain",
          jersey: 1,
        },
      ],
    };

    addTeam(newTeam);
    navigate("/teams");
  };

  return (
    <div>
      <h2>Add New Team</h2>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-row">
          <label htmlFor={nameId}>Team Name</label>
          <input
            id={nameId}
            ref={nameRef}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-row">
          <label htmlFor={captainId}>Captain</label>
          <input
            id={captainId}
            value={captain}
            onChange={(e) => setCaptain(e.target.value)}
            required
          />
        </div>

        <button type="submit">Add Team</button>
      </form>
    </div>
  );
};

export default AddTeam;