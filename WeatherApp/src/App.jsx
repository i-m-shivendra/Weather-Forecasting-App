import React from "react";
import Weather from "./Components/Weather";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <Weather />
    </div>
  );
};

export default App;
