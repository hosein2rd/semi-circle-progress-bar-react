import { SemiCircularProgress } from "../../src/SemiCircularProgress";
import React from "react";
import ReactDOM from "react-dom/client";

function App() {
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <SemiCircularProgress
        progress={20}
        showPercentage
        bar={{ color: "indianred" }}
        percentage={{ fontFamily: "monospace" }}
      />
      <SemiCircularProgress progress={30} />
      <SemiCircularProgress
        progress={50}
        bar={{ color: "darkgreen" }}
        showPercentage
        label={{ fontFamily: "math" }}
        percentage={{ fontFamily: "math" }}
      />
      <SemiCircularProgress progress={80} bar={{ color: "yellow" }} />
    </div>
  );
}

const container = document.getElementById("root");

if (!container) {
  throw new Error("Root container missing in index.html");
}

ReactDOM.createRoot(container).render(<App />);
