import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import EnterActivity from "./components/enter-activity.component";
import CreateGoal from "./components/create-goal.component";
import ListGoals from "./components/list-goals.component";

import logo from "./logo.svg";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="https://codingthesmartway.com" target="_blank" rel="noopener noreferrer">
              <img src={logo} width="30" height="30" alt="Goal Tracker" />
            </a>
            <Link to="/" className="navbar-brand">Goal Tracker</Link>
            <div className="collpase navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/" className="nav-link">Enter Activity</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/create" className="nav-link">Create Goal</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/listgoals" className="nav-link">View Goals</Link>
                </li>
              </ul>
            </div>
          </nav>
          <br/>
          <Route path="/" exact component={EnterActivity} />
          <Route path="/listgoals" component={ListGoals} />
          <Route path="/create" component={CreateGoal} />
        </div>
      </Router>
    );
  }
}

export default App;