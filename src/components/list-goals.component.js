import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import axios from 'axios';

const Goal = props => (
    <tr>
        <td>{props.goal.goal_activity}</td>
        <td>{props.goal.goal_quantity}</td>
        <td>{props.goal.goal_quant_uom}</td>
        <td>{props.goal.goal_frequency}</td>
        <td>{props.goal.goal_freq_period}</td>
        <td>{props.goal.goal_freq_uom}</td>
        <td>{props.goal.goal_minmax}</td>
    </tr>
)

export default class ListGoals extends Component {
    
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

    listGoals() {
        return this.state.goals.map(function(currentGoal, i){
            return <Goal goal={currentGoal} key={i} />;
        })
    }

    render() {
        return (
            <div>
                <h3>Goals</h3>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Activity</th>
                            <th>Quantity</th>
                            <th>Unit of Measure</th>
                            <th>Frequency</th>
                            <th>Frequency Period</th>
                            <th>Unit of Measure</th>
                            <th>Minimum/Maximum</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.listGoals() }
                    </tbody>
                </table>
            </div>
        )
    }
}