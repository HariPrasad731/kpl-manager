import React, { useId, useState, useTransition } from "react";
import { useLeague } from "../context/LeagueContext";

// If future React has built-in useActionState, we can use it.
// For now we create our own small hook with same idea.
function useMyActionState(action, initialState) {
  const [state, setState] = useState(initialState);
  const [isPending, startTransition] = useTransition();

  const formAction = (formData) => {
    startTransition(async () => {
      const next = await action(state, formData);
      setState(next);
    });
  };

  return [state, formAction, isPending];
}

const initialFormState = { error: null };

async function sponsorAction(prevState, formData, addSponsor) {
  const name = formData.get("name");
  const amount = Number(formData.get("amount") || 0);

  if (!name || amount <= 0) {
    return { error: "Please enter valid sponsor name and amount." };
  }

  await new Promise((resolve) => setTimeout(resolve, 500));

  addSponsor({
    id: Date.now().toString(),
    name,
    amount,
  });

  return { error: null };
}

const Sponsors = () => {
  const { state, addSponsor } = useLeague();
  const nameId = useId();
  const amountId = useId();

  const [formState, formAction, isPending] = useMyActionState(
    async (prevState, formData) => sponsorAction(prevState, formData, addSponsor),
    initialFormState
  );

  const totalAmount = state.sponsors.reduce((sum, s) => sum + s.amount, 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    formAction(formData);
    e.target.reset();
  };

  return (
    <div>
      <h2>Sponsors</h2>
      <p>
        Total Sponsorship Amount: <strong>₹{totalAmount}</strong>
      </p>

      <ul className="sponsor-list">
        {state.sponsors.map((sponsor) => (
          <li key={sponsor.id}>
            {sponsor.name} – ₹{sponsor.amount}
          </li>
        ))}
      </ul>

      <h3 style={{ marginTop: "20px" }}>Add New Sponsor</h3>

      <form className="form" onSubmit={handleSubmit}>
        <div className="form-row">
          <label htmlFor={nameId}>Sponsor Name</label>
          <input id={nameId} name="name" />
        </div>

        <div className="form-row">
          <label htmlFor={amountId}>Amount (₹)</label>
          <input id={amountId} name="amount" type="number" min="1" />
        </div>

        {formState?.error && (
          <p style={{ color: "salmon" }}>{formState.error}</p>
        )}

        <button type="submit" disabled={isPending}>
          {isPending ? "Saving..." : "Add Sponsor"}
        </button>
      </form>
    </div>
  );
};

export default Sponsors;