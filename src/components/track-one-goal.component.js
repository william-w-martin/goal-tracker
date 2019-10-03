import React, { Component } from 'react';
import { VictoryBar, VictoryAxis, VictoryChart, VictoryTheme, VictoryLine } from 'victory';
import axios from 'axios';
import { lightFormat, subDays, subWeeks, format } from 'date-fns';
import { subMonths } from 'date-fns/esm';

export default class TrackOneGoal extends Component {

    constructor(props) {
        super(props);
        this.state = {activities: []};
        //this.mergeActivitiesByDate = this.mergeActivitiesByDate.bind(this);
    }

    mergeActivitiesByDate(activities) {
        // assuming all goals are per day, week, or month for now
        // also assuming all activity for a given action uses the 
        // same unit of measure
        let activitiesByDate = new Map();
        let date, quantity;
        activities.forEach(activity => {
            date = lightFormat(new Date(activity.act_datetime),'yyyy-MM-dd');
            quantity = activitiesByDate.get(date);
            if (quantity === undefined) {
                activitiesByDate.set(date,activity.act_quantity);
            } else {
                activitiesByDate.set(date,quantity+activity.act_quantity);
            };
        });
        return [...activitiesByDate];
    }

    componentDidMount() {
        axios.get('http://localhost:4000/goals/listactivity/'+this.props.goal.goal_activity)
            .then(response => {
                // condense the activities by date here before setState
                this.setState({ activities: this.mergeActivitiesByDate(response.data) });
            })
            .catch(function (error){
                console.log(error);
            })
    }

    getTickValues() {
        // use the goal's period to determine the x axis ticks
        // using the unit of measure only for now and assuming the period is 1
        const period = this.props.goal.goal_freq_uom;
        const today = new Date();
        if (period === "Day") {
            // use last 7 days
            let week = [];
            for (let i=0; i<7; i++) {
                week[i] = format(subDays(today,6-i),'yyyy-MM-dd');
            }
            return week;
            /*
            let week = new Array(7).fill(0).map((val, ind) => (subDays(today,6-ind)));
            console.log("week array");
            console.log(week);
            return week;
            */
        } else if (period === "Week") {
            // use 13 weeks
            const thisWeek = subDays(today,6);
            //return [13].map((val,ind) => (subWeeks(thisWeek,12-ind)));
            let weeks = [];
            for (let i=0; i<13; i++) {
                weeks[i] = subWeeks(thisWeek,12-i);
            }
            return weeks;
        } else if (period === "Month") {
            // use 12 months
            let months = [];
            for (let i=0; i<12; i++) {
                months[i] = format(subMonths(today,11-i),'MMMMM');
            }
            return months;
            //return [12].map((val,ind) => (format(subMonths(today,11-ind),'MMMMM')));
        } else {
            // state.activities.map(value => value[1])
            throw Error("Goal Period not Day, Week, or Month: " + period);
        }
    }

    render() {

        return (
            <div>    
                <VictoryChart 
                    domainPadding={10}
                    theme={VictoryTheme.material}
                >
                    <VictoryAxis 
                        tickValues={this.getTickValues()}
                        fixLabelOverlap={true}
                    />
                    <VictoryAxis 
                        dependentAxis 
                        label={ this.props.goal.goal_quant_uom }
                    />
                    <VictoryLine 
                        samples={10}
                        y={() => this.props.goal.goal_quantity}
                    />
                    <VictoryBar 
                        data={ this.state.activities }
                        x={0}
                        y={1}
                    />
                </VictoryChart>
            </div>
        );
    }
}