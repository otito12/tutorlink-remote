import React, { useState } from "react";

export default function Button() {
  const [state, setState] = useState(0);
  return (
    <div>
      <button
        className="shared-btn"
        onClick={() => setState((state) => state + 1)}
      >
        Click me: {state}
      </button>
    </div>
  );
}
