import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import EnterActivity from "./components/enter-activity.component";
import CreateGoal from "./components/create-goal.component";
import ListGoals from "./components/list-goals.component";
import EnterOneActivity from "./components/enter-one-activity.component";
import ListActivity from "./components/list-activity.component";
import TrackProgress from "./components/track-progress.component";
import TrackOneGoal from "./components/track-one-goal.component";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to="/" className="navbar-brand">Goal Tracker</Link>
            <div className="collpase navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/" className="nav-link">Enter Activity</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/listactivity" className="nav-link">View Activity</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/create" className="nav-link">Create Goal</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/listgoals" className="nav-link">View Goals</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/trackprogress" className="nav-link">Track Progress</Link>
                </li>
              </ul>
            </div>
          </nav>
          <br/>
          <Route path="/" exact component={EnterActivity} />
          <Route path="/listactivity" component={ListActivity} />
          <Route path="/listgoals" component={ListGoals} />
          <Route path="/trackprogress" component={TrackProgress} />
          <Route path="/create" component={CreateGoal} />
          <Route path="/oneactivity/:id" component={EnterOneActivity} />
          <Route path="/listactivity/:action" component={TrackOneGoal} />
        </div>
      </Router>
    );
  }
}

export default App;