import logo from "./logo.svg";
import "./App.css";
import React from "react";
import User from "./Components/user/user";
import Ticket from "./Components/ticket/ticket";

function App() {
  const [tabActive, setTabActive] = React.useState(1);

  const tabClick = (index) =>{
    setTabActive(index)
  }

  return (
    <div className="App">
      <div className="row mt-5">
        <div className="col" onClick={() => tabClick(1)}>
          <button className="btn btn-info">Ticket</button>
        </div>
        <div className="col" onClick={() => tabClick(2)}>
        <button className="btn btn-info">User</button>
        </div>
      </div>

      <div className="row mt-5">

        {tabActive == 1 ? (
          <Ticket></Ticket>
        ) : (
          <User></User>
        )}
      </div>
    </div>
  );
}

export default App;
