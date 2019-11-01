import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Activity = props => (
    <div className="float-left col-md-4 col-lg-3 col-sm-6 col-xs-6">
    <Link to={"/oneactivity/"+props.goal._id}>
        <div className="App-activity text-center m-3 p-3 font-weight-bold h2">
            {props.goal.goal_activity}
        </div>
    </Link>
    </div>
)

export default class EnterActivity extends Component {

    constructor(props) {
        super(props);
        this.state = {goals: []};
    }

    componentDidMount() {
        axios.get('http://localhost:4000/goals/')
            .then(response => {
                this.setState({ goals: response.data });
            })
            .catch(function (error){
                console.log(error);
            })
    }

    listActivities() {
        return this.state.goals.map(function(currentGoal, i){
            return <Activity goal={currentGoal} key={i} />;
        })
    }

    render() {
        return (
            <div>
                <h3>Enter Activity</h3>
                { this.listActivities() }
            </div>
        )
    }
}