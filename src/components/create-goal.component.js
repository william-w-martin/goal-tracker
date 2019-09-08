import React, { Component } from 'react';
import axios from 'axios';

export default class CreateGoal extends Component {
    
    constructor(props){
        super(props);

        this.onChangeGoalActivity = this.onChangeGoalActivity.bind(this);
        this.onChangeGoalQuantity = this.onChangeGoalQuantity.bind(this);
        this.onChangeGoalQuantUom = this.onChangeGoalQuantUom.bind(this);
        this.onChangeGoalFrequency = this.onChangeGoalFrequency.bind(this);
        this.onChangeGoalFreqPeriod = this.onChangeGoalFreqPeriod.bind(this);
        this.onChangeGoalFreqUom = this.onChangeGoalFreqUom.bind(this);
        this.onChangeGoalMinmax = this.onChangeGoalMinmax.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            goal_activity: '',
            goal_quantity: '',
            goal_quant_uom: '',
            goal_frequency: '',
            goal_freq_period: '',
            goal_freq_uom: '',
            goal_minmax: ''
        }
    }

    onChangeGoalActivity(e){
        this.setState({
            goal_activity: e.target.value
        });
    }

    onChangeGoalQuantity(e){
        this.setState({
            goal_quantity: e.target.value
        });
    }
        
    onChangeGoalQuantUom(e){
        this.setState({
            goal_quant_uom: e.target.value
        })
    }

    onChangeGoalFrequency(e){
        this.setState({
            goal_frequency: e.target.value
        })
    }

    onChangeGoalFreqPeriod(e){
        this.setState({
            goal_freq_period: e.target.value
        })
    }

    onChangeGoalFreqUom(e){
        this.setState({
            goal_freq_uom: e.target.value
        })
    }

    onChangeGoalMinmax(e){
        this.setState({
            goal_minmax: (e.target.value==="Maximum") ? "Maximum":"Minimum"
        })
    }

    onSubmit(e){
        e.preventDefault();
        console.log("form submitted");
        console.log(this.state);

        const newGoal = {
            goal_activity: this.state.goal_activity,
            goal_quantity: this.state.goal_quantity,
            goal_quant_uom: this.state.goal_quant_uom,
            goal_frequency: this.state.goal_frequency,
            goal_freq_period: this.state.goal_freq_period,
            goal_freq_uom: this.state.goal_freq_uom,
            goal_minmax: this.state.goal_minmax
        };
        
        axios.post('http://localhost:4000/goals/add', newGoal)
            .then(res => console.log(res.data));

        this.setState({
            goal_activity: '',
            goal_quantity: '',
            goal_quant_uom: '',
            goal_frequency: '',
            goal_freq_period: '',
            goal_freq_uom: '',
            goal_minmax: ''
        })
    }

    render() {
        return (
            <div className="container">
                <h3>Create a Goal</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Activity</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            value={this.state.goal_activity} 
                            onChange={this.onChangeGoalActivity}
                            />
                    </div>
                    <div className="form-group">
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input" 
                                    type="radio" 
                                    name="minMaxOptions"
                                    id="minMaxMinimum"
                                    value="Minimum"
                                    checked={this.state.goal_minmax==='Minimum'} 
                                    onChange={this.onChangeGoalMinmax}
                                    />
                            <label className="form-check-label">At Least</label>
                        </div>                      
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input" 
                                    type="radio" 
                                    name="minMaxOptions"
                                    id="minMaxMaximum"
                                    value="Maximum"
                                    checked={this.state.goal_minmax==='Maximum'} 
                                    onChange={this.onChangeGoalMinmax}
                                    />
                            <label className="form-check-label">At Most</label>
                        </div>                      
                    </div>
                    <div className="form-group">
                        <label>Quantity</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            value={this.state.goal_quantity} 
                            onChange={this.onChangeGoalQuantity}
                            />
                    </div>                    
                    <div className="form-group">
                        <label>Unit of Measure</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            value={this.state.goal_quant_uom} 
                            onChange={this.onChangeGoalQuantUom}
                            />
                    </div>
                    <div className="form-group">
                        <label>Frequency</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            value={this.state.goal_frequency} 
                            onChange={this.onChangeGoalFrequency}
                            />
                    </div>
                    <div className="form-group">
                        <label>Period</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            value={this.state.goal_freq_period} 
                            onChange={this.onChangeGoalFreqPeriod}
                            />
                    </div>
                    <div className="form-group">
                        <label>Unit of Measure</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            value={this.state.goal_freq_uom} 
                            onChange={this.onChangeGoalFreqUom}
                            />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create Goal" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}