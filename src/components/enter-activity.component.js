import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Activity = props => (
    <div className="float-md-left col-md-4 col-lg-2 col-sm-6">
        <Link to={"/oneactivity/"+props.goal._id}>{props.goal.goal_activity}</Link>
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