import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import axios from 'axios';

/*<td>{props.activity.act_datetime.toLocaleTimeString()}</td>*/

const Activity = props => (
    <tr>
        <td>{props.activity.act_action}</td>
        <td>{props.activity.act_quantity}</td>
        <td>{props.activity.act_quant_uom}</td>
        <td>{props.activity.act_datetime}</td>
    </tr>
)

export default class ListActivities extends Component {
    
    constructor(props) {
        super(props);
        this.state = {activities: []};
    }

    componentDidMount() {
        axios.get('http://localhost:4000/goals/listactivity/')
            .then(response => {
                this.setState({ activities: response.data });
            })
            .catch(function (error){
                console.log(error);
            })
    }

    listActivities() {
        return this.state.activities.map(function(currentActivity, i){
            console.log("listing activity key = "+i);
            return <Activity activity={currentActivity} key={i} />;
        })
    }

    render() {
        return (
            <div>
                <h3>Activities</h3>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Activity</th>
                            <th>Quantity</th>
                            <th>Unit of Measure</th>
                            <th>Date and Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.listActivities() }
                    </tbody>
                </table>
            </div>
        )
    }
}