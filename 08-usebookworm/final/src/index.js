import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
    {/* <StarRating
      maxRating={5}
      messages={["Meh", "Okay", "Good", "Great", "Loved it"]}
    />
    <StarRating size={24} color="#2f5d50" className="test" defaultRating={3} />

    <Test /> */}
  </React.StrictMode>
);
