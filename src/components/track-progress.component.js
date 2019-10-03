// top component for comparing entered activity against related goals
import React, { Component } from 'react';
import axios from 'axios';
import TrackOneGoal from './track-one-goal.component';

export default class TrackProgress extends Component {

    constructor(props) {
        super(props);
        this.state = {goals: []};
    }

    componentDidMount() {
        axios.get('http://localhost:4000/goals')
            .then(response => {
                this.setState({ goals: response.data });
            })
            .catch(function (error){
                console.log(error);
            })
    }

    trackGoals() {
        return this.state.goals.map(function(value, i) {
            return <TrackOneGoal goal={value} key={i} />;
        })
    }

    render() {
        return (
            <div>
                <h3>Track Progress</h3>
                { this.trackGoals() }
            </div>
        )      
    }
}